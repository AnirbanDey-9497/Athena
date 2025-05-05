import { getWixContent, howToPost } from '@/actions/workspace'
//import HowToPost from '@/components/global/how-to-post'
import VideoCard from '@/components/global/videos/video-card'
import React from 'react'
import Videos from '@/components/global/videos'

// Add type for params
interface Props {
  params: {
    workspaceId: string
  }
}

const Home = async ({ params }: Props) => {
  const videos = await getWixContent()
  const post = await howToPost()

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      {/* Recent Videos Section */}
      <div className="w-full max-w-4xl flex flex-col gap-4 mb-8">
        <h2 className="text-2xl font-semibold text-white">Recent Videos</h2>
        <p className="text-neutral-400">Your recently uploaded and shared videos</p>
        <Videos 
          workspaceId={params.workspaceId} 
          folderId={params.workspaceId}
          videosKey="workspace-videos" 
        />
      </div>
      {/* Opal Showcase Section */}
      <h1 className="text-2xl font-bold">Rekord Showcase</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-1/2">
        {videos.status === 200
          ? videos.data?.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                workspaceId={video.workSpaceId!}
              />
            ))
          : ''}
        {/* <HowToPost
          title={post?.title}
          html={post?.content}
        /> */}
      </div>
    </div>
  )
}

export default Home
