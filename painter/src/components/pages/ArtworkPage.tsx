import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Container, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {Project} from "../providers/CanvasContextProvider";
import {get, like} from "../../http/projectApi";
import {MAIN_ROUTE, PROFILE_ROUTE_LESS_ID} from "../../utils/consts";
import {Menu} from "../common/menu";
import Dummy from "../common/images/vorona.png"
import UserLogo from "../common/images/UserLogo.png";
import Like from "../common/images/Like.svg";
import UnLike from "../common/images/UnLike.svg";
import {UserContext} from "../providers/UserProvider";

const {createGIF} = require("gifshot")

const ArtworkPage = observer(() => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState<Project>({} as Project);
    const [userNickname, setUserNickname] = useState("")
    const [urlToShow, setUrlToShow] = useState(Dummy)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const {user, isAuth} = useContext(UserContext)
    const createGifCustom = (canvasWidth: number) => {
        const canvas = document.createElement("canvas")
        const pixelWidth = Math.floor(canvasWidth / project.width)
        canvas.setAttribute("width", `${canvasWidth}px`)
        canvas.setAttribute("height", `${canvasWidth}px`)
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
                                ctx.fillStyle = color === "-1" ? `rgba(255, 255, 255, 0)` : color.toString();
                                ctx.fillRect(column * pixelWidth, row * pixelWidth, pixelWidth, pixelWidth)
                            }
                        }
                    }

                    const url = canvas.toDataURL("png")
                    urls.push(url)
                }
            }
        }


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
                setUrlToShow(obj.image)
            }
        });
    }

    useEffect(() => {
        get(+(id as string)).then(data => {
            setProject(data.project)
            setIsLiked(data.liked)
            setLikes(data.likes)
            setUserNickname(data.userNickname)
        }).catch(() => {
            navigate(MAIN_ROUTE)
        })

    }, [user, id])

    useEffect(() => {
        try {
            createGifCustom(512)
        } catch (error: any) {
            console.log(error.response.data)
        }
    }, [project])

    return (
        <div style={{backgroundColor: "#DFDFDF"}}>
            <Menu/>

            <Container fluid style={{height: "80vh", marginTop: "40px"}}>
                <Row style={{height: "100%", alignItems: "center"}}>
                    <Col xs={10} style={{alignItems: "center", overflow: "auto"}}>
                        <img style={{
                            width: "512px",
                            aspectRatio: 1,
                            backgroundColor: "#EFEFEF",
                            border: "2px solid black",
                            marginLeft: "30%"
                        }}
                             src={urlToShow}
                             alt={""}
                        />
                    </Col>
                    <Col style={{overflow: "auto"}}>
                        <div
                            className={"ms-auto"}
                            style={{
                                width: "100%",
                                height: '750px',
                                backgroundColor: "#EFEFEF",
                                borderRadius: "25px",
                                border: "2px solid black",
                                overflow: "auto",
                            }}>
                            <Container fluid style={{textAlign: "right"}}>
                                <Stack direction={"horizontal"}>
                                    <div className={"Text-Regular"} style={{
                                        textAlign: "left", alignItems: "center",
                                        marginTop: "10px", cursor: "pointer"
                                    }} onClick={() => {
                                        setIsLiked(!isLiked)

                                        if (isAuth) {
                                            like(project.index, user.nickname).then(data => {
                                                setLikes(data.likes)
                                            })
                                        }
                                    }
                                    }>
                                        <img
                                            alt=""
                                            src={isLiked ? Like : UnLike}
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"

                                            style={{
                                                transform: "scaleX(-1)",
                                                marginLeft: "10px",
                                                marginRight: "10px",
                                                textAlign: "center"
                                            }}
                                        />
                                        {likes}
                                    </div>
                                    <div className={"Text-Header2 ms-auto"} style={{
                                        textAlign: "right", alignItems: "center",
                                        marginTop: "10px", cursor: "pointer"
                                    }}
                                         onClick={() => {
                                             navigate(PROFILE_ROUTE_LESS_ID + userNickname)
                                         }
                                         }
                                    >
                                        {userNickname}
                                        <img
                                            alt=""
                                            src={UserLogo}
                                            width="48"
                                            height="48"
                                            className="d-inline-block align-top"

                                            style={{
                                                transform: "scaleX(-1)",
                                                backgroundColor: "#000",
                                                borderRadius: "25px",
                                                marginLeft: "10px"
                                            }}
                                        />
                                    </div>
                                </Stack>

                                <div className={"Text-Header2"} style={{fontWeight: "bold"}}>{project.name}</div>
                                <div className={"Text-Regular"}>{project.description}</div>
                            </Container>

                        </div>
                    </Col>
                </Row>
            </Container>

        </div>)
})

export default ArtworkPage;