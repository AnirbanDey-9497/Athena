'use server'

import { client } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser()
        console.log('Clerk user:', user?.id)
        console.log('User details:', {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.emailAddresses[0]?.emailAddress
        })

        if (!user) {
            console.error('No Clerk user found')
            return { status: 403 }
        }

        // First check if user exists by email
        const userExist = await client.user.findFirst({
            where: {
                OR: [
                    { clerkId: user.id },
                    { email: user.emailAddresses[0].emailAddress }
                ]
            },
            include: {
                workspace: true
            },
        })

        if (userExist) {
            console.log('Existing user found:', userExist)
            // If user exists but doesn't have clerkId, update it
            if (!userExist.clerkId) {
                const updatedUser = await client.user.update({
                    where: { id: userExist.id },
                    data: { clerkId: user.id },
                    include: {
                        workspace: true
                    },
                })
                return { status: 200, user: updatedUser }
            }
            return { status: 200, user: userExist }
        }

        // If no user exists with that email, create a new one
        console.log('Creating new user for:', user.id)
        
        // Create the user first
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
            },
        })
        console.log('Created new user:', newUser)

        // Then create and connect the workspace
        const workspaceName = user.firstName ? `${user.firstName}'s Workspace` : 'My Workspace'
        console.log('Creating workspace with name:', workspaceName)
        
        const workspace = await client.workSpace.create({
            data: {
                name: workspaceName,
                type: 'PERSONAL',
                User: {
                    connect: {
                        id: newUser.id
                    }
                }
            }
        })
        console.log('Created workspace:', workspace)

        // Fetch the complete user data
        const completeUser = await client.user.findUnique({
            where: {
                id: newUser.id
            },
            include: {
                workspace: true,
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        })

        if (!completeUser?.workspace || completeUser.workspace.length === 0) {
            console.error('Workspace connection failed')
            return { status: 500 }
        }

        console.log('Complete user data:', completeUser)
        return { status: 201, user: completeUser }
    } catch (error) {
        console.error('Error in onAuthenticateUser:', error)
        console.error('Error details:', error)
        return { status: 500 }
    }
}

export const getNotifications = async () => {
    try {
        const user = await currentUser()
        if(!user) {
            return {
                status: 404,
                data: {
                    notification: [],
                    _count: {
                        notification: 0
                    }
                }
            }
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
        if(notifications) {
            return {
                status: 200, 
                data: {
                    notification: notifications.notification || [],
                    _count: {
                        notification: notifications._count?.notification || 0
                    }
                }
            }
        }
        return {
            status: 404,
            data: {
                notification: [],
                _count: {
                    notification: 0
                }
            }
        }
    } catch (error) {
        console.error('Error in getNotifications:', error)
        return {
            status: 400,
            data: {
                notification: [],
                _count: {
                    notification: 0
                }
            }
        }
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

export const getPaymentInfo = async () => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
  
      const payment = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          subscription: {
            select: { plan: true },
          },
        },
      })
      if (payment) {
        return { status: 200, data: payment }
      }
    } catch (error) {
      return { status: 400 }
    }
  }