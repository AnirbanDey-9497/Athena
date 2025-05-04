import React from 'react'

type Props = {
    videoId: string
    title: string
    description: string
}

const EditVideo = ({ videoId, title, description }: Props) => {
    return (
        <div>
            <h1>Edit Video</h1>
        </div>
    )
}

export default EditVideo