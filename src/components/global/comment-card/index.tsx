'use client'
import CommentForm from '@/components/forms/comment-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { CommentRepliesProps } from '@/types/index.type'
import { User } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  comment: string
  author: { image: string; firstname: string; lastname: string }
  videoId: string
  commentId?: string
  reply: CommentRepliesProps[]
  isReply?: boolean
  createdAt: Date
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`
  }
  if (diffInHours > 0) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`
  }
  if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`
  }
  return 'Just now'
}

const CommentCard = ({
  author,
  comment,
  reply,
  videoId,
  commentId,
  isReply,
  createdAt,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false)
  const timeAgo = formatTimeAgo(new Date(createdAt))
  const initials = `${author.firstname?.[0] || ''}${author.lastname?.[0] || ''}`

  // Sort replies by most recent first
  const sortedReplies = [...reply].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className={cn("flex flex-col gap-3", isReply && "ml-12")}>
      <div className="flex gap-x-3">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage
            src={author.image}
            alt={`${author.firstname} ${author.lastname}`}
          />
          <AvatarFallback className="bg-[#252525] text-white">
            {initials || <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium">
              {author.firstname} {author.lastname}
            </span>
            <span className="text-xs text-[#AAAAAA]">{timeAgo}</span>
          </div>
          
          <p className="text-[13px] mt-1">{comment}</p>
          
          <div className="flex flex-col mt-1">
            {!isReply && reply.length > 0 && (
              <span className="text-[13px] text-[#3EA6FF] mb-1">
                {reply.length} {reply.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
            {!isReply && (
              <button
                onClick={() => setOnReply(!onReply)}
                className="text-[13px] text-[#AAAAAA] hover:text-white w-fit"
              >
                Reply
              </button>
            )}
          </div>

          {onReply && !isReply && (
            <div className="mt-4">
              <CommentForm
                close={() => setOnReply(false)}
                videoId={videoId}
                commentId={commentId}
                author={author.firstname + ' ' + author.lastname}
              />
            </div>
          )}
        </div>
      </div>

      {sortedReplies.length > 0 && (
        <div className="flex flex-col gap-4">
          {sortedReplies.map((r) => (
            <CommentCard
              key={r.id}
              isReply
              reply={[]}
              comment={r.comment}
              commentId={r.id}
              videoId={videoId}
              author={{
                image: r.User?.image || '',
                firstname: r.User?.firstname || '',
                lastname: r.User?.lastname || '',
              }}
              createdAt={r.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentCard
