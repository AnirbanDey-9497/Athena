import { getNotifications, onAuthenticateUser } from "@/actions/user"
import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces, verifyAccessToWorkspace } from "@/actions/workspace"
import { redirect } from "next/navigation"
import React from "react"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import Sidebar from "@/components/global/sidebar"
import GlobalHeader from "@/components/global/global-header"

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({ params, children }: Props) => {
    const workspaceId = params.workspaceId
    const auth = await onAuthenticateUser()

    // Check if user is authenticated and has a workspace
    if (!auth.user?.workspace || auth.user.workspace.length === 0) {
        redirect('/auth/sign-in')
    }

    // Check if users have access to the workspace
    const hasAccess = await verifyAccessToWorkspace(workspaceId)

    if (hasAccess.status !== 200) {
        redirect(`/dashboard/${auth.user.workspace[0].id}`)
    }

    if (!hasAccess.data?.workspace) {
        return null
    }

    const query = new QueryClient()
    
    // Prefetch all required data
    await Promise.all([
        query.prefetchQuery({
            queryKey: ['workspace-folders'],
            queryFn: () => getWorkspaceFolders(workspaceId),
        }),
        query.prefetchQuery({
            queryKey: ['user-videos'],
            queryFn: () => getAllUserVideos(workspaceId),
        }),
        query.prefetchQuery({
            queryKey: ['user-workspaces'],
            queryFn: () => getWorkSpaces(),
        }),
        query.prefetchQuery({
            queryKey: ['notifications'],
            queryFn: () => getNotifications(),
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen w-screen">
                <Sidebar activeWorkspaceId={workspaceId} />
                <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
                    <GlobalHeader workspace={hasAccess.data.workspace} />
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout
