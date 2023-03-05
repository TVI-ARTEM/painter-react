import React from "react";
import Erase from "../../../common/images/Erase.svg"
const Icon: React.FC = () => {
  return (
    <img src={Erase} style={{fill: "white"}}></img>
  );
};

export const EraseTool: React.FC = () => {
  return <Icon />;
};
