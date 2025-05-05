import React from "react"
import { getWixContent } from '@/actions/workspace'
import VideoCard from '@/components/global/videos/video-card'

export default async function Home() {
  const videos = await getWixContent()

  return (
    <main className="flex flex-col min-h-screen bg-[#18181b]">
      <div className="flex-1 space-y-16">
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-12 bg-[#18181b]">
          <div className="container flex flex-col items-center gap-8 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-white drop-shadow-lg">
              One video is worth a thousand words
            </h1>
            <p className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8 text-gray-300">
              Easily record and share AI-powered video messages with your teammates and customers to supercharge productivity.
            </p>
            <a
              href="/download-desktop-app"
              className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-[#5b5df6] to-[#4345c7] text-white text-xl font-semibold shadow-xl hover:scale-105 transition-transform duration-200"
            >
              Download Desktop App
            </a>
          </div>
        </section>
        {/* Opal Showcase Section */}
        <section className="container flex flex-col items-center gap-8 text-center pb-16">
          <h2 className="text-3xl font-bold mb-6 text-white tracking-tight drop-shadow">
            Rekord Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-6xl">
            {videos.status === 200 && (videos.data?.length ?? 0) > 0 ? (
              (videos.data ?? []).map((video: any) => (
                <div key={video.id} className="bg-[#232336] rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-[1.025] duration-200">
                  <VideoCard
                    {...video}
                    workspaceId={video.workSpaceId}
                    showcase={true}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-2 text-lg text-gray-400">No videos found.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
