import React from "react";
import Pippete from "../../common/images/Pippete.svg"

const Icon: React.FC = () => {
    return (
        <img src={Pippete}></img>
    );
};

export const PippeteTool: React.FC = () => {
    return <Icon/>;
};
