import { Task } from '@/types/task'
import React, { useContext } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { ProjectContext } from '../../context/projectContext'
import { ExecuterContext } from '../../context/executerContext'


interface Props {
    optionConclued: boolean
    setTaskSelected: React.Dispatch<React.SetStateAction<Task | undefined>>
    setModalSeeTask: React.Dispatch<React.SetStateAction<boolean>>
}

function ListTasks({ optionConclued, setTaskSelected, setModalSeeTask }: Props) {
    const { projectContext, setProjectContext } = useContext(ProjectContext)
    const { idExecuterTask } = useContext(ExecuterContext)

    async function handleChangeStatus(task: Task) {
        const status = task.status === 'concluded' ? 'open' : 'concluded'
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task.id}`, {
            status
        })
        if (response.status === 204) {
            const project = { ...projectContext! }
            const index = project.tasks.findIndex(data => data.id === task.id)
            project.tasks[index].status = status
            setProjectContext(project)
        }
    }

    async function handleDeleteTask(task: Task) {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task.id}`)
        if(response.status === 200) {
            const project = { ...projectContext! }
            const index = project.tasks.findIndex(data => data.id === task.id)
            project.tasks.splice(index, 1)
            setProjectContext(project)
        }
    }


    return (
        <section className='px-[20px]'>
            <div className='mt-[25px] flex flex-col gap-y-[20px]'>
                {projectContext?.tasks
                    .filter(task => idExecuterTask ? task.idExecuter === idExecuterTask : true)
                    .filter(task => optionConclued ? task.status === "concluded" : task.status === "open").length ?
                
                projectContext?.tasks
                    .filter(task => idExecuterTask ? task.idExecuter === idExecuterTask : true)
                    .filter(task => optionConclued ? task.status === "concluded" : task.status === "open")
                    .map((task) => {
                        return (
                            <div  key={task.id} className='flex items-center gap-x-[20px] bg-[#D7D7D7] rounded-[8px] px-[20px] py-[5px]'>
                                {optionConclued ?
                                    <Image onClick={() => handleChangeStatus(task)} src='/icons/concludedTask.svg' alt='' width={0} height={0} className='w-[30px] h-auto cursor-pointer' />
                                    :
                                    <Image onClick={() => handleChangeStatus(task)} src='/icons/openTask.svg' alt='' width={0} height={0} className='w-[30px] h-auto cursor-pointer' />
                                }

                                <p onClick={() => (setModalSeeTask(true), setTaskSelected(task))} className='cursor-pointer text-[#202020] font-[500] text-[18px] truncate w-full'>{task.title}</p>

                                <Image onClick={() => handleDeleteTask(task)} src='/icons/trash.svg' alt='' width={0} height={0} className='cursor-pointer w-[20px] h-auto ml-auto' />
                            </div>
                        )
                    })
                    : 
                    <p className='text-center text-[24px]'>Nenhuma tarefa foi encontrada <br />crie uma agora!</p>
                }

            </div>
        </section>
    )
}

export default ListTasks