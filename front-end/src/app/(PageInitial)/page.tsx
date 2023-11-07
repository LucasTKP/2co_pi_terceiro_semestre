'use client'
import Image from 'next/image'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'


export default function Home() {
  const { data: session } = useSession()

    useEffect(() => {
      function VerifySession() {

        if (session != null) {
          window.location.replace('/Dashboard')
        }
      }
      VerifySession()
    }, [session])


  return (
    <main className="flex flex-col items-center">
      <Image src={'/icons/logo2Co.svg'} width={0} height={80} alt='' className='w-auto mt-[50px] max-sm:mt-[10px]' />
      <div className='sm:mt-[50px] sm:bg-[#2D2D2D] px-[50px] pb-[50px] rounded-[12px] flex flex-col items-center border-[#5F5F5F] sm:border sm:drop-shadow-[4px_4px_6px_rgba(0,0,0,0.25)]'>

        <Image src={'/images/logoSignIn.png'} priority={true} alt={''} width={1000} height={0} className='w-[363px] max-xl:w-[300px] max-lg:w-[280px] h-auto'/>

        <div className='w-full h-[3px] bg-emerald-500 fill-none rounded-full'/>

        <h1 className='text-[#fff] text-[30px] max-xl:text-[28px] max-lg:text-[26px] mt-[40px] font-poppins font-[300]'>Faça Login e comece <br />a organizar os seus  <br /> ToDos</h1>
        <button onClick={() => signIn("github", { callbackUrl: `${window.location.origin}/Dashboard` })} className='mt-[40px] group duration-100 hover:text-[#fff] text-[#9B9B9B] self-center border-[2px] border-emerald-500 px-[15px] py-[10px] text-[22px] max-xl:text-[20px] rounded-[10px] flex items-center gap-x-[20px]'>
          Entrar com o github
          <GitHubLogoIcon width={35} height={35} className='max-lg:w-[30px] max-lg:h-[30px] text-[#FFFFFF] group-hover:rotate-45 duration-200 rounded-full' />
        </button>
      </div>
    </main>
  )
}
