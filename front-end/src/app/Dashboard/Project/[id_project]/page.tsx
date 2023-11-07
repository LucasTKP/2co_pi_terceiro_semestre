'use client'
import React, { useState } from 'react'
import ModalCreateTask from './components/Task/ModalCreateTask'
import ListTasks from './components/Task/listTasks'
import ModalSeeTask from './components/Task/modalSeeTask'
import { Task } from '@/types/task'


function Page() {
  const [optionConclued, setOptionConclued] = useState<boolean>(false)
  const [modalCreateTask, setModalCreateTask] = useState<boolean>(false)
  const [modalSeeTask, setModalSeeTask] = useState<boolean>(false)
  const [taskSelected, setTaskSelected] = useState<Task>()

  

  return (
    <section className='mt-[50px] w-full flex flex-col items-center'>
      <ModalCreateTask modalCreateTask={modalCreateTask} setModalCreateTask={setModalCreateTask}/>
      <ModalSeeTask modalSeeTask={modalSeeTask} setModalSeeTask={setModalSeeTask} taskSelected={taskSelected} />
      <div className='w-[90%] max-sm:w-[95%]'>
        <div className='w-full'>
          <div className='flex items-center font-bold'>
            <p onClick={() => setOptionConclued(false)} className={`${optionConclued ? 'text-[#4E4E4E]' : ''} hover:opacity-70 duration-100 cursor-pointer ml-[20px]`}>Tarefas</p>
            <p onClick={() => setOptionConclued(true)} className={`${optionConclued ? '' : 'text-[#4E4E4E]'} hover:opacity-70 duration-100 cursor-pointer ml-[60px]`}>Concluidas</p>
            <p onClick={() => setModalCreateTask(true)} className='hover:opacity-70 duration-100  cursor-pointer ml-auto font-semibold text-emerald-500'>Criar Novo</p>
          </div>
          <div className='w-full h-[3px] bg-[#4A4A4A]'>
            <div className={`h-full w-[100px] bg-emerald-500 duration-200 ${optionConclued ? 'ml-[133px]' : ''}`} />
          </div>

          <ListTasks optionConclued={optionConclued} setTaskSelected={setTaskSelected}  setModalSeeTask={setModalSeeTask}/>
        </div>
      </div>
    </section>
  )
}

export default Page