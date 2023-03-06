import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Navbar, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {Menu} from "../common/menu";
import UserLogo from "../common/images/UserLogo.png";
import {UserContext} from "../providers/UserProvider";
import {getAllProjects, getAllProjectsStarts, remove} from "../../http/projectApi";
import {Project} from "../providers/CanvasContextProvider";
import {ARTWORK_ROUTE_LESS_ID, CREATION_ROUTE_LESS_ID, MAIN_ROUTE, PROFILE_ROUTE_LESS_ID} from "../../utils/consts";
import Dummy from "../common/images/vorona.png"


const SearchPage = observer(() => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        getAllProjectsStarts(id as string).then(data => {
            setProjects(data)
        }).catch(error => {
            console.log(error)
            navigate(MAIN_ROUTE)
        })
    }, [id])


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

        return Dummy
    }

    return (
        <div style={{backgroundColor: "#DFDFDF"}}>
            <Menu/>
            <Container fluid style={{textAlign: "center", marginTop: "50px"}}>
                <div className={"Text-Header2"}
                     style={{textAlign: "center"}}>
                    Projects starts with {id}:
                </div>

                <div style={{
                    display: "inline-grid",
                    gridTemplateColumns: `repeat(6,1fr)`,
                    width: "100%",
                    marginTop: "20px"
                }}
                > {
                    projects.filter(it => it.published).map((it, index) => <div
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
                            <div className={"Text-Header2"} style={{fontWeight: "bold"}}>{it.name.substring(0, 15)}</div>
                            <div className={"Text-Regular"}>{it.description.substring(0, 25)}</div>
                            <img width={"100%"} src={`${createGifCustom(512, it)}`}
                                 style={{aspectRatio: 1, cursor: "pointer"}}
                                 onClick={() => {
                                     navigate(ARTWORK_ROUTE_LESS_ID + it.index)
                                 }
                                 }/>

                        </Container>
                    </div>)
                }
                </div>

            </Container>
        </div>)
})

export default SearchPage;