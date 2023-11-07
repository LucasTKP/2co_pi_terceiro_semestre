'use client'
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { DataUser } from '../../../types/user';

export const dataUserContext = createContext<{ userContext: DataUser, setUserContext: Dispatch<SetStateAction<DataUser>> }>({
    userContext: {
        id: '',
        username: '',
        email: '',
        avatar:'',
        token: '',
        repositorys:[],
        projects:[]
    },
    setUserContext: (userContext) => { }
});

export default function User({ children }: { children: React.ReactNode }) {
    const [userContext, setUserContext] = useState<DataUser>({
        id: '',
        username: '',
        email: '',
        avatar: '',
        token: '',
        repositorys:[],
        projects:[]
    })
    return (
        <dataUserContext.Provider value={{ userContext, setUserContext }}>
            {children}
        </dataUserContext.Provider>
    );
}