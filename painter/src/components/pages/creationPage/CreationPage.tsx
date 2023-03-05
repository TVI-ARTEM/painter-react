import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {Layout} from "./layout/Layout";
import {Tools} from "./tools";
import {Menu} from "../../common/menu";
import Canvas from "./canvas/Canvas";
import {CanvasContextProvider} from "../../providers/CanvasContextProvider";
import {Animation} from "./animation";
import {UserContext} from "../../providers/UserProvider";
import {MAIN_ROUTE} from "../../../utils/consts";


const CreationPage = observer(() => {
    const {id} = useParams()

    const {isAuth} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate(MAIN_ROUTE)
        }
    }, [isAuth])
    return (
        <CanvasContextProvider id={id}>
            <Layout
                top={<Menu/>}
                left={<Tools/>}
                middle={<Canvas/>}
                right={<Animation/>}
            />
        </CanvasContextProvider>
    )
})

export default CreationPage;