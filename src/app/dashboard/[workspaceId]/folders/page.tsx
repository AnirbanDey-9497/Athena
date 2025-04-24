'use client'

import { getWorkspaceFolders } from '@/actions/workspace'
import Folder from '@/components/global/folders/folder'
import { useQueryData } from '@/hooks/useQueryData'
import { FolderProps } from '@/components/global/folders'
import { cn } from '@/lib/utils'

type Props = {
    params: {
        workspaceId: string
    }
}

const FoldersPage = ({ params: { workspaceId } }: Props) => {
    const { data: queryData } = useQueryData(
        ['workspace-folders', workspaceId], 
        () => getWorkspaceFolders(workspaceId)
    )

    if (!queryData) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-neutral-300">Loading folders...</p>
            </div>
        )
    }

    const { status, data: folders } = queryData as FolderProps

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-semibold text-white">All Folders</h1>
            <div className={cn(
                status !== 200 && 'justify-center',
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            )}>
                {status !== 200 ? (
                    <p className="text-neutral-300">No folders in workspace</p>
                ) : (
                    folders?.map((folder) => (
                        <Folder
                            name={folder.name}
                            count={folder._count.videos}
                            id={folder.id}
                            key={folder.id}
                            workspaceId={workspaceId}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default FoldersPage 