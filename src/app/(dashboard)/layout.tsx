import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}

export default DashboardLayout 