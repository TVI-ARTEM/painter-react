import React from "react";
import Sign from "../../common/images/button_signup.svg"

const Icon: React.FC = () => {
    return (
        <img src={Sign} height={60}></img>
    );
};

export const SignUp: React.FC = () => {
    return <Icon/>;
};
