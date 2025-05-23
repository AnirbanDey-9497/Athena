'use client'

import CreateFolders from "@/components/global/create-folders"
import CreateWorkspace from "@/components/global/create-workspace"
import Folders from "@/components/global/folders"
import Videos from "@/components/global/videos"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"

const Page = () => {
    const params = useParams()
    const workspaceId = params.workspaceId as string

    return (
    <div>
        <Tabs defaultValue="videos" className="mt-6">
            <div className="flex w-full justify-between items-center">
                <TabsList className="bg-transparent border border-neutral-800 p-1 rounded-full gap-1">
                    <TabsTrigger 
                        className="px-6 py-2 rounded-full text-sm font-medium text-neutral-400 
                        transition-all data-[state=active]:bg-[#252525] data-[state=active]:text-white
                        hover:text-white" 
                        value="videos"
                    >
                        Videos
                    </TabsTrigger>
                    <TabsTrigger 
                        className="px-6 py-2 rounded-full text-sm font-medium text-neutral-400 
                        transition-all data-[state=active]:bg-[#252525] data-[state=active]:text-white
                        hover:text-white" 
                        value="archive"
                    >
                        Archive
                    </TabsTrigger>
                </TabsList>
                <div className="flex gap-x-3">
                    <CreateWorkspace />
                    <CreateFolders workspaceId={workspaceId} />
                </div>
            </div>
            <section className="py-9">
                <TabsContent value="videos">
                    <div className="space-y-4">
                        <Folders workspaceId={workspaceId} />
                        <Videos 
                            folderId={workspaceId}
                            videosKey={`videos-${workspaceId}`}
                            workspaceId={workspaceId}
                        />
                    </div>
                </TabsContent>
            </section>
        </Tabs>
    </div>
    )
}

export default Page