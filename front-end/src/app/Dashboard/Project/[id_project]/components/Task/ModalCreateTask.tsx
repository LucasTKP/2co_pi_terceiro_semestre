import React, { FormEvent, useContext } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import * as Select from '@radix-ui/react-select';
import { Task } from '@/types/task';
import { dataUserContext } from '@/src/app/context/user';
import axios from 'axios';
import { ProjectContext } from '../../context/projectContext';

interface Props {
    modalCreateTask: boolean
    setModalCreateTask: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalCreateTask({ modalCreateTask, setModalCreateTask }: Props) {
    const { projectContext, setProjectContext } = useContext(ProjectContext)
    const { userContext } = useContext(dataUserContext)

    async function createTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        const data: Omit<Task, "id"> = {
            idExecuter: formData.get('selectCowoker') as string,
            idOwner: userContext.id,
            idProject: projectContext?.id!,
            status: 'open',
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            createdDate: new Date().getTime()
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, data)
        if(response.status === 201 && response.data){
            const project = {...projectContext!}
            project?.tasks?.push(response.data)
            setProjectContext(project)
            
            setModalCreateTask(false)
        }
    }

    return (
        <section className='z-50'>
            <Dialog.Root onOpenChange={setModalCreateTask} open={modalCreateTask}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
                    <Dialog.Content className="z-20 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#282828] py-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[18px] font-semibold flex items-center gap-x-[10px] px-[20px]">
                            <p className='text-emerald-500 truncate'>{projectContext?.name}</p>
                            <Image src='/icons/chevronRight.svg' alt='' width={0} height={0} className='w-[7px]' />
                            <p className='text-[#c6c6c6] whitespace-nowrap'>Nova Tarefa</p>
                        </Dialog.Title>
                        <form onSubmit={createTask} className='mt-[25px] text-[#282828]'>
                            <div className='flex flex-col justify-center px-[25px]'>
                                <input required minLength={5} name='title' className='bg-[#c6c6c6] p-[5px] rounded-[4px] w-full text-[20px] placeholder:text-[#282828] focus:outline-none focus:ring-emerald-500 focus:ring-[1px]' placeholder='Título...' />

                                <textarea required minLength={5} name='description' rows={5} className='duration-100 mt-[20px] caret-emerald-500 resize-none bg-[#c6c6c6] p-[5px] rounded-[4px] w-full text-[18px] placeholder:text-[#282828] focus:outline-none focus:ring-emerald-500 focus:ring-[1px]' placeholder='Descrição...' />
                            </div>
                            <hr className='w-full h-[3px] bg-[#c6c6c6] mt-[30px]' />
                            <div className='flex items-center text-[#C6C6C6] px-[20px] mt-[20px]'>
                                <Select.Root name='selectCowoker' required>
                                    <Select.Trigger className={`max-w-[60%] w-full gap-x-[10px] flex data-[state=closed]:px-[10px] justify-between items-center py-[5px] relative text-[#D7D7D7] mt-[5px]  rounded-[4px] data-[state=closed]:outline data-[state=closed]:outline-[1px] data-[state=closed]:focus-within:outline-[2px]  data-[state=closed]:outline-[#D7D7D7]`}>
                                        <Select.Value placeholder={"Atribuir para"} className='bg-black' />
                                        <Image src={'/icons/chevronDown.svg'} alt='' width={16} height={0} className='h-auto' />
                                    </Select.Trigger>

                                    <Select.Portal>
                                        <Select.Content sticky='always' className="z-20 mt-[20px] bg-[#282828] overflow-hidden rounded-[4px] border border-[#D7D7D7] ">
                                            <Select.Viewport className="p-[5px]">
                                                <Select.Group className="text-[#D7D7D7] font-[500]">
                                                    <Select.Label className="text-[#D7D7D7] text-center text-[18px] flex justify-center items-center">
                                                        Atribuir para
                                                    </Select.Label>

                                                    {projectContext?.coworkers?.map((user, index) => {
                                                        return (
                                                            <Select.Item key={index} value={`${user.id}`} className='cursor-pointer bg-transparent truncate text-[14px]'>
                                                                <Select.ItemText className='truncate text-[20px]'>{user.username}</Select.ItemText>
                                                            </Select.Item>
                                                        )
                                                    })}

                                                </Select.Group>
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                                <button className='hover:opacity-70 duration-100 ml-auto font-semibold text-emerald-500 px-[15px] py-[4px] bg-emerald-500/10 border border-emerald-500 rounded-[4px]'>Criar</button>
                            </div>

                        </form>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Cross2Icon className='w-full h-full text-[#7F7F7F]' />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </section>
    );
}

export default ModalCreateTask;
