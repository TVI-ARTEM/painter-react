import React from "react";
import Pencil from "../../../common/images/Pencil.svg"

const Icon: React.FC = () => {
    return (
        <img src={Pencil}></img>
    );
};

export const PencilTool: React.FC = () => {
    return <Icon/>;
};
