import React, {useContext} from 'react';
import {AddTool} from "./AddTool";
import {RemoveTool} from "./RemoveTool";
import {PlayTool} from "./PlayTool";
import {FrameItem} from "./FrameItem";
import "./Animation.css"
import {CanvasContext, HistoryType, Tool} from "../canvas/provider/CanvasContextProvider";

export const Animation: React.FC = () => {
    const {
        project,
        setProject,
        currentFrame,
        setCurrentFrame,
        setRedoHistory,
        setUndoHistory,
        undoHistory
    } = useContext(CanvasContext)
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    let copyFrame = [...project.frames.at(currentFrame) as String[]]
                    let newProj = Object.assign({}, project)
                    newProj.frames.splice(currentFrame, 0, copyFrame)
                    setUndoHistory([...undoHistory, {
                        type: HistoryType.AddFrame,
                        cells: copyFrame,
                        index: currentFrame + 1
                    }])
                    setRedoHistory([])
                    setProject(newProj)
                    setCurrentFrame(currentFrame + 1)
                }
            }>
                <AddTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                    if (project.frames.length > 1) {
                        let copyFrame = [...project.frames.at(currentFrame) as String[]]
                        let newProj = Object.assign({}, project)
                        newProj.frames.splice(currentFrame, 1)
                        setUndoHistory([...undoHistory, {
                            type: HistoryType.DeleteFrame,
                            cells: copyFrame,
                            index: currentFrame - 1
                        }])
                        setRedoHistory([])
                        setProject(newProj)
                        setCurrentFrame(Math.max(currentFrame - 1, 0))
                    }
                }
            }>
                <RemoveTool/>
            </button>

            <button className={"Tools-items Tools-button"} onClick={
                () => {
                }
            }>
                <PlayTool/>
            </button>

            <br/>

            <div style={{height: "500px", width: "100%", overflow: "auto", display: "flex", flexDirection: "column"}}>
                {
                    project.frames.map((it, index) =>
                        <button className={"Tools-items Tools-button"} onClick={
                            () => {
                                setCurrentFrame(index)
                            }
                        }
                                style={{background: currentFrame === index ? "red" : "none"}}
                                key={index}
                        >
                            <FrameItem/>
                        </button>)

                }
            </div>
        </div>


    )
};

