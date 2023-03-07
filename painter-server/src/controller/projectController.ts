import {Request, Response, NextFunction} from 'express';
import {User, Project, Like, Preview, Tag} from '../models/models';
import ApiError from "../error/ApiError";
import {Op} from "sequelize";
import {Json} from "sequelize/lib/utils";

const lzw = require('node-lzw')
const {createGIF} = require("gifshot")


class ProjectController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, name, description, width, frames, published, preview} = req.body
            if (!email) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            if (!name) {
                return next(ApiError.badRequest('Incorrect name!'))
            }

            if (!description) {
                return next(ApiError.badRequest('Incorrect description!'))
            }

            if (!width) {
                return next(ApiError.badRequest('Incorrect width!'))
            }

            if (!frames) {
                return next(ApiError.badRequest('Incorrect frames!'))
            }
            if (!preview) {
                return next(ApiError.badRequest('Incorrect preview!'))
            }

            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const previewURls = JSON.parse(lzw.decode(preview)) as String[]

            const project = await Project.create({
                name: name,
                width: width,
                frameJson: frames,
                description: description,
                published: published,
                userId: user.id,
            }).catch(error => {
                next(error)
            })

            await Preview.create({
                preview: previewURls[0],
                gif: JSON.stringify(previewURls),
                projectId: project.id
            })

            return res.json({message: 'Creation is successful', projectId: project.id})

        } catch (e) {
            return next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("update")
            const {email, name, description, width, frames, published, id, preview} = req.body
            if (!email) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            if (!name) {
                return next(ApiError.badRequest('Incorrect name!'))
            }

            if (!description) {
                return next(ApiError.badRequest('Incorrect description!'))
            }

            if (!width) {
                return next(ApiError.badRequest('Incorrect width!'))
            }

            if (!frames) {
                return next(ApiError.badRequest('Incorrect frames!'))
            }
            if (!preview) {
                return next(ApiError.badRequest('Incorrect preview!'))
            }
            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }
            const project = await Project.findOne({where: {userId: user.id, id: id}})
            if (!project) {
                return next(ApiError.badRequest('Project is not found!'))
            }
            const previewURls = JSON.parse(lzw.decode(preview)) as String[]

            await Project.update({
                name: name,
                width: width,
                frameJson: frames,
                description: description,
                published: published,
            }, {where: {userId: user.id, id: id}})
            await Preview.update({
                preview: previewURls[0],
                gif: JSON.stringify(previewURls),
            }, {where: {projectId: id}})


            return res.json({message: 'Update is successful'})

        } catch (e) {
            return next(e)
        }
    }

    async updateTags(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("update-tags")
            const {email, projectId, tags} = req.body
            if (!email) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            if (!projectId) {
                return next(ApiError.badRequest('Incorrect projectId!'))
            }

            if (!tags) {
                return next(ApiError.badRequest('Incorrect tags!'))
            }


            const project = await Project.findOne({where: {id: projectId}})
            if (!project) {
                return next(ApiError.badRequest('Project is not found!'))
            }

            const tagsParsed = JSON.parse(tags) as String[]
            await Tag.destroy({where: {projectId: project.id}})

            for (const tag of tagsParsed) {
                await Tag.create({
                    name: tag,
                    projectId: project.id
                })
            }


            return res.json({message: 'Update tags is successful'})

        } catch (e) {
            return next(e)
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, id} = req.body
            if (!email) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }


            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }
            const project = await Project.findOne({where: {userId: user.id, id: id}})
            if (!project) {
                return next(ApiError.badRequest('Project is not found!'))
            }

            await Project.destroy({where: {userId: user.id, id: id}})
            await Preview.destroy({where: {id: id}})
            await Like.destroy({where: {id: id}})

            return res.json({message: 'Delete is successful'})

        } catch (e) {
            return next(e)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("get")
            const {nickname, id} = req.body


            const project = await Project.findOne({where: {id: id}})
            if (!project) {
                return next(ApiError.badRequest('Project is not found!'))
            }
            const projectJson = JSON.stringify({
                name: project.name,
                width: project.width,
                frames: JSON.parse(project.frameJson) as String[],
                description: project.description,
                published: project.published,
                index: project.id
            })

            const user = await User.findOne({where: {nickname: nickname}})
            const author = await User.findOne({where: {id: project.userId}})

            const likes = await Like.findAll({where: {projectId: project.id}})
            let liked_res = false
            console.log(user)
            if (user) {
                const liked = await Like.findOne({where: {projectId: project.id, userId: user.id}})
                console.log(liked)
                if (liked) {
                    liked_res = true
                }

            }
            console.log(liked_res)

            const preview = await Preview.findOne({where: {projectId: id}})
            return res.json({
                message: 'Get is successful',
                project: projectJson,
                nickname: author.nickname,
                likes: likes.length,
                liked: liked_res,
                preview: preview.preview,
                gif: JSON.parse(preview.gif) as String[]
            })
        } catch (e) {
            return next(e)
        }
    }

    async like(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("like")
            const {id, nickname} = req.body


            const project = await Project.findOne({where: {id: id}})
            if (!project) {
                return next(ApiError.badRequest('Project is not found!'))
            }

            const user = await User.findOne({where: {nickname: nickname}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const like = await Like.findOne({where: {userId: user.id, projectId: project.id}})
            if (like) {
                await Like.destroy({where: {userId: user.id}})
            } else {
                await Like.create({
                    userId: user.id,
                    projectId: project.id,
                }).catch(error => {
                    next(error)
                })
            }

            const likes = await Like.findAll({where: {projectId: project.id}})

            return res.json({message: 'Get is successful', likes: likes.length})
        } catch (e) {
            return next(e)
        }
    }


    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("get-all")
            const {nickname} = req.body
            if (!nickname) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            const user = await User.findOne({where: {nickname: nickname}})

            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }
            const projects = await Project.findAll({where: {userId: user.id}})
            if (!projects) {
                return next(ApiError.badRequest('Projects are not found!'))
            }
            const previews = []
            for (const project of projects) {
                const preview = await Preview.findOne({where: {projectId: project.id}})
                previews.push(JSON.stringify({
                    preview: preview.preview,
                    gif: JSON.parse(preview.gif) as String[],
                    projectId: preview.projectId,
                }))
            }
            const projectsJSON = JSON.stringify(projects.map(it => JSON.stringify({
                name: it.name,
                width: it.width,
                frames: JSON.parse(it.frameJson) as String[],
                description: it.description,
                published: it.published,
                index: it.id
            })))


            return res.json({
                message: 'Get is successful',
                project: projectsJSON,
                previews: JSON.stringify(previews),
                nickname: user.nickname
            })
        } catch (e) {
            return next(e)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await Project.findAll()


            const projectsJSON = JSON.stringify(projects.map(it => JSON.stringify({
                name: it.name,
                width: it.width,
                frames: JSON.parse(it.frameJson) as String[],
                description: it.description,
                published: it.published,
                index: it.id
            })))

            const previews = []
            for (const project of projects) {
                const preview = await Preview.findOne({where: {projectId: project.id}})
                previews.push(JSON.stringify({
                    preview: preview.preview,
                    gif: JSON.parse(preview.gif) as String[],
                    projectId: preview.projectId,
                }))
            }

            return res.json({message: 'Get is successful', project: projectsJSON, previews: JSON.stringify(previews)})
        } catch (e) {
            return next(e)
        }
    }

    async getAllStarts(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("get-starts")
            const {startsWith} = req.body
            if (!startsWith || (startsWith as string).length === 0) {
                return next(ApiError.badRequest('Incorrect startsWith!'))
            }
            let projects = []


            if ((startsWith as string).startsWith("#")) {
                const tags = await Tag.findAll({where: {name: startsWith}})
                for (const tag of tags) {
                    const project = await Project.findOne({where: {id: tag.projectId}})
                    projects.push(project)
                }
                projects = [...new Set(projects)]
            } else {
                projects = await Project.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: `${startsWith}`
                        }
                    }
                })
            }

            const projectsJSON = JSON.stringify(projects.map(it => JSON.stringify({
                name: it.name,
                width: it.width,
                frames: JSON.parse(it.frameJson) as String[],
                description: it.description,
                published: it.published,
                index: it.id
            })))

            const previews = []
            for (const project of projects) {
                const preview = await Preview.findOne({where: {projectId: project.id}})
                previews.push(JSON.stringify({
                    preview: preview.preview,
                    gif: JSON.parse(preview.gif) as String[],
                    projectId: preview.projectId,
                }))
            }

            return res.json({message: 'Get is successful', project: projectsJSON, previews: JSON.stringify(previews)})
        } catch (e) {
            return next(e)
        }
    }


}

module.exports = new ProjectController()