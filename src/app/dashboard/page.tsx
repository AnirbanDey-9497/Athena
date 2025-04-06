import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const DashboardPage = async (props: Props) => {

    //Authentication
    const auth = await onAuthenticateUser()
    if(auth.status === 200 || auth.status === 201) {
        return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`)
    }
    if(auth.status === 400 || auth.status === 404 || auth.status === 500) {
        return redirect('/auth/sign-in')
    }
    //If account does not exist, redirect to sign-up
  return <div>DashboardPage</div>
}

export default DashboardPage