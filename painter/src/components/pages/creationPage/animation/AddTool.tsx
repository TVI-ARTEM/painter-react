import React from "react";
import Add from "../../../common/images/Add-frame.svg"

const Icon: React.FC = () => {
    return (
        <img src={Add}></img>
    );
};

export const AddTool: React.FC = () => {
    return <Icon/>;
};
