import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Navbar, Row, Stack} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {Menu} from "../common/menu";
import UserLogo from "../common/images/UserLogo.png";
import {UserContext} from "../providers/UserProvider";
import {getAllProjects, remove} from "../../http/projectApi";
import {Project} from "../providers/CanvasContextProvider";
import {ARTWORK_ROUTE_LESS_ID, CREATION_ROUTE_LESS_ID, MAIN_ROUTE} from "../../utils/consts";
import Dummy from "../common/images/vorona.png"


const ProfilePage = observer(() => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const [nickname, setNickname] = useState("")
    const [projects, setProjects] = useState<Project[]>([]);
    const [previews, setPreviews] = useState<{preview: string, gif: string[], projectId: number}[]>([]);
    useEffect(() => {
        getAllProjects(id as string).then(data => {
            setProjects(data.projects)
            setPreviews(data.previews)
            setNickname(data.userNickname)
        }).catch(error => {
            console.log(error)
            navigate(MAIN_ROUTE)
        })
    }, [id])

    useEffect(() => {
        console.log(previews)
    }, [previews])



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
                <div className={"Text-Header2"}
                     style={{textAlign: "center", marginTop: "25px"}}>
                    Projects
                </div>
                <div style={{
                    display: "inline-grid",
                    gridTemplateColumns: `repeat(6,1fr)`,
                    width: "100%",
                    marginTop: "20px"
                }}
                > {
                    projects.filter(it => user.nickname === nickname || it.published).map((it, index) => <div
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
                            <img width={"100%"} src={`${previews.find(prev => prev.projectId === it.index )?.preview}`}
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
                                        <div
                                            onClick={() => {
                                                remove(it.index, user.email).catch(error => console.log(error.response.data))
                                                    .finally(() => {
                                                        getAllProjects(id as string).then(data => {
                                                            setProjects(data.projects)
                                                            setNickname(data.userNickname)
                                                        }).catch(error => {
                                                            console.log(error)
                                                            navigate(MAIN_ROUTE)
                                                        })
                                                    })
                                            }
                                            }
                                            className={"Text-Regular"} style={{color: "red", cursor: "pointer"}}>Remove
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