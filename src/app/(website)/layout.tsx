import React from "react"
import LandingPageNavBar from "./_components/navbar"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative">
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <LandingPageNavBar />
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout

