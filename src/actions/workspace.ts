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
                workSpaceId: workspaceId,
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
                data: isFolders 
            }
        }
        return {status: 404, data: []}
    } catch (error) {
        console.error('Error in getWorkspaceFolders:', error)
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
                OR: [
                    { workSpaceId: workspaceId },
                    { folderId: workspaceId }
                ],
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
                        firstname: true,
                        lastname: true,
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
        console.error('Error in getAllUserVideos:', error)
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

export const createWorkspace = async (name: string) => {
    try {
      const user = await currentUser()
      if (!user) {
        console.log('No user found')
        return { status: 404, data: 'User not found' }
      }

      console.log('Current user details:', {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      })

      const authorized = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        include: {
          subscription: true
        }
      })

      console.log('Database user record:', authorized)
      
      if (!authorized?.subscription) {
        console.log('No subscription found for user:', user.id)
        return { status: 401, data: 'No subscription found' }
      }

      if (authorized.subscription.plan !== 'PRO') {
        console.log('User subscription is not PRO:', authorized.subscription.plan)
        return { status: 401, data: 'You need a PRO subscription to create workspaces' }
      }

      console.log('Creating workspace for PRO user')
      const workspace = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: 'PUBLIC',
            },
          },
        },
      })

      if (workspace) {
        console.log('Workspace created successfully')
        return { status: 201, data: 'Workspace Created' }
      }

      console.log('Failed to create workspace')
      return { status: 400, data: 'Failed to create workspace' }
    } catch (error) {
      console.error('Error creating workspace:', error)
      return { status: 400, data: 'Failed to create workspace' }
    }
}
  
export const renameFolders = async (folderId: string, name: string) => {
    try {
        const folder = await client.folder.update({
            where: {
                id: folderId,
            },
            data: {
                name,
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })
        if(folder) {
            return {status: 200, data: folder}
        }
        return {status: 404, data: null}
    } catch(error) {
        console.error('Error in renameFolders:', error)
        return {status: 500, data: null}
    }
}

export const createFolder = async (workspaceId: string) => {
    console.log('createFolder called with workspaceId:', workspaceId)
    try {
        const isNewFolder = await client.folder.create({
            data: {
                name: 'Untitled',
                workSpaceId: workspaceId,
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })
        console.log('Folder creation result:', isNewFolder)
        if (isNewFolder) {
            return { 
                status: 200, 
                data: [isNewFolder]
            }
        }
        return { status: 400, data: [] }
    } catch (error) {
        console.error('Error in createFolder:', error)
        return { status: 500, data: [] }
    }
}

export const getFolderInfo = async (folderId: string) => {
    try {
      const folder = await client.folder.findUnique({
        where: {
          id: folderId,
        },
        select: {
          name: true,
          _count: {
            select: {
              videos: true,
            },
          },
        },
      })
      if (folder)
        return {
          status: 200,
          data: folder,
        }
      return {
        status: 400,
        data: null,
      }
    } catch (error) {
      return {
        status: 500,
        data: null,
      }
    }
  }

  export const moveVideoLocation = async (
    videoId: string,
    workSpaceId: string,
    folderId: string
  ) => {
    try {
      const location = await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          folderId: folderId || null,
          workSpaceId,
        },
      })
      if (location) return { status: 200, data: 'folder changed successfully' }
      return { status: 404, data: 'workspace/folder not found' }
    } catch (error) {
      return { status: 500, data: 'Oops! something went wrong' }
    }
  }