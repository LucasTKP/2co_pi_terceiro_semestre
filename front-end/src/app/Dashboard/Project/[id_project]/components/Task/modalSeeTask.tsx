import React, { useContext } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Task } from '@/types/task';
import { FormatDate } from '@/Utils/formatData';
import { ProjectContext } from '../../context/projectContext';

interface Props {
    modalSeeTask: boolean
    setModalSeeTask: React.Dispatch<React.SetStateAction<boolean>>
    taskSelected: Task | undefined
}

function ModalSeeTask({taskSelected, modalSeeTask, setModalSeeTask }: Props) {
    const { projectContext } = useContext(ProjectContext)
    const attributeTo = projectContext?.coworkers.find(data => data.id === taskSelected?.idExecuter)
    const createFrom = projectContext?.coworkers.find(data => data.id === taskSelected?.idOwner)
    return (
        <section className='z-50'>
            <Dialog.Root onOpenChange={setModalSeeTask} open={modalSeeTask}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
                    <Dialog.Content className="z-20 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#282828] py-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[20px] font-semibold flex items-center justify-center">
                            <p className='text-emerald-500 truncate'>Tarefa</p>
                        </Dialog.Title>

                        <div className='px-[20px] mt-[10px]'>
                            <div className='flex flex-col gap-y-[5px] text-[18px]'>
                                <p><span className='font-[500]'>Título:</span> {taskSelected?.title}</p>
                                <p><span className='font-[500]'>Descrição:</span> {taskSelected?.description}</p>
                                <p><span className='font-[500]'>Atribuido para:</span> {attributeTo?.username}</p>
                                <p><span className='font-[500]'>Status:</span> {taskSelected?.status === 'concluded' ? "Concluído" : "Aberto"}</p>
                                <p><span className='font-[500]'>Criado por:</span> {createFrom?.username}</p>
                                <p><span className='font-[500]'>Criado:</span> {FormatDate(taskSelected?.createdDate)}</p>
                            </div>
                        </div>


                        <Dialog.Close asChild >
                            <button autoFocus={false} className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none" aria-label="Close">
                                <Cross2Icon className='w-full h-full text-[#7F7F7F]' />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </section>
    )
}

export default ModalSeeTask