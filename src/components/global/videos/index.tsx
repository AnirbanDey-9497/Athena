'use client'
import { getAllUserVideos } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import { VideosProps } from '@/types/index.type'
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone'
type Props = {
    folderId: string
    videosKey: string
    workspaceId: string
}

const Videos = ({folderId, videosKey, workspaceId}: Props) => {
  
    const {data: videoData} = useQueryData([videosKey], () => getAllUserVideos(folderId))

    const {status:videoStatus, data: videos} = videoData as VideosProps
  
    return (
        <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <VideoRecorderDuotone />
            <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
          </div>
        </div>
        </div>
  )
}

export default Videos