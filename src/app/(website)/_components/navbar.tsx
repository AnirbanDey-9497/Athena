import { User, Menu } from "lucide-react"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {}

const LandingPageNavBar = (props: Props) => {
    return (
        <div className="flex w-full justify-between items-center">
            <div className="text-3xl font-semibold flex items-center gap-x-3">
                <Menu className="w-8 h-8" />
                <Image 
                alt="logo"
                src="/evo-logo.png"
                width={40}
                height={40}
                className="rounded-lg"
                />
                Evo
            </div>
            <div className="hidden gap-x-10 items-center lg:flex">
                <Link
                 href="/"
                 className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full 
                 hover:bg-[#7320DD]/80"
                 >
                    Home
                    </Link>
                <Link href="/" className="text-white hover:text-neutral-300 transition">Pricing</Link>
                <Link href="/" className="text-white hover:text-neutral-300 transition">Contact</Link>
            </div>
            <Link href="/auth/sign-in">
            <Button className="text-base flex gap-x-2 bg-white text-black hover:bg-neutral-200">
                <User className="h-5 w-5" />
                Login
            </Button>
            </Link>
           
            </div>
    )
}

export default LandingPageNavBar
