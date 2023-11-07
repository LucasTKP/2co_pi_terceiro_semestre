import React, { Dispatch, SetStateAction, use, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { dataUserContext } from '@/src/app/context/user'
import Link from 'next/link'
import { ExecuterContext } from '../../context/executerContext'
import { ProjectContext } from '../../context/projectContext'


function Index() {
    const {idExecuterTask, setIdExecuterTask} = useContext(ExecuterContext)
    const [navBar, setNavBar] = useState<Boolean>(window.innerWidth < 1025 ? false : true)
    const { projectContext } = useContext(ProjectContext)
    const { userContext } = useContext(dataUserContext)
    const [menuCowokers, setMenuCowokers] = useState<Boolean>(true)

    useEffect(() => {
        if(window.innerWidth < 1025){
            setNavBar(false)
        }

    },[idExecuterTask])


    return (
        <section className={`max-lg:fixed ${navBar ? 'w-[400px] max-lg:w-full bg-[#282828] text-gray-300' : 'w-[35px]'} duration-300`}>
            <div className={`${navBar ? 'p-[20px] lg:border-r-[3px] border-r-[#4A4A4A] w-[400px] max-lg:w-full' : 'w-[0px]'} duration-300  h-screen flex flex-col`}>
                <Image src={'/icons/twoArrows.svg'} width={20} height={17} alt='' onClick={() => { setNavBar(!navBar), setMenuCowokers(!navBar) }} className={`cursor-pointer flex items-center duration-300 ${navBar ? 'self-end' : 'rotate-180 absolute mt-[20px] ml-[10px]'}`} />

                <p className='text-[22px] text-emerald-500 truncate mt-[15px]'>{projectContext?.name}</p>

                <div className='flex items-center mt-[30px] min-h-[51px]'>
                    {userContext.avatar ?
                        <Image src={userContext.avatar} priority width={51} height={51} alt="" className='rounded-[8px] drop-shadow-[0px_0px_5px_rgba(255,255,255,0.25)]' />
                        :
                        <svg className="h-[30px] w-[30px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" style={{ strokeWidth: 4 }} />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    <p className='ml-[20px] text-[20px] truncate'>{userContext.username}</p>
                </div>

                <hr className='w-[30%] h-[3px] rounded-full bg-[#D9D9D9] my-[30px]' />

                <div className='px-[10px]  gap-y-[30px] flex flex-col'>
                    <div onClick={() => setIdExecuterTask(userContext.id)} className={`flex items-center gap-x-[30px] text-[18px] ${idExecuterTask === userContext.id && 'opacity-70'}`}>
                        <Image src={'/icons/user.svg'} width={28} height={28} alt='' className='hover:opacity-70 cursor-pointer duration-100' />
                        <p className='hover:opacity-70 cursor-pointer duration-100 truncate'>Minhas Tarefas</p>
                        <p className='opacity-[0.60] ml-auto hover:opacity-40 cursor-pointer duration-100 truncate'>{projectContext?.tasks.filter((tastk) => tastk.idExecuter === userContext.id).length}</p>
                    </div>


                    <div onClick={() => setIdExecuterTask(undefined)} className={`flex items-center gap-x-[30px] text-[18px] ${idExecuterTask === undefined && 'opacity-70'}`}>
                        <Image src={'/icons/calendarNavBar.svg'} width={28} height={26} alt='' className={`hover:opacity-70 cursor-pointer duration-100`} />
                        <p className='hover:opacity-70 cursor-pointer duration-100 truncate'>Tarefas</p>
                        <p className='opacity-[0.60] ml-auto hover:opacity-40 cursor-pointer duration-100 truncate'>{projectContext?.tasks.length}</p>
                    </div>

                    <div>
                        <div onClick={() => setMenuCowokers(!menuCowokers)} className={`flex items-center gap-x-[30px] text-[18px]`}>
                            <Image src={'/icons/twoHand.svg'} width={0} height={24} alt='' className='w-auto h-[24px] hover:opacity-70 cursor-pointer duration-100' />
                            <p className='hover:opacity-70 cursor-pointer duration-100 truncate'>Equipe</p>
                            <Image src={'/icons/arrowBottom.svg'} width={0} height={8} alt='' className={`w-auto h-[8px] ${navBar ? 'ml-auto hover:opacity-70 cursor-pointer duration-100' : 'hidden'} ${menuCowokers ? '' : 'rotate-180 duration-100'}`} />
                        </div>

                        <div className={`duration-200 relative w-full flex flex-col gap-y-[5px] mt-[15px] ${menuCowokers ? 'h-[100%]' : 'h-[0%]'}`}>
                            {projectContext?.coworkers.map((cowoker) => {
                                if(userContext.id === cowoker.id){
                                    return
                                }

                                return (
                                    <button onClick={() => setIdExecuterTask(cowoker.id)} className={`outline-none h-full cursor-default ${navBar && 'w-fit '} ${idExecuterTask === cowoker.id && 'opacity-70'}`} key={cowoker.id}>
                                        <p className='cursor-pointer text-emerald-500 font-semibold truncate ml-[60px] text-left hover:opacity-70 duration-100 h-full overflow-y-hidden'>{cowoker.username}</p>
                                    </button>
                                )
                            })}

                            <div className={`w-[3px] h-[90%] bg-[#4E4E4E] rounded-full ml-[14px] ${navBar ? 'absolute' : 'w-full max-w-[0px]'}`} />
                        </div>
                    </div>
                </div>

                <Link href='/Dashboard' className='cursor-pointer hover:opacity-70 duration-100 mt-auto flex items-center'>
                    <Image src={'/icons/arrowLeft.svg'} width={0} height={19} alt='' className='w-auto h-[19px]' />
                    <p className='ml-[15px] truncate text-[20px]'>Projetos</p>
                </Link>
            </div>
        </section>
    )
}

export default Index