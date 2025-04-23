import { createWorkspace } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"
import useZodForm from "./useZodForm"
import { workspaceSchema } from "@/components/forms/workspace-forms/schema"

export const useCreateWorkspace = () => {
    const {mutate, isPending} = useMutationData(
        ['create-workspace'],
        async (data: { name: string }) => {
            const response = await createWorkspace(data.name)
            if (response.status !== 201) {
                throw new Error(response.data || 'Failed to create workspace')
            }
            return response
        },
        'user-workspaces'
    )
    const {errors, onFormSubmit, register} = useZodForm(workspaceSchema, mutate)

    return {errors, onFormSubmit, register, isPending}
}