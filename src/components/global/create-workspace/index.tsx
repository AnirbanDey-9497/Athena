'use client'

import { useQueryData } from "@/hooks/useQueryData"
import { getWorkSpaces } from "@/actions/workspace"
import React from "react"
import Modal from "../modal"
import { Button } from "@/components/ui/button"
import FolderPlusDuotone from "@/components/icons/folder-plus-duotone"

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data, isPending} = useQueryData(['user-workspaces'], getWorkSpaces)

    if (isPending) {
        return null
    }

    const {data: plan} = data as {
        status: number,
        data: {
            subscription: {
                plan: 'PRO' | 'FREE'
            } | null
        }
    }

    if(!plan?.subscription) {
        return null
    }

    // if(plan.subscription.plan==='FREE') {
    //     return <></>
    // }

    // if(plan.subscription.plan==='PRO') {
        return (
            <Modal
                title="Create a Workspace"
                description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
                trigger={
                    <Button 
                        className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
                        aria-label="Create Workspace"
                    >
                        <FolderPlusDuotone />
                        <span>Create Workspace</span>
                    </Button>
                }
            >
                
            </Modal>
        )
    }

//    return <div>Create Workspace</div>
//}

export default CreateWorkspace


