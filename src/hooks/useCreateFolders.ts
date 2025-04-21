import { createFolder } from '@/actions/workspace'
import { useMutationData } from './useMutationData'

export const useCreateFolders = (workspaceId: string) => {
  console.log('useCreateFolders hook called with workspaceId:', workspaceId)
  
  const { mutate } = useMutationData(
    ['create-folder'],
    async () => {
      console.log('createFolder mutation triggered')
      const response = await createFolder(workspaceId)
      console.log('createFolder response:', response)
      if (response.status !== 200) {
        throw new Error('Failed to create folder')
      }
      return response
    },
    ['workspace-folders', workspaceId]
  )

  const onCreateNewFolder = () => {
    console.log('onCreateNewFolder called')
    mutate({})
  }

  return { onCreateNewFolder }
}
