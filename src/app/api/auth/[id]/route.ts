import { client } from '@/lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  console.log('[AUTH ROUTE] Endpoint hit with id:', id)

  try {
    console.log('[AUTH ROUTE] Looking for user in database...')
    const userProfile = await client.user.findUnique({
      where: {
        clerkId: id,
      },
      include: {
        studio: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    })
    if (userProfile) {
      console.log('[AUTH ROUTE] User found in database:', userProfile.id)
      return NextResponse.json({ status: 200, user: userProfile })
    }

    console.log('[AUTH ROUTE] User not found, fetching from Clerk...')
    let clerkUserInstance
    try {
      const clerk = await clerkClient()
      clerkUserInstance = await clerk.users.getUser(id)
      console.log('[AUTH ROUTE] Clerk user fetched:', clerkUserInstance.id)
    } catch (clerkError) {
      console.error('[AUTH ROUTE] Clerk user fetch failed:', clerkError)
      return NextResponse.json({ status: 500, error: 'Clerk user fetch failed', details: String(clerkError) })
    }

    console.log('[AUTH ROUTE] Creating user in database...')
    let createUser
    try {
      createUser = await client.user.create({
        data: {
          clerkId: id,
          email: clerkUserInstance.emailAddresses[0].emailAddress,
          firstname: clerkUserInstance.firstName,
          lastname: clerkUserInstance.lastName,
          studio: {
            create: {},
          },
          workspace: {
            create: {
              name: `${clerkUserInstance.firstName}'s Workspace`,
              type: 'PERSONAL',
            },
          },
          subscription: {
            create: {},
          },
        },
        include: {
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      })
      console.log('[AUTH ROUTE] User created in database:', createUser.id)
    } catch (dbCreateError) {
      console.error('[AUTH ROUTE] User creation failed:', dbCreateError)
      return NextResponse.json({ status: 500, error: 'User creation failed', details: String(dbCreateError) })
    }

    if (createUser) return NextResponse.json({ status: 201, user: createUser })

    console.error('[AUTH ROUTE] User creation returned null')
    return NextResponse.json({ status: 400 })
  } catch (error) {
    console.error('[AUTH ROUTE] General error:', error)
    return NextResponse.json({ status: 500, error: 'Internal server error', details: String(error) })
  }
}
