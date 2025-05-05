import { getWixContent } from '@/actions/workspace'
import React from 'react'

type Props = {
    
}

const HomePage = async (props: Props) => {
    const video= await getWixContent()
    return <div>HomePage</div>
}

export default HomePage