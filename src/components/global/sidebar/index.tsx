'use client'
import React from 'react'
import Image from 'next/image'
import { userQueryData } from '@/hooks/userQueryData'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useRouter, usePathname } from 'next/navigation'
import { getWorkSpaces } from '@/actions/workspace'
import Modal from '../modal'
import { MENU_ITEMS } from '@/constants'
import { PlusCircle } from 'lucide-react'
import Search from '../search'
import SidebarItem from './sidebar-item'
import { getNotifications } from '@/actions/user'
import { useUser } from "@clerk/nextjs"

interface WorkspaceResponse {
    status: number;
    data: {
        workspace: Array<{
            id: string;
            name: string;
            type: 'PUBLIC' | 'PERSONAL';
        }>;
        members: Array<{
            WorkSpace: {
                id: string;
                name: string;
                type: 'PUBLIC' | 'PERSONAL';
            };
        }>;
        subscription: {
            plan: 'FREE' | 'PRO';
        } | null;
    } | null;
}

interface NotificationsData {
    _count: {
        notification: number;
    };
}

type Props = {
    activeWorkspaceId: string;
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const { isLoaded, user } = useUser()

    const {data: response} = userQueryData(['user-workspaces'], getWorkSpaces)

    // Debug logging
    console.log('Response:', response)

    const menuItems = MENU_ITEMS(activeWorkspaceId);

    const {data: notificationsData} = userQueryData(['notifications'], getNotifications)

    const workspaceData = response as WorkspaceResponse
    const workspaceInfo = workspaceData?.data
    
    // More debug logging
    console.log('Workspace Info:', workspaceInfo)

    const notifications = notificationsData as NotificationsData

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (!user) {
        router.push('/auth/sign-in')
        return null
    }

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }

    const currentWorkspace = workspaceInfo?.workspace?.find((ws) => ws.id === activeWorkspaceId)

    return (
        <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
            <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
                <Image src="/evo-logo.png" height={40} width={40} alt="logo"/>
                <p className="text-2xl">Evo</p>
            </div>
            <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
                <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
                    <SelectValue placeholder='Select a Workspace'>
                        {currentWorkspace?.name || 'Select a Workspace'}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#111111] backdrop-blur-xl">
                    <SelectGroup>
                        <SelectLabel>Workspaces</SelectLabel>
                        <Separator />
                        {workspaceInfo?.workspace?.map((ws) => (
                            <SelectItem key={ws.id} value={ws.id}>
                                {ws.name}
                            </SelectItem>
                        ))}
                        {workspaceInfo?.members && workspaceInfo.members.length > 0 && workspaceInfo.members.map((member) => 
                            member.WorkSpace && (
                                <SelectItem value={member.WorkSpace.id} key={member.WorkSpace.id}>
                                    {member.WorkSpace.name}
                                </SelectItem>
                            )
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {currentWorkspace?.type === "PUBLIC" && workspaceInfo?.subscription?.plan === "PRO" && (
                <Modal trigger={
                    <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2"> 
                        <PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" style={{ fillRule: 'evenodd' }} />
                        <span className="text-neutral-400 font-semibold text-xs">Invite to workspace</span>
                    </span>
                }
                title="Invite to workspace"
                description="Invite other users to your workspace"
                >
                    <Search workspaceId={activeWorkspaceId}/>
                </Modal>
            )}
            <p className="w-full text-[#9D9D9D] font-bold mt-4">
                Menu
            </p>
            <nav className="w-full">
                <ul>{menuItems.map((item) => (
                    <SidebarItem 
                        key={item.title}
                        href={item.href}
                        icon={item.icon}
                        selected={pathname === item.href}    
                        title={item.title}
                        notifications={
                            (item.title === 'Notifications' &&
                                notifications?._count?.notification) || 0
                        }
                    />
                ))}</ul>
            </nav>
        </div>
    )
}

export default Sidebar