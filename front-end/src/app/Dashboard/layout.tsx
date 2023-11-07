'use client'
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { useContext, useEffect } from "react"
import { dataUserContext } from "../context/user"
import getRepositories from "@/Utils/GitHub/Repositories/getRepositories"


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()
    const { userContext, setUserContext } = useContext(dataUserContext)

    function VerifySession() {
        if (session === null) {
            window.location.replace('/')
        }
    }

    useEffect(() => {
        VerifySession()
        GetDataUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    async function GetDataUser() {
        if (session && userContext.repositorys.length === 0) {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user.id}`)

            if (data.status != 200) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                    id: session?.user.id,
                    username: session?.user.name,
                    email: session?.user.email,
                    avatar: session?.user.image
                })
            }

            const repositorys = await getRepositories(session?.user.token)

            setUserContext({
                id: data?.id,
                username: session?.user.name,
                email: session?.user.email,
                avatar: session?.user.image,
                token: session?.user.token,
                repositorys: repositorys,
                projects: [...data.idProjects]
            })

        }
    }

    return (
        <>
            {children}
        </>

    )
}
