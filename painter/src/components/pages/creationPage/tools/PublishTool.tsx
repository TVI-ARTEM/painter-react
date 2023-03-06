import React from "react";
import Publish from "../../../common/images/Publish.svg"

const Icon: React.FC = () => {
    return (
        <img src={Publish}></img>
    );
};

export const PublishTool: React.FC = () => {
    return <Icon/>;
};
