import React from "react";
import Sign from "../../common/images/button_signin.svg"

const Icon: React.FC = () => {
    return (
        <img src={Sign} height={60}></img>
    );
};

export const SignIn: React.FC = () => {
    return <Icon/>;
};
