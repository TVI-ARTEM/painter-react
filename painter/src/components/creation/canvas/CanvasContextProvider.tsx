import React, {createContext, Dispatch, ReactElement, SetStateAction, useState} from "react";

type CanvasContextProviderProps = {
    children: React.ReactNode
}

interface CanvasContextType {
    cells: String[],
    setCells: Dispatch<SetStateAction<String[]>>
    width: number
    setWidth: Dispatch<SetStateAction<number>>
}

const defaultState = {
    cells: [] as String[],
    setCells: (cells: String[]) => {
    },
    width: 16,
    setWidth: (width: number) => {
    }
} as CanvasContextType
export const CanvasContext = createContext(defaultState)

export const CanvasContextProvider = ({children}: CanvasContextProviderProps) => {
    const [width, setWidth] = useState<number>(16)
    const [cells, setCells] = useState<String[]>(Array(width * width).fill("#FFF"))

    const value = {cells, setCells, width, setWidth}
    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}