import React from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Layout} from "../common/layout/Layout";
import {Tools} from "../creation/tools";
import {Menu} from "../common/menu";
import Canvas from "../creation/canvas/Canvas";

const CreationPage = observer(() => {
    const {id} = useParams()


    return (
        <Layout
            top={<Menu/>}

            left={<Tools/>}
            middle={<Canvas width={16} height={16}/>}
            right={<Tools/>}
        />
    )
})

export default CreationPage;