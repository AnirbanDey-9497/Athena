'use client'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import CommentForm from '@/components/forms/comment-form'
import CommentCard from '../comment-card'
import { useQueryData } from '@/hooks/useQueryData'
import { getVideoComments } from '@/actions/user'
import { VideoCommentProps } from '@/types/index.type'

type Props = {
  author: string
  videoId: string
}

const Activities = ({ author, videoId }: Props) => {
  const { data: commentsData, isPending } = useQueryData(
    ['video-comments', videoId],
    () => getVideoComments(videoId)
  )

  return (
    <TabsContent
      value="Activity"
      className="rounded-xl p-5 bg-[#1D1D1D] flex flex-col gap-4"
    >
      <CommentForm
        author={author}
        videoId={videoId}
      />
      
      {isPending ? (
        <div className="text-white/50 text-center py-4">
          Loading comments...
        </div>
      ) : !commentsData ? (
        <div className="text-white/50 text-center py-4">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <>
          {(commentsData as VideoCommentProps).data.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.comment}
              author={{
                image: comment.User?.image || '',
                firstname: comment.User?.firstname || '',
                lastname: comment.User?.lastname || '',
              }}
              videoId={videoId}
              reply={comment.reply}
              commentId={comment.id}
              createdAt={comment.createdAt}
            />
          ))}
          {(commentsData as VideoCommentProps).data.length === 0 && (
            <div className="text-white/50 text-center py-4">
              No comments yet. Be the first to comment!
            </div>
          )}
        </>
      )}
    </TabsContent>
  )
}

export default Activities
