import {$authHost, $host, cookie} from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email: string, nickname: string, password: string) => {
    console.log('registration')
    const {data} = await $host.post(process.env.REACT_APP_API_USER_REGISTRATION as string, {
        email: email,
        nickname: nickname,
        password: password
    })
    cookie.set('token', data.token)
    return jwt_decode(data.token)
}


export const updateData = async (email: string, nickname: string) => {
    console.log('update')
    console.log(process.env.REACT_APP_API_USER_UPDATE)
    const {data} = await $authHost.post(process.env.REACT_APP_API_USER_UPDATE as string, {
        email: email,
        nickname: nickname
    })
    cookie.set('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
    console.log('login')
    const {data} = await $host.post(process.env.REACT_APP_API_USER_LOGIN as string, {email: email, password: password})
    cookie.set('token', data.token)
    return jwt_decode(data.token)
}

export const logout = async (email: string) => {
    console.log('logout')
    await $authHost.post(process.env.REACT_APP_API_USER_LOGOUT as string, {email: email})
    cookie.set('token', '')
}

export const check = async () => {
    console.log('auth')
    const {data} = await $authHost.get(process.env.REACT_APP_API_USER_AUTH as string)
    cookie.set('token', data.token)
    return jwt_decode(data.token)
}

export const getAllUsers = async () => {
    console.log('get-all-users')
    const {data} = await $host.get(process.env.REACT_APP_API_USER_GET_ALL as string)
    const users = (JSON.parse(data.users) as []).map(it => JSON.parse(it) as { email: string, nickname: string })
    return users
}

