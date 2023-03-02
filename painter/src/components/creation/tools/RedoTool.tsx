import React from "react";
import Redo from "../../common/images/Redo.svg"

const Icon: React.FC = () => {
    return (
        <img src={Redo}></img>
    );
};

export const RedoTool: React.FC = () => {
    return <Icon/>;
};
