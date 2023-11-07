import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'
import formatDate from '@/Utils/formatDate'
import { Repository } from '@/types/repository'
import { dataUserContext } from '@/src/app/context/user'
import { useRouter } from 'next/navigation'

interface Props {
    textSearch: string
}


function ShowProjects({ textSearch }: Props) {
    const { userContext } = useContext(dataUserContext)
    const router = useRouter()

    if (userContext.id.length > 0) {
        return (
            <>
                {userContext.repositorys
                    .filter((repository) => userContext.projects.includes(repository.id))
                    .filter((project: any) => project.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())).length > 0 ?
                    <div className='w-full flex flex-wrap gap-[50px] mt-[25px] max-md:justify-center max-lsm:justify-start pb-[10px]'>
                        {userContext.repositorys
                            .filter((repository) => userContext.projects.includes(repository.id))
                            .filter((project: any) => project.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()))
                            .map((project: Repository) => {
                                return (
                                    <div onClick={() => router.push(`/Dashboard/Project/${project.id}`)} key={project.id} className='w-[300px] h-[150px] border-[1px] border-emerald-500 rounded-[5px] p-[10px] group hover:border-white hover:bg-zinc-700 cursor-pointer duration-200'>
                                        <div className='w-full flex items-center gap-[5px]'>
                                            <Image src={project.avatar} alt={'Avatar'} width={45} height={45} className='rounded-full aspect-square' />
                                            <p className='truncate w-[240px]'>{project.name}</p>
                                        </div>

                                        {project.url && <Link href={project.url} target='__blank'><p className='truncate w-full text-neutral-400'>Url: {project.url}</p></Link>}

                                        <div className='flex gap-[5px] text-neutral-400 mt-[5px]'>
                                            {project.private ?
                                                <>
                                                    <p>Visibilidade: Privado</p>
                                                    <LockClosedIcon height={20} width={20} className='min-w-[20px] min-h-[20px]' />
                                                </>
                                                :
                                                <>
                                                    <p>Visibilidade: Publico</p>
                                                    <LockOpen2Icon height={20} width={20} className='min-w-[20px] min-h-[20px]' />
                                                </>
                                            }
                                        </div>

                                        <p className='text-neutral-400 mt-[5px] w-full truncate'>Criado: {formatDate(project.created_at)}</p>

                                    </div>
                                )
                            })}
                    </div>

                    :

                    <p className='text-center font-poiretOne mt-[40px] max-lg:mt-[20px] text-[50px] max-xl:text-[45px] max-lg:text-[45px] max-md:text-[35px] max-sm:text-[30px] max-lsm:text-[25px]'>
                        Ops... <br /> Parece que você ainda nao importou nenhum projeto, clique em adicionar e importe o primeiro!
                    </p>
                }
            </>
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

export default ShowProjects