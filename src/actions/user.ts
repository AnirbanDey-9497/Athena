'use server'

import { client } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { Prisma } from '@prisma/client'
import nodemailer from 'nodemailer'

export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html?: string
  ) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    })
  
    const mailOptions = {
      to,
      subject,
      text,
      html,
    }
    return { transporter, mailOptions }
  }

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

  export const enableFirstView = async (state: boolean) => {
    try {
      const user = await currentUser()
  
      if (!user) return { status: 404 }
  
      const view = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          firstView: state,
        },
      })
  
      if (view) {
        return { status: 200, data: 'Setting updated' }
      }
    } catch (error) {
      return { status: 400 }
    }
  }
  
  export const getFirstView = async () => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
      const userData = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          firstView: true,
        },
      })
      if (userData) {
        return { status: 200, data: userData.firstView }
      }
      return { status: 400, data: false }
    } catch (error) {
      return { status: 400 }
    }
  }
  
  export const createCommentAndReply = async (
    userId: string,
    comment: string,
    videoId: string,
    commentId?: string | undefined
  ) => {
    try {
      if (commentId) {
        const reply = await client.comment.update({
          where: {
            id: commentId,
          },
          data: {
            reply: {
              create: {
                comment,
                userId,
                videoId,
              },
            },
          },
        })
        if (reply) {
          return { status: 200, data: 'Reply posted' }
        }
      }
  
      const newComment = await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          Comment: {
            create: {
              comment,
              userId,
            },
          },
        },
      })
      if (newComment) return { status: 200, data: 'New comment added' }
    } catch (error) {
      return { status: 400 }
    }
  }
  
  export const getUserProfile = async () => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
      const profileIdAndImage = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          image: true,
          id: true,
        },
      })
  
      if (profileIdAndImage) return { status: 200, data: profileIdAndImage }
    } catch (error) {
      return { status: 400 }
    }
  }
  
  type CommentWithUser = {
    id: string;
    comment: string;
    videoId: string | null;
    commentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    User: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      clerkId: string;
      image: string | null;
    } | null;
    reply: Array<{
      id: string;
      comment: string;
      videoId: string | null;
      commentId: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string | null;
      User: {
        id: string;
        firstname: string | null;
        lastname: string | null;
        clerkId: string;
        image: string | null;
      } | null;
    }>;
  }

  type ReactionCount = {
    count: number;
    hasReacted: boolean;
  }

  export const getVideoComments = async (Id: string) => {
    try {
      const currentClerkUser = await currentUser()
      const comments = await client.comment.findMany({
        where: {
          OR: [{ videoId: Id }, { commentId: Id }],
          commentId: null,
        },
        include: {
          reply: {
            include: {
              User: {
                select: {
                  id: true,
                  firstname: true,
                  lastname: true,
                  clerkId: true,
                  image: true
                }
              }
            },
          },
          User: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              clerkId: true,
              image: true
            }
          }
        },
      })
  
      // Transform the comments to include the current user's image
      const transformedComments = comments.map((comment: CommentWithUser) => ({
        ...comment,
        User: comment.User ? {
          ...comment.User,
          image: comment.User.clerkId === currentClerkUser?.id ? currentClerkUser?.imageUrl : comment.User.image
        } : null,
        reply: comment.reply.map((reply: CommentWithUser['reply'][0]) => ({
          ...reply,
          User: reply.User ? {
            ...reply.User,
            image: reply.User.clerkId === currentClerkUser?.id ? currentClerkUser?.imageUrl : reply.User.image
          } : null
        }))
      }))
  
      return { status: 200, data: transformedComments }
    } catch (error) {
      console.error('Error in getVideoComments:', error)
      return { status: 400 }
    }
  }
  

  export const inviteMembers = async (
    workspaceId: string,
    recieverId: string,
    email: string
  ) => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
      const senderInfo = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
        },
      })
      if (senderInfo?.id) {
        const workspace = await client.workSpace.findUnique({
          where: {
            id: workspaceId,
          },
          select: {
            name: true,
          },
        })
        if (workspace) {
          const invitation = await client.invite.create({
            data: {
              senderId: senderInfo.id,
              recieverId,
              workSpaceId: workspaceId,
              content: `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
            },
            select: {
              id: true,
            },
          })
  
          await client.user.update({
            where: {
              clerkId: user.id,
            },
            data: {
              notification: {
                create: {
                  content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstname} into ${workspace.name}`,
                },
              },
            },
          })
          if (invitation) {
            const { transporter, mailOptions } = await sendEmail(
              email,
              'You got an invitation',
              'You are invited to join ${workspace.name} Workspace, click accept to confirm',
              `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #000; padding: 5px 10px; border-radius: 10px;">Accept Invite</a>`
            )
  
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log('🔴', error.message)
              } else {
                console.log('✅ Email send')
              }
            })
            return { status: 200, data: 'Invite sent' }
          }
          return { status: 400, data: 'invitation failed' }
        }
        return { status: 404, data: 'workspace not found' }
      }
      return { status: 404, data: 'recipient not found' }
    } catch (error) {
      console.log(error)
      return { status: 400, data: 'Oops! something went wrong' }
    }
  }
  