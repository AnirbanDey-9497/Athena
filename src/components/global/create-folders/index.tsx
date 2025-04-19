'use client'

import React from 'react'

type Props = {
    workspaceId: string
}

const CreateFolders = ({ workspaceId }: Props) => {
    console.log('CreateFolders mounted with workspaceId:', workspaceId)
    return (
        <div>CreateFolders</div>
    )
}

export default CreateFolders