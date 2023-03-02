import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import {To} from "react-router-dom";

type CanvasContextProviderProps = {
    children: React.ReactNode
}

export enum Tool {
    Pencil,
    Pippete,
    Erase,
    Fill,
}

interface CanvasContextType {
    cells: String[]
    setCells: Dispatch<SetStateAction<String[]>>
    width: number
    setWidth: Dispatch<SetStateAction<number>>
    zoom: number
    setZoom: Dispatch<SetStateAction<number>>
    tool: Tool,
    setTool: Dispatch<SetStateAction<Tool>>
    currentColor: String,
    setCurrentColor: Dispatch<SetStateAction<String>>
}


export const CanvasContext = createContext({} as CanvasContextType)

export const CanvasContextProvider = ({children}: CanvasContextProviderProps) => {
    const [width, setWidth] = useState<number>(16)
    const [zoom, setZoom] = useState<number>(1)
    const [tool, setTool] = useState<Tool>(Tool.Pencil)
    const [currentColor, setCurrentColor] = useState<String>("#FFA")
    const [cells, setCells] = useState<String[]>(Array(width * width).fill("-1"))

    const value = {cells, setCells, width, setWidth, zoom, setZoom, tool, setTool, currentColor, setCurrentColor}
    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}

