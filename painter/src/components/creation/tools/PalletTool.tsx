import React from "react";
import Pallet from "../../common/images/Palette.svg"

const Icon: React.FC = () => {
    return (
        <img src={Pallet} style={{fill: "white"}}></img>
    );
};

export const PalletTool: React.FC = () => {
    return <Icon/>;
};
