import React from 'react'
import { useSearch } from '@/hooks/useSearch'
import { useMutationData } from '@/hooks/useMutationData'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
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
      <div>
                {[{id: 'asdfrgt',  image:"asdfhyt", firstname: "Anirban", lastname: "Dey"}].map((user) => (
                    <div key={user.id} className='flex gap-x-3 items-center border-2 w-full p-3 rounded-xl'>
                        <Avatar>
                            <AvatarImage src={user.image as string}/>
                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col items-start'>
                            <h3 className= "text-bold text-lg capitalize">{user.firstname} {user.lastname}</h3>
                        </div>
                    </div>
                ))}
            </div>
     {isFetching ? (
        <div className='flex flex-col gap-y-2'>
            <Skeleton className='w-full h-8 rounded-xl'/>
        </div> 
     ) : !onUsers ? (
        <p className="text-center text-sm text-[#a4a4a4]">No users found</p>
        )   : ( null
            // <div>
            //     {onUsers.map((user) => (
            //         <div key={user.id} className='flex gap-x-3 items-center border-2 w-full p-3 rounded-xl'>
                        
            //         </div>
            //     ))}
            // </div>
         )
     
        
    }
</div>
)
}

export default Search