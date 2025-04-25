'use client'

import { getAllUserVideos } from '@/actions/workspace'
import Videos from '@/components/global/videos'
import { useQueryData } from '@/hooks/useQueryData'

type Props = {
    params: {
        workspaceId: string
    }
}

const HomePage = ({ params: { workspaceId } }: Props) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-white">Recent Videos</h2>
                <p className="text-neutral-400">Your recently uploaded and shared videos</p>
            </div>
            <Videos 
                workspaceId={workspaceId} 
                folderId={workspaceId}
                videosKey="workspace-videos" 
            />
        </div>
    )
}

export default HomePage 