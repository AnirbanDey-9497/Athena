"use server"

import {client} from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if(!user) {
            return {
                status: 403
            }
        }

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspaceId,
                OR : [
                    {
                        User: {
                            clerkId: user.id,
                        },
                    },
                    {
                        members: {
                            every: {
                                User: {
                                    clerkId : user.id,
                            },
                    },
                },
            },
                    
                ],
            },
        })
        return {
            status: 200,
            data: { workspace: isUserInWorkspace },
        }
    } catch (error) {
        return {
            status: 403,
            data: { workspace: null },
        }
    }
    
        
}

export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const isFolders = await client.folder.findMany({
            where: {
                 workspaceId,
            },
            include: {
                _count: {
                    select: {
                        videos: true,
                    },
                },
            },
        })
        if(isFolders && isFolders.length > 0) {
            return {
                status: 200,
                data:  isFolders }
            }
        return {status: 404, data: []}
    } catch (error) {
        return {status: 403, data: []}
    }
}

export const getAllUserVideos = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if(!user) {
            return {
                status: 404
            }
        }
        const videos = await client.video.findMany({
            where: {
                OR: [{workspaceId}, {folder: workspaceId}],
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                User: {
                    select: {
                        firstName: true,
                        lastName: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        })
        if(videos && videos.length > 0) {
            return {status: 200, data: videos}
        }
        return {status: 404}
    } catch (error) {
        return {status: 400 }
    }
}

export const getWorkSpaces = async () => {
    try {
        const user = await currentUser()
        if(!user) {
            return {
                status: 404,
                data: null
            }
        }   
        const workSpaces = await client.user.findFirst({
            where: {
                OR: [
                    { clerkId: user.id },
                    { email: user.emailAddresses[0].emailAddress }
                ]
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    },
                },
                workspace: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    },
                },
                members: {
                    select: {
                        WorkSpace: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        })
        if(workSpaces) {
            return {
                status: 200, 
                data: {
                    workspace: workSpaces.workspace,
                    members: workSpaces.members,
                    subscription: workSpaces.subscription
                }
            }
        }
        return {
            status: 404,
            data: null
        }
    } catch (error) {
        console.error('Error in getWorkSpaces:', error)
        return {
            status: 400,
            data: null
        }
    }
}