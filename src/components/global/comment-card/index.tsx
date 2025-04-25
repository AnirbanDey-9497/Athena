'use client'
import CommentForm from '@/components/forms/comment-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CommentRepliesProps } from '@/types/index.type'
import { MessageCircle, User } from 'lucide-react'
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
  const daysAgo = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000)
  )

  const initials = `${author.firstname?.[0] || ''}${author.lastname?.[0] || ''}`

  return (
    <Card
      className={cn(
        isReply
          ? 'bg-[#1D1D1D] pl-10 border-none shadow-none'
          : 'border-[1px] bg-[#1D1D1D] p-5 shadow-none',
        'relative group'
      )}
    >
      <div className="flex gap-x-2 items-start">
        <Avatar>
          <AvatarImage
            src={author.image}
            alt={`${author.firstname} ${author.lastname}`}
          />
          <AvatarFallback className="bg-[#252525] text-white">
            {initials || <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center text-sm">
            <span className="capitalize text-[#BDBDBD]">
              {author.firstname} {author.lastname}
            </span>
            <span className="text-[#707070] text-xs mx-2">•</span>
            <span className="text-[#707070] text-xs">
              {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
            </span>
          </div>
          <p className="text-[#BDBDBD] mt-2 break-words">{comment}</p>
          
          <div className="flex items-center gap-3 mt-3">
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOnReply(!onReply)}
                className="text-sm px-2 py-1 h-auto hover:bg-white/5"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Reply
                {reply.length > 0 && <span className="ml-1">{reply.length}</span>}
              </Button>
            )}
          </div>

          {!isReply && onReply && (
            <div className="mt-3">
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

      {reply.length > 0 && (
        <div className="flex flex-col gap-y-5 mt-5 border-l-2 border-white/10">
          {reply.map((r) => (
            <CommentCard
              isReply
              reply={[]}
              comment={r.comment}
              commentId={r.commentId!}
              videoId={videoId}
              key={r.id}
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
    </Card>
  )
}

export default CommentCard
