import React from "react";
import Frame from "../../common/images/Frame.svg"

const Icon: React.FC = () => {
    return (
        <img src={Frame}></img>
    );
};

export const FrameItem: React.FC = () => {
    return <Icon/>;
};
