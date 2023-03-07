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


    useEffect(() => {
        get(isAuth ? user.nickname : "-", +(id as string)).then(data => {
            setProject(data.project)
            setIsLiked(data.liked)
            setLikes(data.likes)
            createGifCustom(data.gif, 512)
            setUserNickname(data.userNickname)
        }).catch(() => {
            navigate(MAIN_ROUTE)
        })

    }, [user, isAuth, id])

    const createGifCustom = (urls: String[], canvasWidth: number) => {
        const options = {
            images: urls,
            gifWidth: canvasWidth,
            gifHeight: canvasWidth,
            numWorkers: 5,
            frameDuration: 0.01,
            sampleInterval: 10,
        };
        console.log(urls)
        createGIF(options, (obj: any) => {
            if (!obj.error) {
                setUrlToShow(obj.image)
            }
        });
    }


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
                                        if (isAuth) {
                                            like(project.index, user.nickname).then(data => {
                                                setIsLiked(!isLiked)
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