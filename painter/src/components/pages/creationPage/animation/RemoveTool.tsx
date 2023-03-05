import React from "react";
import Remove from "../../../common/images/Remove.svg"

const Icon: React.FC = () => {
    return (
        <img src={Remove}></img>
    );
};

export const RemoveTool: React.FC = () => {
    return <Icon/>;
};
