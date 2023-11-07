import { MagnifyingGlassIcon, LockClosedIcon, LockOpen2Icon, PlusIcon } from '@radix-ui/react-icons'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './scrollBar.module.css'
import { Repository } from '@/types/repository'
import { dataUserContext } from '@/src/app/context/user'
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios'

function Modalrepositories() {
    const { userContext, setUserContext } = useContext(dataUserContext)
    const [modal, setModal] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [loading, setLoading] = useState(false)

    async function assignRepository(repository: Repository) {
        setLoading(true)
        const result = await VerifyProject(repository.id)

        if (result.status === 404) {
            const response2 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
                id: repository.id,
                name: repository.name,
                idCowokers: [userContext.id]
            })
        } else {
            await UpdateProject(repository.id, result.idCowokers)
        }

        await UpdateUser(repository.id)

        setModal(false)
        setLoading(false)
    }

    async function VerifyProject(idRepository: string) {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${idRepository}`)
        return data
    }

    async function UpdateUser(idRepository: string) {
        const idProjects = [...userContext.projects, idRepository]

        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userContext.id}`, {
            idProjects
        })

        if (response.status === 204) {
            setUserContext({ ...userContext, projects: idProjects })
        }
    }

    async function UpdateProject(idRepository: string, idCoworkers: []) {
        const idCowokers = [...idCoworkers, userContext.id]

        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${idRepository}`, {
            idCowokers
        })
    }

    return (
        <Dialog.Root onOpenChange={setModal} open={modal}>
            {loading &&
                <div className='top-0 left-0 w-full h-full flex justify-center items-center z-50 fixed bg-white/50 backdrop-blur-[2px]'>
                    <svg className="h-[50px] w-[50px] animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" style={{ strokeWidth: 4 }} />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            }
            <Dialog.Trigger className='p-[6px] max-md:p-[2px] group bg-white hover:bg-transparent border-[1px] border-white duration-200 rounded-[8px]'>
                <p className='text-black group-hover:text-white duration-200 max-md:hidden px-[8px]'>Adicionar</p>
                <PlusIcon width={30} height={28} className='aspec-square text-black group-hover:text-white duration-200 max-md:block hidden ' />
            </Dialog.Trigger>

            <Dialog.Content className='w-screen h-screen flex justify-center items-center top-0 left-0 fixed'>
                <Dialog.Close className='w-screen h-screen top-0 left-0 bg-black/50 fixed backdrop-blur-sm cursor-default' />
                <div className='bg-[#171717] max-w-[600px] max-h-[500px] w-[90%] max-sm:w-full h-full  rounded-[8px] border-[2px] border-[#5e5e5e] px-[20px] flex flex-col items-center relative py-[5px]'>
                    <button onClick={() => setModal(false)} className='w-[28px] h-[26px] absolute right-[8px] top-[8px] flex justify-center items-center'>
                        <div className='w-[3px] absolute h-[25px] rounded-[10px] bg-[#838282] rotate-45' />
                        <div className='w-[3px] absolute h-[25px] rounded-[10px] bg-[#838282] rotate-[-45deg]' />
                    </button>

                    <p className='text-[25px] mt-[20px] text-center'>Importe Repositórios do GitHub</p>

                    <label className='mt-[15px] w-[80%] flex border-[1px] border-[#838282] rounded-[4px] items-center gap-[5px] px-[5px] py-[2px]'>
                        <MagnifyingGlassIcon width={25} height={25} className='text-[#838282]' />
                        <input onChange={(text) => setTextSearch(text.target.value.trim())} className='text-[16px] placeholder:text-[#838282] outline-none bg-transparent' placeholder='Procurar...' />
                    </label>

                    <div id={styles.box} className='border-[2px] border-[#838282] my-[20px] w-full h-full rounded-[4px] overflow-auto'>
                        {userContext.repositorys
                            .filter((repository) => !userContext.projects.includes(repository.id))
                            .filter((repository) => repository.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())).length > 0 ?

                            userContext.repositorys.filter((repository) => !userContext.projects.includes(repository.id))
                                .filter((repository) => repository.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()))
                                .map((repository: Repository, index: number) => {

                                    return (
                                        <div key={repository.id} className={`flex justify-between items-center py-[8px] px-[5px] ${index != userContext.repositorys.length - 1 && 'border-b-[1px] border-[#838282]'}`}>
                                            <div className='flex items-center gap-[10px] max-lsm:gap-[5px]'>
                                                <Image src={repository.avatar} width={45} height={45} alt="Logo do projeto" className='aspect aspect-square rounded-full' />
                                                <p className='text-[18px] overflow-hidden text-ellipsis w-[350px] max-sm:w-[180px] max-lsm:w-[130px]'>{repository.name}</p>

                                                {repository.private ?
                                                    <LockClosedIcon height={20} width={20} className='min-w-[20px] min-h-[20px] text-[#838282]' />
                                                    :
                                                    <LockOpen2Icon height={20} width={20} className='min-w-[20px] min-h-[20px] text-[#838282]' />
                                                }
                                            </div>
                                            <div>
                                                <button disabled={loading} onClick={() => assignRepository(repository)} className='bg-white text-black px-[5px] py-[3px] rounded-[4px] group hover:bg-transparent hover:text-white hover:border-white hover:border-[1px] duration-200'>
                                                    <p className='font-[500]'>Importar</p>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            :

                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <Image src={'/images/notFoundRepository.png'} alt="" width={200} height={200} quality={100} />
                                <p className='text-[25px] text-center'>Não foi possivel localizar <br /> nenhum repositorio</p>
                            </div>
                        }
                    </div>
                </div>

            </Dialog.Content>
        </Dialog.Root>
    )
}

export default Modalrepositories
