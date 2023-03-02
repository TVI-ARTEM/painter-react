import React from "react";
import Fill from "../../common/images/Fill.svg"

const Icon: React.FC = () => {
    return (
        <img src={Fill} style={{fill: "white"}}></img>
    );
};

export const FillTool: React.FC = () => {
    return <Icon/>;
};
