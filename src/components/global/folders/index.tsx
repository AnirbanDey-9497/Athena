'use client'
import FolderDuotone from '@/components/icons/folder-duotone'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import Folder from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'
type Props = {
    workspaceId: string
}

export type FolderProps = {
    status: number
    data: ({
        _count: {
            videos: number
        }
    } & {
        id: string
        name: string
        createdAt: Date
        workSpaceId: string|null
    })[]
}

const Folders = ({workspaceId}: Props) => {
    const dispatch = useDispatch()
    const {data: queryData, isFetched} = useQueryData(['workspace-folders', workspaceId], () => getWorkspaceFolders(workspaceId))
    const {latestVariables} = useMutationDataState(['create-folder'])

    if (!queryData) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <FolderDuotone />
                        <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-[#BDBDBD]">View All</p>
                        <ArrowRight color='#707070' />
                    </div>
                </div>
                <section className="flex items-center justify-center">
                    <p className='text-neutral-300'>Loading folders...</p>
                </section>
            </div>
        )
    }

    const {status, data: folders} = queryData as FolderProps

    if (isFetched && folders) {
        dispatch(FOLDERS({ folders: folders }))
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <FolderDuotone />
                    <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[#BDBDBD]">View All</p>
                    <ArrowRight color='#707070' />
                </div>
            </div>
            <section className={cn(
                status !== 200 && 'justify-center',
                'flex items-center gap-4 overflow-x-auto w-full')}>
                {status !== 200 ? (
                    <p className='text-neutral-300'>No folders in workspace</p>
                ) : (
                    <>
                        {latestVariables && latestVariables.status === "pending" && (
                            <Folder 
                                name="Untitled"
                                id="temp-id"
                                optimistic={true}
                                count={0}
                                workspaceId={workspaceId}
                            />
                        )}
                        {folders?.map((folder) => (
                            <Folder
                                name={folder.name}
                                count={folder._count.videos}
                                id={folder.id}
                                key={folder.id}
                                workspaceId={workspaceId}
                            />
                        ))}
                    </>
                )}
            </section>
        </div>
    )
}

export default Folders