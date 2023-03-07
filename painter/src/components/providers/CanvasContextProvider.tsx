import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";
import {UserContext} from "./UserProvider";
import {get, update, updateTags} from "../../http/projectApi";

type CanvasContextProviderProps = {
    children: React.ReactNode,
    id: any
}

export enum Tool {
    Pencil,
    Pippete,
    Erase,
    Fill,
}

export interface Project {
    frames: String[][]
    width: number
    index: number
    description: string
    name: string
    published: boolean
}

export enum HistoryType {
    ChangeColor,
    AddFrame,
    DeleteFrame
}

export interface History {
    type: HistoryType
    cells: String[]
    index: number

}


interface CanvasContextType {
    project: Project
    setProject: Dispatch<SetStateAction<Project>>
    tags: String[]
    setTags: Dispatch<SetStateAction<String[]>>
    currentFrame: number
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

export const CanvasContextProvider = ({children, id}: CanvasContextProviderProps) => {
    const navigate = useNavigate()
    const {user, isAuth} = useContext(UserContext)
    const [isInitialized, setIsInitialized] = useState(false)
    useEffect(() => {
        get(isAuth ? user.nickname : "-", +id).then(data => {
            if (data.userNickname !== user.nickname) {
                navigate(MAIN_ROUTE)
            }
            setProject(data.project)
            setIsInitialized(true)
        }).catch(() => {
            navigate(MAIN_ROUTE)
        })

    }, [id])

    const [project, setProject] = useState<Project>({
        frames: [Array(16 * 16).fill("-1")],
        width: 16,
        description: "",
        name: "",
        index: 0,
        published: false
    })
    const [currentFrame, setCurrentFrame] = useState<number>(0)
    const [zoom, setZoom] = useState<number>(1)
    const [tool, setTool] = useState<Tool>(Tool.Pencil)
    const [currentColor, setCurrentColor] = useState<String>("#FFFFAA")
    const [undoHistory, setUndoHistory] = useState<History[]>([])
    const [redoHistory, setRedoHistory] = useState<History[]>([])
    const [tags, setTags] = useState<String[]>([])
    useEffect(() => {
        if (isInitialized) {
            update(project, user.email).catch(() => {
                navigate(MAIN_ROUTE)
            })
            updateTags(tags, project.index, user.email).catch(() => {
                navigate(MAIN_ROUTE)
            })
        }

    }, [project, isInitialized, tags])


    const value = {
        project,
        setProject,

        tags,
        setTags,

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

