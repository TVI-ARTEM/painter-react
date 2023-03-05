import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import {History} from "./CanvasContextProvider";

type UserContextProviderProps = {
    children: React.ReactNode
}


export interface User {
    id: number
    email: string
    nickname: string
}

interface UserContextType {
    user: User
    setUser: Dispatch<SetStateAction<User>>
    isAuth: boolean
    setIsAuth:  Dispatch<SetStateAction<boolean>>
}


export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [user, setUser] = useState<User>({} as User)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const value = {
        user,
        setUser,
        isAuth,
        setIsAuth
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

