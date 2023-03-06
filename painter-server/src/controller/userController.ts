import {Request, Response, NextFunction} from 'express';
import {User} from '../models/models';
import ApiError from "../error/ApiError";


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id: number, email: string, nickname: string) => {
    return jwt.sign(
        {id, email, nickname},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const checkEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return email.match(emailRegex)
}

const checkNickname = (nickname: string) => {
    return nickname.length >= 3 && nickname.length <= 20 && !nickname.includes(" ");
}

const checkPassword = (password: string) => {
    return password.length >= 3 && password.length <= 20;
}


class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('registration')
            const {email, nickname, password} = req.body

            if (!email || !nickname || !password) {
                return next(ApiError.badRequest('Incorrect e-mail, nickname or password!'))
            }

            if (!checkEmail(email)) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            if (!checkNickname(nickname)) {
                return next(ApiError.badRequest('Incorrect nickname!\n' +
                    "Nickname length must be between 3 and 20.\n" +
                    "Nickname cannot contains whitespace."))
            }

            if (!checkPassword(password)) {
                return next(ApiError.badRequest('Incorrect password!\n' +
                    'Password length must be more than 2 and less than 21.'))
            }

            const sameEmail = await User.findOne({where: {email: email}})
            if (sameEmail) {
                return next(ApiError.badRequest('User with this e-mail already exists!'))
            }

            const sameNickname = await User.findOne({where: {nickname: nickname}})
            if (sameNickname) {
                return next(ApiError.badRequest('User with this nickname already exists!'))
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = await User.create({email: email, nickname: nickname, password: hashPassword})
            const token = generateToken(user.id, user.email, user.nickname)
            return res.json({token})
        } catch (e) {
            return next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('login')

            const {email, password} = req.body
            const user = await User.findOne({where: {email}})

            if (!user) {
                return next(ApiError.internalError("User is not found!"))
            }

            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    console.log(err)
                    return next(ApiError.internalError(err.message))
                }
                if (!res) {
                    return next(ApiError.badRequest('Incorrect password!'))

                }
            })

            const token = generateToken(user.id, user.email, user.nickname)
            return res.json({token})
        } catch (e) {
            return next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('logout')

            const {email} = req.body
            const user = await User.findOne({where: {email: email}})

            if (!user) {
                return next(ApiError.internalError("User is not found!"))
            }

            return res.json({message: 'Logout is successful'})
        } catch (e) {
            return next(e)
        }
    }

    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('auth')

            const token = generateToken(req.user.id, req.user.email, req.user.nickname)

            return res.json({token})
        } catch (e) {
            return next(e)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("get-all")
            const users = await User.findAll()
            const usersJSON = JSON.stringify(users.map(it => JSON.stringify({
                email: it.email,
                nickname: it.nickname
            })))

            return res.json({message: 'Get is successful', users: usersJSON})
        } catch (e) {
            return next(e)
        }
    }


    async update(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('update')
            const {email, nickname} = req.body

            if (!email || !nickname) {
                return next(ApiError.badRequest('Incorrect e-mail, nickname or password!'))
            }

            if (!checkEmail(email)) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            if (!checkNickname(nickname)) {
                return next(ApiError.badRequest('Incorrect nickname!\n' +
                    "Nickname length must be between 3 and 20.\n" +
                    "Nickname cannot contains whitespace."))
            }

            const currentUser = await User.findOne({where: {email: email}})
            if (!currentUser) {
                return next(ApiError.badRequest('User with this e-mail does not exist!'))
            }

            const sameNickname = await User.findOne({where: {nickname: nickname}})
            if (sameNickname && currentUser.nickname !== nickname) {
                return next(ApiError.badRequest('User with this nickname already exists!'))
            }

            await User.update({
                nickname: nickname,
            }, {where: {email: email}})

            const user = await User.findOne({where: {email}})
            const token = generateToken(user.id, user.email, user.nickname)
            return res.json({token})
        } catch (e) {
            return next(e)
        }

    }
}

module.exports = new UserController()