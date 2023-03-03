import React from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Layout} from "../common/layout/Layout";
import {Tools} from "../creation/tools";
import {Menu} from "../common/menu";
import Canvas from "../creation/canvas/Canvas";
import {CanvasContextProvider} from "../creation/canvas/provider/CanvasContextProvider";
import {Animation} from "../creation/animation";


const CreationPage = observer(() => {
    const {id} = useParams()
    return (
        <CanvasContextProvider>
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