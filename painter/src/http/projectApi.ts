import {$authHost} from "./index";
import {Project} from "../components/providers/CanvasContextProvider";

export const create = async (project: Project, email: string) => {
    console.log('create')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_CREATE as string, {
        email: email,
        name: project.name,
        description: project.description,
        width: project.width,
        frames: JSON.stringify(project.frames),
        published: project.published
    })

    return data.projectId
}

export const get = async (id: number) => {
    console.log('get')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_GET as string, {
        id: id,
    })
    const project =  JSON.parse(data.project) as Project

    return {project: project, userNickname: data.nickname}
}

export const getAll = async (email: string) => {
    console.log('get-all')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_GET_ALL as string, {
        email: email,
    })
    const projects =  (JSON.parse(data.project) as []).map(it => JSON.parse(it) as Project)
    console.log(projects)
    return {projects: projects, userNickname: data.nickname}
}

export const update = async (project: Project, email: string) => {
    console.log('update')
    await $authHost.post(process.env.REACT_APP_API_PROJECT_UPDATE as string, {
        email: email,
        name: project.name,
        description: project.description,
        width: project.width,
        frames: JSON.stringify(project.frames),
        published: project.published,
        id: project.index
    })
    return
}


