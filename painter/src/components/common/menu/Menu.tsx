import React, {useContext, useState} from "react";
import "./Menu.css";
import "../../../index.css";
import {Button, Col, Container, Form, ListGroup, Modal, Navbar, Row, Stack} from "react-bootstrap";
import LogoVorona from "../images/vorona.png";
import UserLogo from "../images/UserLogo.png";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import {useNavigate} from "react-router-dom";
import {CREATION_ROUTE_LESS_ID, MAIN_ROUTE, PROFILE_ROUTE_LESS_ID} from "../../../utils/consts";
import {User, UserContext} from "../../providers/UserProvider";
import {login, logout, registration, updateData} from "../../../http/userApi";
import {Project} from "../../providers/CanvasContextProvider";
import {create} from "../../../http/projectApi";

interface Props {
}

export const Menu: React.FC<Props> = () => {
    const navigate = useNavigate()
    const {user, setUser, setIsAuth, isAuth} = useContext(UserContext)

    const [showSignIn, setShowSignIn] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showCreationSettings, setShowCreationSettings] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")
    const [projectWidth, setProjectWidth] = useState(16)
    const [projectName, setProjectName] = useState("")

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{borderRadius: "0px 0px 25px 25px"}}>
                <Container fluid>
                    <Navbar.Brand className={"Text-Header2"} style={{marginLeft: "25px", cursor: "pointer"}}
                                  onClick={() => navigate(MAIN_ROUTE)}>
                        <img
                            alt=""
                            src={LogoVorona}
                            width="48"
                            height="48"
                            className="d-inline-block align-top"
                        />{' '}
                        React Bootstrap
                    </Navbar.Brand>
                    {
                        !isAuth && (
                            <>
                                <div className={"ms-auto"}
                                     onClick={() => {
                                         setShowSignIn(true)
                                     }}
                                     onDragStart={e => e.preventDefault()}
                                     style={{marginRight: "10px", cursor: "pointer"}}>
                                    <SignIn/>
                                </div>
                                <div
                                    onClick={() => {
                                        setShowSignUp(true)
                                    }}
                                    onDragStart={e => e.preventDefault()}
                                    style={{marginRight: "50px", cursor: "pointer"}}>
                                    <SignUp/>
                                </div>
                            </>

                        )
                    }

                    {
                        isAuth && (
                            <Navbar.Brand className={"Text-Header2 dropdown"}
                                          style={{marginRight: "50px", cursor: "pointer"}}
                                          onClick={() => {
                                          }
                                          }>
                                {user.nickname}
                                <img
                                    alt=""
                                    src={UserLogo}
                                    width="48"
                                    height="48"
                                    className="d-inline-block align-top"

                                    style={{
                                        transform: "scaleX(-1)",
                                        backgroundColor: "#F0F0F0",
                                        borderRadius: "25px",
                                        marginLeft: "10px"
                                    }}


                                />
                                <div className="Text-Regular dropdown-content">
                                    <p onClick={() => {
                                        setShowCreationSettings(true)
                                    }
                                    }>New Project</p>
                                    <p onClick={() => {
                                        navigate(PROFILE_ROUTE_LESS_ID + user.nickname)
                                    }
                                    }>Profile</p>
                                    <p onClick={() => {
                                        setShowSettings(true)
                                    }
                                    }>Settings</p>
                                    <p onClick={() => {
                                        logout(user.email).then(() => {
                                            console.log("That's ok.")
                                        }).catch(error => {
                                            alert(error.response.data.message)
                                        }).finally(() => {
                                                setUser({} as User)
                                                setIsAuth(false)
                                            }
                                        )
                                    }
                                    }>Logout</p>
                                </div>
                            </Navbar.Brand>
                        )
                    }

                </Container>
            </Navbar>

            <Modal show={showSignIn} onHide={() => {
                setNickname("")
                setEmail("")
                setPassword("")
                setShowSignIn(false)
            }}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton style={{color: "black"}} className={"Text-Regular"}>
                    Sign In
                </Modal.Header>
                <Modal.Body>
                    <Stack style={{textAlign: "center", alignSelf: "center", alignItems: "center", display: "flex"}}>
                        <label className={'Text-Regular'}>
                            Email:
                        </label>

                        <input type={'text'} placeholder={'Enter Email'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setEmail(event.target.value)}
                               required></input>
                        <label className={'Text-Regular'}>
                            Password:
                        </label>
                        <input type={'password'} placeholder={'Enter Password'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setPassword(event.target.value)}
                               required></input>
                    </Stack>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {
                        login(email, password).then(data => {
                            setUser(data as User)
                            setIsAuth(true)
                        }).catch(e => alert(e.response.data.message)).finally(() => {
                            setNickname("")
                            setEmail("")
                            setPassword("")
                            setShowSignIn(false)
                        })
                    }} className={"Text-Regular"}>Sign In</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showSignUp} onHide={() => {
                setNickname("")
                setEmail("")
                setPassword("")
                setShowSignUp(false)
            }}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton style={{color: "black"}} className={"Text-Regular"}>
                    Sign Up
                </Modal.Header>
                <Modal.Body>
                    <Stack style={{textAlign: "center", alignSelf: "center", alignItems: "center", display: "flex"}}>
                        <label className={'Text-Regular'}>
                            Email:
                        </label>
                        <input type={'text'} placeholder={'Enter Email'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setEmail(event.target.value)}
                               required></input>

                        <label className={'Text-Regular'}>
                            Nickname:
                        </label>
                        <input type={'text'} placeholder={'Enter Nickname'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setNickname(event.target.value)}
                               required></input>

                        <label className={'Text-Regular'}>
                            Password:
                        </label>
                        <input type={'password'} placeholder={'Enter Password'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setPassword(event.target.value)}
                               required></input>
                    </Stack>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {
                        registration(email, nickname, password).then(data => {
                            setUser(data as User)
                            setIsAuth(true)
                        }).catch(e => alert(e.response.data.message)).finally(() => {
                            setNickname("")
                            setEmail("")
                            setPassword("")
                            setShowSignUp(false)
                        })
                    }} className={"Text-Regular"}>Sign Up</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSettings} onHide={() => {
                setNickname("")
                setEmail("")
                setPassword("")
                setShowSettings(false)
            }}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton style={{color: "black"}} className={"Text-Regular"}>
                    Settings
                </Modal.Header>
                <Modal.Body>
                    <Stack style={{textAlign: "center", alignSelf: "center", alignItems: "center", display: "flex"}}>
                        <label className={'Text-Regular'}>
                            Nickname:
                        </label>
                        <input type={'text'} placeholder={'Enter New Nickname'}
                               className={'form-control Text-Regular'}
                               onChange={(event) => setNickname(event.target.value)}
                               required
                               autoComplete={"off"}/>
                    </Stack>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {
                        console.log(user.email)
                        console.log(nickname)
                        updateData(user.email,
                            nickname)
                            .then(data => {
                                setUser(data as User)
                                setIsAuth(true)
                            }).catch(e => alert(e.response.data.message)).finally(() => {
                            setNickname("")
                            setEmail("")
                            setPassword("")
                            setShowSettings(false)
                        })
                    }} className={"Text-Regular"}>Save</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showCreationSettings} onHide={() => {
                setShowCreationSettings(false)
            }}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton style={{color: "black"}} className={"Text-Regular"}>
                    New Project
                </Modal.Header>
                <Modal.Body>
                    <Stack style={{textAlign: "center", alignSelf: "center", alignItems: "center", display: "flex"}}>
                        <Form.Group as={Row}>
                            <Form.Label className={"Text-Regular"}>
                                Project Width
                            </Form.Label>

                            <ListGroup>
                                {
                                    Array(4).fill(0).map((val, index) =>
                                        <ListGroup.Item
                                            key={index}
                                            style={{
                                                backgroundColor: Math.pow(2, index + 4) ===
                                                projectWidth ? "red" : "transparent"
                                            }}
                                            className={"Text-Regular"}
                                            onClick={() =>
                                                setProjectWidth(Math.pow(2, index + 4))}>
                                            {Math.pow(2, index + 4)}
                                        </ListGroup.Item>
                                    )
                                }

                            </ListGroup>
                            <br/>
                            <label className={'Text-Regular'}>
                                Name:
                            </label>
                            <input type={'text'} placeholder={'Enter New Nickname'}
                                   className={'form-control Text-Regular'}
                                   onChange={(event) => setProjectName(event.target.value)}
                                   required
                                   autoComplete={"off"}/>

                        </Form.Group>


                    </Stack>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {
                        if (projectName.length === 0) {
                            return
                        }
                        const newProj: Project = {
                            frames: [Array(projectWidth * projectWidth).fill("-1")],
                            width: projectWidth,
                            name: projectName,
                            index: 0,
                            published: false,
                            description: "New Description"
                        }
                        create(newProj, user.email).then(data => {
                            navigate(CREATION_ROUTE_LESS_ID + data)
                        }).catch(error => {
                            console.log(error.response.data)
                        }).finally(() => {
                            setProjectName("")
                            setProjectWidth(16)
                            setShowCreationSettings(false)
                        })
                    }} className={"Text-Regular"}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};
