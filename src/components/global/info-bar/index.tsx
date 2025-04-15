'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Props = {}

const InfoBar = (props: Props) => {
    return (
        <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
            <div className="flex gap-2 items-center bg-[#111111] border border-neutral-800 rounded-lg px-4 py-2 w-full max-w-lg">
                <Search size={20} className="text-neutral-500" />
                <Input 
                    className="bg-transparent border-none text-sm text-neutral-400 placeholder:text-neutral-500 focus-visible:ring-0 px-0"
                    placeholder="Search for people, projects"
                />
            </div>
        </header>
    )
}

export default InfoBar