import React from "react";
import "./Menu.css";
import "../../../index.css";
import {Stack} from "react-bootstrap";
import LogoVorona from "../images/vorona.png";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import canvas from "../../creation/canvas/Canvas";

interface Props {
}

export const Menu: React.FC<Props> = () => {
    return (
        <Stack direction="horizontal">
            <img src={LogoVorona} style={{width: "5%", aspectRatio: 1, marginLeft: "50px"}} alt={""}/>

            <p className={"Text-Header1"} style={{color: "white", margin: 0}}>Pixelshop</p>

            <div className={"ms-auto"}
                 style={{marginRight: "10px"}}>
                <SignIn/>
            </div>
            <div style={{marginRight: "50px"}}>
                <SignUp/>
            </div>


        </Stack>
    );
};
