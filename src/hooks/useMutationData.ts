import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string | string[],
  onSuccess?: () => void
) => {
  console.log('useMutationData hook called with:', { mutationKey, queryKey })
  
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      console.log('Mutation success:', data)
      if (onSuccess) onSuccess()
      return toast(data?.status === 200 ? 'Success' : 'Error', {
        description: data?.data ? 'Folder created' : 'Failed to create folder',
      })
    },
    onError(error) {
      console.error('Mutation error:', error)
      toast.error('Something went wrong')
    },
    onSettled: async () => {
      console.log('Mutation settled, invalidating query:', queryKey)
      return await client.invalidateQueries({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        exact: true,
      })
    },
  })

  return { mutate, isPending }
}

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      }
    },
  })

  const latestVariables = data[data.length - 1]
  console.log('useMutationDataState:', { mutationKey, latestVariables })
  return { latestVariables }
}