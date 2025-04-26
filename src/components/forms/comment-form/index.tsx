'use client'
import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useVideoComment } from '@/hooks/useVideo'
import { Send } from 'lucide-react'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

type Props = {
  videoId: string
  commentId?: string
  author: string
  close?: () => void
}

const CommentForm = ({ author, videoId, close, commentId }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  )
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) {
      router.push('/auth/sign-in')
      return
    }
    onFormSubmit(e)
  }

  return (
    <form
      className="relative w-full"
      onSubmit={handleSubmit}
    >
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={isSignedIn ? `Respond to ${author}...` : 'Sign in to comment...'}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
        disabled={!isSignedIn}
      />
      <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent"
        type="submit"
        disabled={isPending || !isSignedIn}
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  )
}

export default CommentForm
