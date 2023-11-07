import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import ModalRepositories from './modalRepositories'


interface Props {
  setTextSearch: Function
}



function NavbarProjects({ setTextSearch }: Props) {
  return (
    <div className='flex justify-center gap-x-[30px] max-sm:gap-x-[20px] items-center'>
      <label className='2xl:max-w-[30%] max-2xl:max-w-[40%] max-xl:max-w-[50%] max-lg:max-w-[60%] max-md:max-w-[70%] max-sm:max-w-[80%] max-lsm:max-w-[90%] w-full flex border-[1px] border-[#838282] rounded-[4px] items-center gap-[5px] px-[5px] py-[5px]'>
        <MagnifyingGlassIcon width={25} height={25} className='min-w-[25px] min-h-[25px]  text-[#838282]' />
        <input onChange={(text) => setTextSearch(text.target.value)} className='text-[18px] max-sm:text-[16px] placeholder:text-[#838282] outline-none bg-transparent' placeholder='Procurar...' />
      </label>
      <ModalRepositories />
    </div>
  )
}

export default NavbarProjects