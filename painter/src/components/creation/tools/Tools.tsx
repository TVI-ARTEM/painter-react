import React, {useContext} from "react";
import "./Tools.css";

import {UndoTool} from "./UndoTool";
import {PencilTool} from "./PencilTool";
import {EraseTool} from "./EraseTool";
import {CanvasContext, Tool} from "../canvas/provider/CanvasContextProvider";
import {RedoTool} from "./RedoTool";
import {FillTool} from "./FillTool";
import {PalletTool} from "./PalletTool";
import {ZoomInTool} from "./ZoomInTool";
import {ZoomOutTool} from "./ZoomOutTool";
import {PippeteTool} from "./PippeteTool";

export const Tools: React.FC = () => {
    const {setTool, tool, zoom, setZoom} = useContext(CanvasContext)
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
                <UndoTool/>
            </button>
            <button className={"Tools-items Tools-button"}>
                <RedoTool/>
            </button>
            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    setTool(Tool.Pencil)
                }
            } style={{background: tool === Tool.Pencil ? "red" : "none"}}>
                <PencilTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    setTool(Tool.Pippete)
                }
            } style={{background: tool === Tool.Pippete ? "red" : "none"}}>
                <PippeteTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    setTool(Tool.Erase)
                }
            } style={{background: tool === Tool.Erase ? "red" : "none"}}>
                <EraseTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    setTool(Tool.Fill)
                }
            } style={{background: tool === Tool.Fill ? "red" : "none"}}>
                <FillTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                }
            }>
                <PalletTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    if (zoom < 8) {
                        setZoom(zoom + 1)
                    }
                }
            }>
                <ZoomInTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    if (zoom > 1) {
                        setZoom(zoom - 1)
                    }
                }
            }>
                <ZoomOutTool/>
            </button>

        </div>
    );
};
