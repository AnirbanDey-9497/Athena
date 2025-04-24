'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { MENU_ITEMS } from '@/constants'

type WorkSpace = {
    id: string
    type: 'PERSONAL' | 'PUBLIC'
    name: string
    userId?: string | null
    createdAt: Date
}

type Props = {
    workspace: WorkSpace
}

const GlobalHeader = ({ workspace }: Props) => {
    const pathname = usePathname()
    const menuItems = MENU_ITEMS(workspace.id)

    const getPageTitle = () => {
        // Find matching menu item
        const menuItem = menuItems.find(item => pathname === item.href)
        if (menuItem) {
            return menuItem.title
        }

        // Check if we're in a folder
        if (pathname.includes('/folder/')) {
            return 'Folder'
        }

        // Default to My Library for the root workspace path
        if (pathname === `/dashboard/${workspace.id}`) {
            return 'My Library'
        }

        // Remove /dashboard/workspaceId from pathname and capitalize
        const cleanPath = pathname.split(`/dashboard/${workspace.id}`)[1]
        if (cleanPath) {
            return cleanPath.charAt(1).toUpperCase() + cleanPath.slice(2).toLowerCase()
        }

        return workspace.name
    }

    return (
        <article className="flex flex-col gap-2">
            <span className="text-[#707070] text-xs">
                {workspace.type === 'PERSONAL' ? 'PERSONAL' : 'PUBLIC'}
            </span>
            <h1 className="text-4xl font-bold text-white">
                {getPageTitle()}
            </h1>
        </article>
    )
}

export default GlobalHeader