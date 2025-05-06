import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: {
    videoId: string
  }
}

const VideoPage = async ({ params }: { params: { videoId: string } }) => {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['video', params.videoId],
    queryFn: () => getPreviewVideo(params.videoId)
  })

  

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={params.videoId} />
    </HydrationBoundary>
  )
}

export default VideoPage
