import React from "react";
import ZoomIn from "../../common/images/Zoom in.svg"

const Icon: React.FC = () => {
    return (
        <img src={ZoomIn} style={{fill: "white"}}></img>
    );
};

export const ZoomInTool: React.FC = () => {
    return <Icon/>;
};
