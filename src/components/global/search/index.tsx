import React from 'react'
import { useSearch } from '@/hooks/useSearch'
import { useMutationData } from '@/hooks/useMutationData'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
type Props = {
    workspaceId: string
}

const Search = ({workspaceId}: Props) => {
    const {onSearchQuery, query, isFetching, onUsers} 
    = useSearch('get-users', 'USERS')
   
   

//WIP: Wired to invite member
// const {mutate, isPending} = useMutationData(['invite-member'], 
//     (data: {recieverId: string; email: string })=> {

//     })

return (
<div className="flex flex-col gap-y-5">
    <Input onChange= {onSearchQuery} value={query}
     className="bg-transparent border-2 outline-none"
     placeholder= " Search for your user.."
     type="text"
     />
     {isFetching ? (
        <div className='flex flex-col gap-y-2'>
            <Skeleton className='w-full h-8 rounded-xl'/>
        </div> 
     ) : !onUsers ? (
        <p className="text-center text-sm text-[#a4a4a4]">No users found</p>
        )   : (
            ''
         )
     
        
    }
</div>
)
}

export default Search