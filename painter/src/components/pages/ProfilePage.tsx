import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Navbar, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {Menu} from "../common/menu";
import UserLogo from "../common/images/UserLogo.png";
import {UserContext} from "../providers/UserProvider";
import {getAll} from "../../http/projectApi";
import {Project} from "../providers/CanvasContextProvider";
import {ARTWORK_ROUTE_LESS_ID, CREATION_ROUTE_LESS_ID, MAIN_ROUTE} from "../../utils/consts";

const {createGIF} = require("gifshot")

const ProfilePage = observer(() => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        getAll(id as string).then(data => {
            setProjects(data.projects)
        }).catch(error => {
            console.log(error)
            navigate(MAIN_ROUTE)
        })
    }, [])


    const createGifCustom = (canvasWidth: number, project: Project) => {
        const canvas = document.createElement("canvas")
        const pixelWidth = Math.floor(canvasWidth / project.width)
        canvas.setAttribute("width", `${canvasWidth}px`)
        canvas.setAttribute("height", `${canvasWidth}px`)
        const ctx = canvas.getContext("2d")
        if (ctx !== null) {
            if (project.frames !== undefined) {
                for (let index = 0; index < project.frames.length; index++) {
                    ctx.clearRect(0, 0, canvasWidth, canvasWidth)
                    if (project.frames.at(index) !== undefined) {
                        for (let row = 0; row < project.width; row++) {
                            for (let column = 0; column < project.width; column++) {
                                const indexCell = row * project.width + column;
                                // @ts-ignore
                                const color = project.frames.at(index).at(indexCell) as String
                                ctx.fillStyle = color === "-1" ? `rgba(255, 255, 255, 0)` : color.toString();
                                ctx.fillRect(column * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth)
                            }
                        }
                    }

                    return canvas.toDataURL("png")

                }
            }
        }


    }

    return (
        <div style={{backgroundColor: "#DFDFDF"}}>
            <Menu/>
            <Container fluid style={{textAlign: "center", marginTop: "50px"}}>
                <div className={"Text-Header1"} style={{alignItems: "center", fontSize: "60px"}}>
                    {id}
                    <img
                        alt=""
                        src={UserLogo}
                        width="100"
                        height="100"
                        className="d-inline-block align-top"

                        style={{
                            transform: "scaleX(-1)",
                            backgroundColor: "#F0F0F0",
                            borderRadius: "50px",
                            marginLeft: "20px"
                        }}
                    />
                </div>

                <div style={{
                    display: "inline-grid",
                    gridTemplateColumns: `repeat(6,1fr)`,
                    width: "100%",
                    marginTop: "20px"
                }}
                > {
                    projects.map((it, index) => <div
                        style={{
                            backgroundColor: "#EFEFEF",
                            width: "90%",
                            borderRadius: "5%",
                            aspectRatio: 1,
                            marginBottom: "20px",
                            border: "4px solid black",

                        }}
                        key={index}

                    >
                        <Container fluid style={{marginBottom: "10px", textAlign: "center"}}>
                            <div className={"Text-Header2"} style={{fontWeight: "bold"}}>{it.name}</div>
                            <div className={"Text-Regular"}>{it.description}</div>
                            <img width={"100%"} src={`${createGifCustom(500, it)}`}
                                 style={{aspectRatio: 1, cursor: "pointer"}}
                                 onClick={() => {
                                     navigate(ARTWORK_ROUTE_LESS_ID + it.index)
                                 }
                                 }/>
                            {
                                id === user.nickname && (
                                    <>
                                        <div className={"Text-Regular"}
                                             onClick={() => {
                                                 navigate(CREATION_ROUTE_LESS_ID + it.index)

                                             }
                                             }
                                             style={{color: "blue", cursor: "pointer"}}>Edit
                                        </div>
                                        <div className={"Text-Regular"} style={{color: "red", cursor: "pointer"}}>Remove
                                        </div>
                                    </>
                                )
                            }

                        </Container>
                    </div>)
                }
                </div>

            </Container>
        </div>)
})

export default ProfilePage;