import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"
import React from "react"

const AuthCallbackPage = async () => {
    //Authentication
    const auth = await onAuthenticateUser()
    console.log('Auth response:', auth)

    if (auth.status === 200 || auth.status === 201) {
        // Ensure user and workspace exist
        if (!auth.user?.workspace || auth.user.workspace.length === 0) {
            console.error('No workspace found for user')
            return redirect('/auth/sign-in')
        }

        // Redirect to the first workspace
        const workspaceId = auth.user.workspace[0].id
        console.log('Redirecting to workspace:', workspaceId)
        return redirect(`/dashboard/${workspaceId}`)
    }

    // Handle error cases
    console.error('Authentication failed with status:', auth.status)
    return redirect('/auth/sign-in')
}

export default AuthCallbackPage