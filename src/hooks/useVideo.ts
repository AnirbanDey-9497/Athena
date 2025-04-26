import { createCommentSchema } from '@/components/forms/comment-form/schema'
import { useMutationData } from './useMutationData'
import { useQueryData } from './useQueryData'
import useZodForm from './useZodForm'
import { createCommentAndReply, getUserProfile } from '@/actions/user'
import { useQueryClient } from '@tanstack/react-query'

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data: profileData } = useQueryData(['user-profile'], getUserProfile)
  const queryClient = useQueryClient()
  
  // Mutation for creating/replying to comments
  const { isPending, mutate } = useMutationData(
    ['new-comment'],
    async (data: { comment: string }) => {
      if (!profileData) throw new Error('No profile data')
      const response = profileData as { status: number; data: { id: string; image: string } }
      if (response.status !== 200) throw new Error('Invalid profile status')
      const result = await createCommentAndReply(response.data.id, data.comment, videoId, commentId)
      if (result?.status === 200) {
        // Invalidate and refetch comments
        await queryClient.invalidateQueries({ queryKey: ['video-comments', videoId] })
      }
      return result || { status: 400 }
    },
    'video-comments'
  )

  // Form handling
  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    async (data) => {
      await mutate(data)
      reset() // Reset form after successful submission
    }
  )

  // Return the form state
  return { 
    register,
    errors,
    onFormSubmit,
    isPending: isPending || !profileData || (profileData as any)?.status !== 200
  }
}
