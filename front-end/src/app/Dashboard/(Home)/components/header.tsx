'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon } from '@radix-ui/react-icons'
import { dataUserContext } from '@/src/app/context/user'
import { signOut } from 'next-auth/react';


function Header() {
    const { userContext } = useContext(dataUserContext)

    return (
        <header className='flex justify-center py-[10px] border-b-[1px] border-b-emerald-400/50'>
            <div className='flex justify-between w-full px-[20px] max-sm:px-[5px]'>
                <div className='flex gap-[10px] items-center'>
                    <div className='w-[60px] max-sm:w-[55px] h-[50px] max-sm:h-[45px] flex items-center justify-center rounded-full'>
                        <Image src={'/icons/logo2Co.svg'} alt="Logo 2Co" priority width={100} height={100} />
                    </div>

                    <div className='w-[1px] h-[30px] bg-white rotate-[20deg] mx-[10px]' />

                    <div className='w-[50px] max-sm:w-[40px] h-[50px] max-sm:h-[40px] p-[3px] flex items-center justify-center border-[1px] border-emerald-500/70 rounded-full'>
                        {userContext.avatar && <Image src={userContext.avatar} alt="Logo 2Co" height={35} width={35} priority className='w-full h-full rounded-full' />}
                    </div>

                    <p className='text-[22px] max-sm:text-[20px] max-lsm:text-[18px] max-w-[400px] max-lg:max-w-[300px] max-sm:max-w-[200px] max-lsm:max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap'>
                        {userContext.username}
                    </p>
                </div>



                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className='outline-none'>
                            {userContext.avatar && <Image src={userContext.avatar} alt="Logo 2Co" width={45} height={45} priority className='min-w-[45px] aspect-square rounded-full' />}
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content sideOffset={2}>
                            <div className='bg-[#282828] outline outline-[2px] outline-[#838282] rounded-[4px] mr-[10px]'>
                                <DropdownMenu.Item onClick={() => signOut({ callbackUrl: "/" })} className="duration-100 w-full h-full outline-none flex items-center group hover:bg-[#838282] hover:text-black  px-[5px] cursor-pointer rounded-[4px]">
                                    <p className='text-[18px] font-poppins'>Sair</p>
                                    <ExitIcon width={18} />
                                </DropdownMenu.Item>
                            </div>


                            <DropdownMenu.Arrow className="fill-[#838282]" />
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    )
}

export default Header