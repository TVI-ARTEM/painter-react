import {$authHost, $host} from "./index";
import {Project} from "../components/providers/CanvasContextProvider";


const getUrls = (projectWidth: number, projectFrames: String[][]) => {
    const canvas = document.createElement("canvas")
    canvas.setAttribute("width", `${projectWidth}px`)
    canvas.setAttribute("height", `${projectWidth}px`)
    const ctx = canvas.getContext("2d")
    const urls = []
    if (ctx !== null) {
        if (projectFrames !== undefined) {
            for (let index = 0; index < projectFrames.length; index++) {
                ctx.clearRect(0, 0, projectWidth, projectWidth)
                if (projectFrames.at(index) !== undefined) {
                    for (let row = 0; row < projectWidth; row++) {
                        for (let column = 0; column < projectWidth; column++) {
                            const indexCell = row * projectWidth + column;

                            // @ts-ignore
                            const color = projectFrames.at(index).at(indexCell) as String
                            ctx.fillStyle = color === "-1" ? `rgba(255, 255, 255, 0)` : color.toString();
                            ctx.fillRect(column, row, 1, 1)
                        }
                    }
                }


                const url = canvas.toDataURL("png")
                urls.push(url)
            }
        }
    }

    return urls
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

async function getFrames(projectWidth: number, urls: String[]) {
    const canvas = document.createElement("canvas")
    canvas.setAttribute("width", `${projectWidth}px`)
    canvas.setAttribute("height", `${projectWidth}px`)
    const ctx = canvas.getContext("2d")
    const frames: String[][] = []
    if (ctx !== null) {
        if (urls !== undefined) {
            for (let index = 0; index < urls.length; index++) {
                ctx.clearRect(0, 0, projectWidth, projectWidth)

                if (urls.at(index) !== undefined) {
                    const img = new Image()
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0)
                        const frame: String[] = []
                        for (let row = 0; row < projectWidth; row++) {
                            for (let column = 0; column < projectWidth; column++) {
                                const data = ctx.getImageData(column, row, 1, 1).data
                                const red = data[0]
                                const green = data[1]
                                const blue = data[2]
                                const alpha = data[3]
                                if (alpha !== 255) {
                                    frame.push("-1")
                                } else {
                                    frame.push(rgbToHex(red, green, blue))
                                }
                            }
                        }
                        frames.push(frame)
                    }
                    img.src = urls.at(index) as string

                }
            }
        }
    }

    return frames
}

export const create = async (project: Project, email: string) => {
    console.log('create')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_CREATE as string, {
        email: email,
        name: project.name,
        description: project.description,
        width: project.width,
        frames: JSON.stringify(getUrls(project.width, project.frames)),
        published: project.published
    })

    return data.projectId
}

export const get = async (id: number) => {
    console.log('get')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_GET as string, {
        id: id,
    })
    const project = JSON.parse(data.project) as Project

    project.frames = (await getFrames(project.width, (JSON.parse(data.project) as { frames: String[] }).frames))


    return {project: project, userNickname: data.nickname, likes: data.likes, liked: data.liked}
}

export const getAllProjects = async (nickname: string) => {
    console.log('get-all')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_GET_ALL as string, {
        nickname: nickname,
    })


    const projects = (JSON.parse(data.project) as []).map(it => JSON.parse(it) as Project)
    const frames = (JSON.parse(data.project) as []).map(it => JSON.parse(it) as { frames: String[] })
    for (let index = 0; index < projects.length; index++) {
        projects[index].frames = await getFrames(projects[index].width, frames[index].frames)
    }


    return {projects: projects, userNickname: data.nickname}
}

export const update = async (project: Project, email: string) => {
    console.log('update')
    const urls = getUrls(project.width, project.frames)
    await $authHost.post(process.env.REACT_APP_API_PROJECT_UPDATE as string, {
        email: email,
        name: project.name,
        description: project.description,
        width: project.width,
        frames: JSON.stringify(urls),
        published: project.published,
        id: project.index
    })
    return
}

export const remove = async (projectId: number, email: string) => {
    console.log('remove')
    await $authHost.post(process.env.REACT_APP_API_PROJECT_REMOVE as string, {
        email: email,
        id: projectId,
    })
    return
}

export const like = async (projectId: number, nickname: string) => {
    console.log('like')
    const {data} = await $authHost.post(process.env.REACT_APP_API_PROJECT_LIKE as string, {
        id: projectId,
        nickname: nickname,
    })
    return {likes: data.likes}
}

export const getAllProjectsUsers = async () => {
    console.log('get-all-projects-users')
    const {data} = await $host.post(process.env.REACT_APP_API_PROJECT_GET_ALL_USERS as string)
    const projects = (JSON.parse(data.project) as []).map(it => JSON.parse(it) as Project)
    const frames = (JSON.parse(data.project) as []).map(it => JSON.parse(it) as { frames: String[] })
    for (let index = 0; index < projects.length; index++) {
        projects[index].frames = await getFrames(projects[index].width, frames[index].frames)
    }
    return projects
}

export const getAllProjectsStarts = async (startsWith: string) => {
    console.log('get-all-projects-starts')
    const {data} = await $host.post(process.env.REACT_APP_API_PROJECT_GET_ALL_STARTS as string, {
        startsWith: startsWith,
    })
    const projects = (JSON.parse(data.project) as []).map(it => JSON.parse(it) as Project)
    const frames = (JSON.parse(data.project) as []).map(it => JSON.parse(it) as { frames: String[] })
    for (let index = 0; index < projects.length; index++) {
        projects[index].frames = await getFrames(projects[index].width, frames[index].frames)
    }
    return projects
}


