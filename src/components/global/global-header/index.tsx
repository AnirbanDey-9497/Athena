'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
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
    const pathname = usePathname().split('/dashboard/${workspace.id}')[1]
    return (
        <article className="flex flex-col gap-2">
            <span className="text-[#707070] text-xs">
                {workspace.type === 'PERSONAL' ? 'PERSONAL' : 'PUBLIC'}
            </span>
            <h1 className="text-4xl font-bold text-white">
                {pathname && !pathname.includes('folder') ? pathname.charAt(0).toUpperCase()+pathname.slice(1).toLowerCase(): 'My Library'}
            </h1>
        </article>
    )
}

export default GlobalHeader