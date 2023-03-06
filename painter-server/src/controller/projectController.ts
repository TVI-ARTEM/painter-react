import {Request, Response, NextFunction} from 'express';
import {User, Project, Like} from '../models/models';
import ApiError from "../error/ApiError";
import {Op, where} from "sequelize";


class ProjectController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, name, description, width, frames, published} = req.body
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
            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            //const urls = JSON.stringify(createGifCustom(width, JSON.parse(frames) as String[][]))

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
            return res.json({message: 'Creation is successful', projectId: project.id})

        } catch (e) {
            return next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("update")
            const {email, name, description, width, frames, published, id} = req.body
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
            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }
            const project = await Project.findOne({where: {userId: user.id, id: id}})
            if (!project) {
                return next(ApiError.badRequest('Project is not found!'))
            }


            await Project.update({
                name: name,
                width: width,
                frameJson: frames,
                description: description,
                published: published,
            }, {where: {userId: user.id, id: id}})

            return res.json({message: 'Update is successful'})

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

            return res.json({message: 'Delete is successful'})

        } catch (e) {
            return next(e)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("get")
            const {id} = req.body


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

            const user = await User.findOne({where: {id: project.userId}})
            const likes = await Like.findAll({where: {projectId: project.id}})
            const liked = await Like.findOne({where: {projectId: project.id, userId: user.id}})
            let liked_res = true
            if (!liked) {
                liked_res = false
            }
            return res.json({
                message: 'Get is successful',
                project: projectJson,
                nickname: user.nickname,
                likes: likes.length,
                liked: liked_res
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

            const projectsJSON = JSON.stringify(projects.map(it => JSON.stringify({
                name: it.name,
                width: it.width,
                frames: JSON.parse(it.frameJson) as String[],
                description: it.description,
                published: it.published,
                index: it.id
            })))

            return res.json({message: 'Get is successful', project: projectsJSON, nickname: user.nickname})
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

            return res.json({message: 'Get is successful', project: projectsJSON})
        } catch (e) {
            return next(e)
        }
    }

    async getAllStarts(req: Request, res: Response, next: NextFunction) {
        try {
            const {startsWith} = req.body

            const projects = await Project.findAll({
                where: {
                    name: {
                        [Op.startsWith]: `${startsWith}`
                    }
                }
            })


            const projectsJSON = JSON.stringify(projects.map(it => JSON.stringify({
                name: it.name,
                width: it.width,
                frames: JSON.parse(it.frameJson) as String[],
                description: it.description,
                published: it.published,
                index: it.id
            })))

            return res.json({message: 'Get is successful', project: projectsJSON})
        } catch (e) {
            return next(e)
        }
    }


}

module.exports = new ProjectController()