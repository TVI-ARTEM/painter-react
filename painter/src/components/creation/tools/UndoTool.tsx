import React from "react";
import Undo from "../../common/images/Undo.svg"

const Icon: React.FC = () => {
    return (
        <img src={Undo}></img>
    );
};

export const UndoTool: React.FC = () => {
    return <Icon/>;
};
