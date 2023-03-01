import React from "react";
import "./Tools.css";

import { UndoTool } from "./UndoTool";

export const Tools: React.FC = () => {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >

            <button className={"Tools-items Tools-button"}>
                <UndoTool />
            </button>

        </div>
    );
};
