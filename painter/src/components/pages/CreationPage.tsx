import React, {createContext, ReactElement, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Layout} from "../common/layout/Layout";
import {Tools} from "../creation/tools";
import {Menu} from "../common/menu";
import Canvas from "../creation/canvas/Canvas";
import {CanvasContextProvider} from "../creation/canvas/provider/CanvasContextProvider";


const CreationPage = observer(() => {
    const {id} = useParams()
    return (
        <CanvasContextProvider>
            <Layout
                top={<Menu/>}

                left={<Tools/>}
                middle={<Canvas/>}
                right={<Tools/>}
            />
        </CanvasContextProvider>
    )
})

export default CreationPage;