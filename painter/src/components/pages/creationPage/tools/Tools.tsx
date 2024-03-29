import React, {useContext, useState} from "react";
import "./Tools.css";

import {UndoTool} from "./UndoTool";
import {PencilTool} from "./PencilTool";
import {EraseTool} from "./EraseTool";
import {CanvasContext, HistoryType, Project, Tool, History} from "../../../providers/CanvasContextProvider";
import {RedoTool} from "./RedoTool";
import {FillTool} from "./FillTool";
import {PalletTool} from "./PalletTool";
import {ZoomInTool} from "./ZoomInTool";
import {ZoomOutTool} from "./ZoomOutTool";
import {PippeteTool} from "./PippeteTool";
import {Button, Col, Form, ListGroup, Modal, Row, Stack} from "react-bootstrap";
import {PublishTool} from "./PublishTool";
import Remove from "../../../common/images/Remove.svg";

function hexToRgb(hex: String) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toString());
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}


export const Tools: React.FC = () => {
    const {
        project,
        setProject,
        tags,
        setTags,
        setCurrentFrame,
        setTool,
        tool,
        zoom,
        setZoom,
        currentColor,
        setCurrentColor,
        undoHistory,
        setUndoHistory,
        redoHistory,
        setRedoHistory,
    } = useContext(CanvasContext)
    const [showPallet, setShowPallet] = useState(false)
    const [showPublish, setShowPublish] = useState(false)
    const [red, setRed] = useState(0)
    const [green, setGreen] = useState(0)
    const [blue, setBlue] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState("")
    const [currentTags, setCurrentTags] = useState<String[]>([])

    function applyHistory(history: History, project: Project, setProject: (value: (((prevState: Project) => Project) | Project)) => void, setCurrentFrame: (value: (((prevState: number) => number) | number)) => void) {
        if (history.type === HistoryType.ChangeColor) {
            let copyFrame = [...history.cells]
            let newProj = Object.assign({}, project)
            history = {
                type: HistoryType.ChangeColor,
                cells: project.frames[history.index],
                index: history.index
            }
            newProj.frames[history.index] = copyFrame

            setProject(newProj)
        } else if (history.type === HistoryType.AddFrame) {
            let copyFrame = [...history.cells]
            history = {
                type: HistoryType.DeleteFrame,
                cells: copyFrame,
                index: history.index - 1
            }
            let newProj = Object.assign({}, project)
            newProj.frames.splice(history.index, 1)

            setProject(newProj)
            setCurrentFrame(Math.max(history.index - 1, 0))

        } else if (history.type === HistoryType.DeleteFrame) {
            let copyFrame = [...history.cells]
            history = {
                type: HistoryType.AddFrame,
                cells: copyFrame,
                index: history.index + 1
            }
            let newProj = Object.assign({}, project)
            newProj.frames.splice(history.index, 0, copyFrame)

            setProject(newProj)
            setCurrentFrame(Math.min(history.index, project.frames.length - 1))
        }
        return history;
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

                        if (undoHistory.length > 0) {
                            let history = undoHistory.at(-1) as History
                            history = applyHistory(history, project, setProject, setCurrentFrame);

                            setRedoHistory([...redoHistory, history])
                            setUndoHistory(undoHistory.slice(0, -1))
                        }


                    }
                }>
                    <UndoTool/>
                </button>
                <button className={"Tools-items Tools-button"} onClick={
                    () => {

                        if (redoHistory.length > 0) {
                            let history = redoHistory.at(-1) as History

                            history = applyHistory(history, project, setProject, setCurrentFrame);


                            setUndoHistory([...undoHistory, history])
                            setRedoHistory(redoHistory.slice(0, -1))
                        }
                    }
                }>
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
                        const rgb = hexToRgb(currentColor)
                        if (rgb !== null) {
                            setRed(rgb.r)
                            setGreen(rgb.g)
                            setBlue(rgb.b)
                        }
                        setShowPallet(true)
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

                <button className={"Tools-items Tools-button"} onClick={
                    () => {
                        setTitle(project.name)
                        setDescription(project.description)
                        setShowPublish(true)
                        setTag("")
                        setCurrentTags(tags)
                    }
                }>
                    <PublishTool/>
                </button>

            </div>

            <Modal show={showPallet} onHide={() => {
                setShowPallet(false)
            }}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton style={{color: "black"}}>
                    Pallet
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        <div style={{
                            backgroundColor: `rgb(${red} ${green} ${blue})`,
                            width: "80px",
                            aspectRatio: 1,
                            alignSelf: "center",
                            borderRadius: "10px",
                            border: `2px solid black`
                        }}/>

                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label>
                                    Red
                                </Form.Label>

                                <Col xs="10">
                                    <Form.Range
                                        value={red}
                                        onChange={e => setRed(+e.target.value)}
                                        min={0}
                                        max={255}
                                    />
                                </Col>
                                <Col xs="2">
                                    <Form.Control value={red} readOnly size='sm'/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label>
                                    Green
                                </Form.Label>

                                <Col xs="10">
                                    <Form.Range
                                        value={green}
                                        onChange={e => setGreen(+e.target.value)}
                                        min={0}
                                        max={255}
                                    />
                                </Col>
                                <Col xs="2">
                                    <Form.Control value={green} readOnly size='sm'/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label>
                                    Blue
                                </Form.Label>

                                <Col xs="10">
                                    <Form.Range
                                        value={blue}
                                        onChange={e => setBlue(+e.target.value)}
                                        min={0}
                                        max={255}
                                    />
                                </Col>
                                <Col xs="2">
                                    <Form.Control value={blue} readOnly size='sm'/>
                                </Col>
                            </Form.Group>
                        </Form>

                    </Stack>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {
                        setCurrentColor(rgbToHex(red, green, blue))
                        setShowPallet(false)
                    }}>Save</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showPublish} onHide={() => {
                setDescription("")
                setTitle("")
                setTag("")
                setCurrentTags([])
                setShowPublish(false)

            }}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton style={{color: "black"}} className={"Text-Regular"}>
                    Publish
                </Modal.Header>
                <Modal.Body>
                    <Stack style={{textAlign: "center", alignSelf: "center", alignItems: "center", display: "flex"}}
                           gap={2}>
                        <label className={'Text-Regular'}>
                            Title:
                        </label>

                        <input type={'text'} placeholder={'Enter title'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setTitle(event.target.value)}
                               required
                               value={title}
                               multiple={false}
                        ></input>
                        <label className={'Text-Regular'}>
                            Description:
                        </label>
                        <textarea placeholder={'Enter Description'}
                                  className={'form-control Text-Regular'}
                                  value={description}
                                  onChange={(event) => setDescription(event.target.value)}
                                  required></textarea>

                        <label className={'Text-Regular'}>
                            New Tag
                        </label>
                        <input type={'text'} placeholder={'Enter new tag'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setTag(event.target.value)}
                               required
                               value={tag}
                               multiple={false}
                        ></input>
                        <Button variant={"dark"} onClick={() => {
                            if (tag.length > 0 && !currentTags.includes(`#${tag}`)) {
                                setCurrentTags([...currentTags, `#${tag}`])
                            }
                        }
                        }>ADD TAG</Button>
                        <label className={'Text-Regular'}>
                            TAGS
                        </label>
                        <Stack gap={2}>
                            {
                                currentTags.map((it, index) =>
                                    <Stack direction={"horizontal"} className={"Text-Regular"} key={index}>
                                        {it}
                                        <img
                                            alt=""
                                            src={Remove}
                                            width="48"
                                            height="48"
                                            className="d-inline-block ms-auto"
                                            onClick={() => {
                                                console.log(currentTags)
                                                currentTags.splice(index, 1)
                                                console.log(currentTags)
                                                setCurrentTags(currentTags)
                                                setTag(tag + "")
                                            }
                                            }
                                            style={{
                                                transform: "scaleX(-1)",
                                                marginLeft: "10px",
                                                cursor: "pointer"
                                            }}/>
                                    </Stack>
                                )
                            }
                        </Stack>
                    </Stack>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {
                        if (title.length < 3 || description.length < 3) {
                            return
                        }
                        let newProj = Object.assign({}, project)
                        newProj.name = title
                        newProj.description = description
                        newProj.published = true
                        setProject(newProj)
                        setTags(currentTags)
                        setShowPublish(false)
                    }} className={"Text-Regular"}>Publish</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};
