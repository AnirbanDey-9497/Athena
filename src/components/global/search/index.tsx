import React from 'react'
import { useSearch } from '@/hooks/useSearch'
import { useMutationData } from '@/hooks/useMutationData'
type Props = {
    workspaceId: string
}

const Search = ({workspaceId}: Props) => {
    const {onSearchQuery, query, isFetching, onUsers} 
    = useSearch('get-users', 'USERS')
   
    return <div> Search</div>
}

//WIP: Wired to invite member
// const {mutate, isPending} = useMutationData(['invite-member'], 
//     (data: {recieverId: string; email: string })=> {

//     })
export default Search