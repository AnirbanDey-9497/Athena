import { createCommentSchema } from '@/components/forms/comment-form/schema'
import { useMutationData } from './useMutationData'
import { useQueryData } from './useQueryData'
import useZodForm from './useZodForm'
import { createCommentAndReply, getUserProfile } from '@/actions/user'

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data: profileData } = useQueryData(['user-profile'], getUserProfile)
  
  // Always create the mutation, but only enable it when we have valid profile data
  const { isPending, mutate } = useMutationData(
    ['new-comment'],
    async (data: { comment: string }) => {
      if (!profileData) throw new Error('No profile data')
      const response = profileData as { status: number; data: { id: string; image: string } }
      if (response.status !== 200) throw new Error('Invalid profile status')
      return createCommentAndReply(response.data.id, data.comment, videoId, commentId)
    },
    'video-comments'
  )

  // Always create the form with the real mutate function
  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    mutate
  )

  // Return the form state
  return { 
    register,
    errors,
    onFormSubmit,
    isPending: isPending || !profileData || (profileData as any)?.status !== 200
  }
}
