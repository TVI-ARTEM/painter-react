import React, {useContext, useState} from 'react';
import {AddTool} from "./AddTool";
import {RemoveTool} from "./RemoveTool";
import {PlayTool} from "./PlayTool";
import {FrameItem} from "./FrameItem";
import "./Animation.css"
import {CanvasContext, HistoryType} from "../../../providers/CanvasContextProvider";
import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";

const {createGIF} = require("gifshot")
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

        const [canvasWidth, setCanvasWidth] = useState(project.width);
        const [urlToShow, setUrlToShow] = useState("");
        const [showRender, setShowRender] = useState(false)


        const createGifCustom = (canvasWidth: number, isShow: boolean) => {
            console.log(canvasWidth)
            const canvas = document.createElement("canvas")
            const pixelWidth = Math.floor(canvasWidth / project.width)
            canvas.setAttribute("width", `${canvasWidth}px`)
            canvas.setAttribute("height", `${canvasWidth}px`)
            console.log(canvas.width)
            console.log(canvas.height)
            const ctx = canvas.getContext("2d")
            const urls = []
            if (ctx !== null) {
                if (project.frames !== undefined) {
                    for (let index = 0; index < project.frames.length; index++) {
                        ctx.clearRect(0, 0, canvasWidth, canvasWidth)
                        if (project.frames.at(index) !== undefined) {
                            for (let row = 0; row < project.width; row++) {
                                for (let column = 0; column < project.width; column++) {
                                    const indexCell = row * project.width + column;
                                    // @ts-ignorex
                                    const color = project.frames.at(index).at(indexCell) as String
                                    ctx.fillStyle = color === "-1" ? `rgba(255, 255, 255, 255)` :color.toString();
                                    ctx.fillRect(column * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth)
                                }
                            }
                        }


                        const url = canvas.toDataURL("png")
                        urls.push(url)
                    }
                }
            }
            console.log(urls)

            const options = {
                images: urls,
                gifWidth: canvasWidth,
                gifHeight: canvasWidth,
                numWorkers: 5,
                frameDuration: 0.01,
                sampleInterval: 10,
            };
            createGIF(options, (obj: any) => {
                if (!obj.error) {
                    if (isShow) {
                        setUrlToShow(obj.image)
                    } else {
                        const link = document.createElement('a');
                        console.log(urlToShow)
                        link.href = obj.image;
                        link.download = 'sample.gif';
                        link.click();
                    }

                }
            });
        }


        return (
            <>
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
                            if (project.frames.length < 20) {
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
                            createGifCustom(512, true)
                            setShowRender(true)
                        }
                    }>
                        <PlayTool/>
                    </button>

                    <br/>
                    <div style={{
                        height: "400px",
                        width: "100%",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "50px"
                    }}>
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

                <Modal show={showRender} onHide={() => {
                    setShowRender(false)
                }}
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                    <Modal.Header closeButton style={{color: "black"}} className={"Text-Regular"}>
                        Save GIF
                    </Modal.Header>
                    <Modal.Body>
                        <Stack style={{textAlign: "center", alignSelf: "center", alignItems: "center", display: "flex"}}>
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label className={"Text-Regular"}>
                                        Width
                                    </Form.Label>

                                    <Col xs="10">
                                        <Form.Range
                                            value={canvasWidth}
                                            onChange={e => setCanvasWidth(+e.target.value)}
                                            min={project.width}
                                            max={Math.min(project.width * 128, 2048)}
                                            step={project.width}
                                        />
                                    </Col>
                                    <Col xs="2">
                                        <Form.Control value={canvasWidth} readOnly size='sm'/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <br/>
                            <img alt={""} src={urlToShow} style={{width: "400px", aspectRatio: 1, border: "2px solid black"}}/>
                        </Stack>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={() => {
                            createGifCustom(canvasWidth, false)
                        }} className={"Text-Regular"}>Save GIF</Button>
                    </Modal.Footer>
                </Modal>
            </>

        )
    }
;

