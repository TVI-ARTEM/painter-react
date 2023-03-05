import React from "react";
import ZoomOut from "../../../common/images/Zoom out.svg"

const Icon: React.FC = () => {
    return (
        <img src={ZoomOut} style={{fill: "white"}}></img>
    );
};

export const ZoomOutTool: React.FC = () => {
    return <Icon/>;
};
