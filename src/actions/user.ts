'use server'

import { client } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser()
        console.log('Clerk user:', user?.id)

        if (!user) {
            console.error('No Clerk user found')
            return { status: 403 }
        }

        // First check if user exists by email
        const existingUser = await client.user.findFirst({
            where: {
                email: user.emailAddresses[0].emailAddress
            },
            include: {
                workspace: true
            },
        })

        if (existingUser) {
            console.log('Existing user found by email:', existingUser.id)
            return { status: 200, user: existingUser }
        }

        // If no user exists with that email, create a new one
        console.log('Creating new user for:', user.id)
        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                image: user.imageUrl,
                studio: {
                    create: {},
                },
                subscription: {
                    create: {},
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: 'PERSONAL',
                    },
                },
            },
            include: {
                workspace: true
            },
        })

        if (newUser) {
            console.log('New user created:', newUser.id)
            return { status: 201, user: newUser }
        }

        console.error('Failed to create new user')
        return { status: 400 }
    } catch (error) {
        console.error('Error in onAuthenticateUser:', error)
        return { status: 500 }
    }
}

export const getNotifications = async () => {
    try {
        const user = await currentUser()
        if(!user) {
            return {status: 404}
        }
        const notifications = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                notification: true,
                _count: {
                    select: {
                        notification: true,
                    },
                },
            },
        })
        if(notifications && notifications.notification.length > 0) {
            return {status: 200, data: notifications}
        }
        return {status: 404, data: []}
    } catch (error) {
        return {status: 400, data: []}
    }
}   

export const searchUsers = async (query: string) => {
    try {
        const user = await currentUser()
        if(!user) {
            return {status: 404}
        }
        const users = await client.user.findMany({
            where: {
                OR: [
                    {firstname: {contains: query}},
                    {lastname: {contains: query}},
                    {email: {contains: query}},
                ],
                NOT:[{clerkId: user.id}],
            }, 
            select: {
                id:true,

                subscription: {
                    select: {
                        plan: true,
                    },
                },
                firstname: true,
                lastname: true,
                email: true,
                image: true,
            }
        })
        if(users && users.length > 0) {
            return {status: 200, data: users}
        }
        return {status: 404, data: undefined}
    } catch (error) {
        return {status: 400, data: undefined}
    }
}