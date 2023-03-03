import React from "react";
import Play from "../../common/images/Play-animation.svg"

const Icon: React.FC = () => {
    return (
        <img src={Play} style={{fill: "white"}}></img>
    );
};

export const PlayTool: React.FC = () => {
    return <Icon/>;
};
