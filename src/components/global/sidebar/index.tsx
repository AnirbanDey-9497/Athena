'use client'
import React from 'react'
import Image from 'next/image'
import { useQueryData } from '@/hooks/useQueryData'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useRouter, usePathname } from 'next/navigation'
import { getWorkSpaces } from '@/actions/workspace'
import Modal from '../modal'
import { MENU_ITEMS } from '@/constants'
import { PlusCircle, Menu } from 'lucide-react'
import { FolderPlusDuotone } from '@/components/icons'
import Loader from '../loader'
import Search from '../search'
import SidebarItem from './sidebar-item'
import { getNotifications } from '@/actions/user'
import { useUser } from "@clerk/nextjs"
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCard from '../global-card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import InfoBar from '../info-bar'
import { useDispatch } from 'react-redux'
import { WORKSPACES } from '@/redux/slices/workspaces'
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
    const dispatch = useDispatch()

    const {data: response, isFetched} = useQueryData(['user-workspaces'], getWorkSpaces)
    const menuItems = MENU_ITEMS(activeWorkspaceId)
    const {data: notificationsData} = useQueryData(['notifications'], getNotifications)

    const workspaceData = response as WorkspaceResponse
    const workspaceInfo = workspaceData?.data
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

    if (isFetched && workspaceInfo) {
        dispatch(WORKSPACES({ workspaces: workspaceInfo.workspace }))
    }

    const SidebarSection = (
        <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4">
            <div className="bg-[#111111] p-4 flex gap-2 items-center mb-4 absolute top-0 left-0 right-0 z-10">
                <Image src="/evo-logo.png" height={32} width={32} alt="logo" className="rounded-lg"/>
                <p className="text-xl font-medium">Evo</p>
            </div>
            
            <div className="mt-[72px] w-full flex flex-col gap-6">
                <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
                    <SelectTrigger className="text-sm text-neutral-400 bg-transparent border-neutral-800 focus:ring-0 h-9">
                        <SelectValue placeholder="Select a workspace">
                            {currentWorkspace?.name || 'Select a Workspace'}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-neutral-800">
                        <SelectGroup>
                            <SelectLabel className="text-xs text-neutral-500">Workspaces</SelectLabel>
                            <Separator className="bg-neutral-800 my-2" />
                            {workspaceInfo?.workspace?.map((ws) => (
                                <SelectItem key={ws.id} value={ws.id} className="text-sm text-neutral-300">
                                    {ws.name}
                                </SelectItem>
                            ))}
                            {workspaceInfo?.members && workspaceInfo.members.length > 0 && workspaceInfo.members.map((member) => 
                                member.WorkSpace && (
                                    <SelectItem value={member.WorkSpace.id} key={member.WorkSpace.id} className="text-sm text-neutral-300">
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
                            <PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" />
                            <span className="text-neutral-400 font-semibold text-xs">Invite to workspace</span>
                        </span>
                    }
                    title="Invite to workspace"
                    description="Invite other users to your workspace"
                    >
                        <Search workspaceId={activeWorkspaceId}/>
                    </Modal>
                )}

                <div className="space-y-4">
                    <p className="text-neutral-500 font-medium text-xs">Menu</p>
                    <nav className="w-full">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
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
                            ))}
                        </ul>
                    </nav>
                </div>

                <Separator className="bg-neutral-800" />
                
                <div className="space-y-4">
                    <p className="text-neutral-500 font-medium text-xs">Workspaces</p>

                    {workspaceInfo?.workspace?.length === 1 && workspaceInfo.members?.length === 0 && (
                        <div className="flex items-center gap-2 text-neutral-600 text-xs">
                            <FolderPlusDuotone />
                            {workspaceInfo.subscription?.plan === 'FREE'
                                ? 'Upgrade to create workspaces'
                                : 'No Workspaces'}
                        </div>
                    )}

                    <nav className="w-full">
                        <ul className="space-y-1 max-h-[150px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                            {workspaceInfo?.workspace?.map((item) =>
                                item.type !== 'PERSONAL' && (
                                    <SidebarItem
                                        key={item.id}
                                        href={`/dashboard/${item.id}`}
                                        selected={pathname === `/dashboard/${item.id}`}
                                        title={item.name}
                                        notifications={0}
                                        icon={
                                            <WorkspacePlaceholder>
                                                {item.name.charAt(0)}
                                            </WorkspacePlaceholder>
                                        }
                                    />
                                )
                            )}
                            {workspaceInfo?.members?.map((item) =>
                                item.WorkSpace && (
                                    <SidebarItem
                                        key={item.WorkSpace.id}
                                        href={`/dashboard/${item.WorkSpace.id}`}
                                        selected={pathname === `/dashboard/${item.WorkSpace.id}`}
                                        title={item.WorkSpace.name}
                                        notifications={0}
                                        icon={
                                            <WorkspacePlaceholder>
                                                {item.WorkSpace.name.charAt(0)}
                                            </WorkspacePlaceholder>
                                        }
                                    />
                                )
                            )}
                        </ul>
                    </nav>
                </div>

                <Separator className="bg-neutral-800" />
                
                {workspaceInfo?.subscription?.plan === 'FREE' && (
                    <div className="rounded-lg bg-neutral-900 p-4 space-y-2">
                        <h3 className="text-sm font-medium">Upgrade to Pro</h3>
                        <p className="text-xs text-neutral-500">
                            Unlock AI features like transcription, AI summary, and more.
                        </p>
                        <Button variant="default" className="w-full mt-2 bg-white text-black hover:bg-neutral-200 h-8 text-xs rounded-md">
                            <Loader color='#0000' state={false}>
                                Upgrade
                            </Loader>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div className="h-full">
            <InfoBar />
            <div className="md:hidden fixed my-4">
                <Sheet>
                    <SheetTrigger asChild className="ml-2">
                        <Button variant="ghost" className="mt-[2px]">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-fit h-full bg-[#111111] border-neutral-800">
                        {SidebarSection}
                    </SheetContent>
                </Sheet>
            </div>
            <div className="md:block hidden h-full">
                {SidebarSection}
            </div>
        </div>
    )
}

export default Sidebar