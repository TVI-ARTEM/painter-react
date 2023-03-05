import React from 'react';
import {observer} from "mobx-react-lite";
import {Menu} from "../common/menu";

const MainPage  = observer(() => {

    return (
        <div style={{backgroundColor: "#DFDFDF"}}>
            <Menu/>
            MAIN

        </div>)
})

export default MainPage;