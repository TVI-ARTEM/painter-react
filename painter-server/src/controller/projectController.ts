import {Request, Response, NextFunction} from 'express';
import {User, Project, Like, Tag} from '../models/models';
import ApiError from "../error/ApiError";


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
                frames: JSON.parse(project.frameJson) as String[][],
                description: project.description,
                published: project.published,
                index: project.id
            })

            const user = await User.findOne({where: {id: project.userId}})
            return res.json({message: 'Get is successful', project: projectJson, nickname: user.nickname})
        } catch (e) {
            return next(e)
        }
    }


    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("get-all")
            const {email: nickname} = req.body
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
                frames: JSON.parse(it.frameJson) as String[][],
                description: it.description,
                published: it.published,
                index: it.id
            })))

            return res.json({message: 'Get is successful', project: projectsJSON, nickname: user.nickname})
        } catch (e) {
            return next(e)
        }
    }

}

module.exports = new ProjectController()