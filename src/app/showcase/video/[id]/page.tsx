import { client } from '@/lib/prisma'
import React from 'react'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export default async function PublicVideoPage({ params }: Props) {
  const video = await client.video.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      source: true,
      description: true,
      processing: true,
    },
  })

  if (!video) return notFound()

  return (
    <main className="min-h-screen bg-[#18181b] flex flex-col items-center justify-center p-6">
      <div className="bg-[#232336] rounded-2xl shadow-lg p-8 w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">{video.title}</h1>
        <p className="text-gray-400 mb-6 text-center">{video.description || 'No description.'}</p>
        <div className="w-full aspect-video bg-black rounded-lg mb-6 flex items-center justify-center overflow-hidden">
          <video
            controls
            className="w-full h-full rounded-lg"
            poster=""
            preload="metadata"
            style={{ background: "#000" }}
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  )
} 