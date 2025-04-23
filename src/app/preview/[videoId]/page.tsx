import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

type Props = {
  params: Promise<{
    videoId: string
  }>
}

const VideoPage = async ({ params }: Props) => {
  const { videoId } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['preview-video', videoId],
    queryFn: () => getPreviewVideo(videoId)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full h-full">
        <VideoPreview videoId={videoId} />
      </div>
    </HydrationBoundary>
  )
}

export default VideoPage

