

import CreateWorkspace from "@/components/global/create-workspace"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

type Props = {
    params: {workspaceId: string}
}

const Page = ({params}: Props) => {
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

                </div>
            </div>
        </Tabs>
    </div>
    )
}

export default Page