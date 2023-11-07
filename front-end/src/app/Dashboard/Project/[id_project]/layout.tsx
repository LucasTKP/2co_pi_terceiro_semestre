'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import { Project } from "@/types/project"
import { ProjectContext } from "./context/projectContext"
import { ExecuterContext } from "./context/executerContext"


export default function RootLayout({ children, params }: { children: React.ReactNode, params: { id_project: string } }) {
    const [projectContext, setProjectContext] = useState<Project | null>(null)
    const [idExecuterTask, setIdExecuterTask] = useState<string | undefined>(undefined)

    useEffect(() => {
        GetProject()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function GetProject() {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id_project}`)
        setProjectContext(data)
    }



    if (projectContext) {
        return (
            <ProjectContext.Provider value={{ projectContext, setProjectContext }}>
                <ExecuterContext.Provider value={{idExecuterTask, setIdExecuterTask}}>
                    <section className="flex items-start">
                        <NavBar />
                        {children}
                    </section>
                </ExecuterContext.Provider>
            </ProjectContext.Provider>
        )
    } else {
        return (
            <div className='w-full h-full flex justify-center mt-[100px]'>
                <svg className="h-[50px] w-[50px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" style={{ strokeWidth: 4 }} />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        )
    }

}
