import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import React, { useState } from 'react'
import Loader from '../loader'
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone'
import { FileDuoToneBlack } from '@/components/icons'
import {
  Bot,
  DownloadIcon,
  FileTextIcon,
  Pencil,
  StarsIcon,
  VideoIcon,
} from 'lucide-react'

type Props = {
  plan: 'PRO' | 'FREE'
  trial: boolean
  videoId: string
  transcript?: string
}

const AiTools = ({ plan, trial, videoId, transcript = '' }: Props) => {
  // State for AI Q&A
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Ask AI handler
  const askAI = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAnswer('')
    setError('')
    try {
      const res = await fetch('http://localhost:5001/api/ai-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, transcript, plan }),
      })
      const data = await res.json()
      if (res.ok) setAnswer(data.answer)
      else setError(data.error || 'AI Q&A failed')
    } catch (err) {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <TabsContent value="Ai tools">
      <div className="p-5 bg-[#1D1D1D]  rounded-xl flex flex-col gap-y-6 ">
        <div className="flex items-center gap-4">
          <div className="w-full">
            <h2 className="text-3xl font-bold"> Ai Tools</h2>
            <p className="text-[#BDBDBD] ">
              Taking your video to the next step with the power of AI!
            </p>
          </div>

          <div className="flex gap-4 w-full justify-end">
            <Button className=" mt-2 text-sm">
              <Loader
                state={false}
                color="#000"
              >
                Try now
              </Loader>
            </Button>
            {/* WIP: Pay button  */}
            <Button
              className="mt-2 text-sm"
              variant={'secondary'}
            >
              <Loader
                state={false}
                color="#000"
              >
                Pay Now
              </Loader>
            </Button>
          </div>
        </div>
        <div className=" border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f] ">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#a22fe0]"> Rekord Ai</h2>
            <StarsIcon
              color="#a22fe0"
              fill="#a22fe0"
            />
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b] ">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">Summary</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b] ">
              <FileTextIcon color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">Summary</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b] ">
              <Bot color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">AI Agent</h3>
              <p className="text-muted-foreground text-sm">
                Viewers can ask questions on your video and our ai agent will
                respond.
              </p>
            </div>
          </div>
          {/* AI Q&A UI for PRO users */}
          {plan === 'PRO' ? (
            <div className="mt-6 p-4 bg-[#232336] rounded-xl flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#a22fe0]">Ask AI about this video</h3>
              <form onSubmit={askAI} className="flex flex-col gap-2">
                <input
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="Ask about this video..."
                  className="border p-2 rounded bg-[#18181b] text-white"
                />
                <Button type="submit" disabled={loading || !question} className="bg-[#a22fe0] text-white px-4 py-2 rounded">
                  {loading ? 'Asking...' : 'Ask'}
                </Button>
              </form>
              {answer && <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">{answer}</div>}
              {error && <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">{error}</div>}
            </div>
          ) : (
            <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded">
              Upgrade to PRO to use AI Q&A features!
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  )
}

export default AiTools
