import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import {User, UserContext} from "./providers/UserProvider";
import {check} from "../http/userApi";
import {Spinner} from "react-bootstrap";


export default function App() {
    const [loading, setLoading] = useState(true)
    const {setUser, setIsAuth} = useContext(UserContext)

    useEffect(() => {
        check().then(data => {
            setUser(data as User)
            setIsAuth(true)
        }).catch(err => {
            console.log(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    return (
        <>
            {loading && (<Spinner animation={"grow"}/>)}
            {!loading && (<BrowserRouter><AppRouter/></BrowserRouter>)}
        </>);
}

