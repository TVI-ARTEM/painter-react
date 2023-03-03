import React, {createContext, Dispatch, SetStateAction, useState} from "react";

type CanvasContextProviderProps = {
    children: React.ReactNode
}

export enum Tool {
    Pencil,
    Pippete,
    Erase,
    Fill,
}

export interface Project {
    frames: String[][],
    width: number
}

export enum HistoryType {
    ChangeColor,
    AddFrame,
    DeleteFrame
}

export interface History {
    type: HistoryType,
    cells: String[],
    index: number
}



interface CanvasContextType {
    project: Project
    setProject: Dispatch<SetStateAction<Project>>
    currentFrame: number,
    setCurrentFrame: Dispatch<SetStateAction<number>>
    zoom: number
    setZoom: Dispatch<SetStateAction<number>>
    tool: Tool
    setTool: Dispatch<SetStateAction<Tool>>
    currentColor: String,
    setCurrentColor: Dispatch<SetStateAction<String>>
    undoHistory: History[]
    setUndoHistory: Dispatch<SetStateAction<History[]>>
    redoHistory: History[]
    setRedoHistory: Dispatch<SetStateAction<History[]>>
}


export const CanvasContext = createContext({} as CanvasContextType)

export const CanvasContextProvider = ({children}: CanvasContextProviderProps) => {
    const [project, setProject] = useState<Project>({frames: [Array(16 * 16).fill("-1")], width: 16})
    const [currentFrame, setCurrentFrame] = useState<number>(0)
    const [zoom, setZoom] = useState<number>(1)
    const [tool, setTool] = useState<Tool>(Tool.Pencil)
    const [currentColor, setCurrentColor] = useState<String>("#FFFFAA")
    const [undoHistory, setUndoHistory] = useState<History[]>([])
    const [redoHistory, setRedoHistory] = useState<History[]>([])

    const value = {
        project,
        setProject,

        currentFrame,
        setCurrentFrame,

        zoom,
        setZoom,

        tool,
        setTool,

        currentColor,
        setCurrentColor,

        undoHistory,
        setUndoHistory,

        redoHistory,
        setRedoHistory
    }

    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}

