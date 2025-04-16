import React from "react"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-16">
        <section className="pt-24 md:pt-32">
          <div className="container flex flex-col items-center gap-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Share AI powered videos with your friends
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Record, upload, and share videos with AI-powered features like transcription and summaries.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
