import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {Menu} from "../common/menu";
import {getAllProjectsStarts} from "../../http/projectApi";
import {Project} from "../providers/CanvasContextProvider";
import {ARTWORK_ROUTE_LESS_ID, MAIN_ROUTE} from "../../utils/consts";


const SearchPage = observer(() => {
    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([]);
    const [previews, setPreviews] = useState<{ preview: string, gif: string[], projectId: number }[]>([]);
    useEffect(() => {
        getAllProjectsStarts((id as string).replace("<@>", "#")).then(data => {
            setProjects(data.projects)
            setPreviews(data.previews)
        }).catch(error => {
            console.log(id)
            console.log(error)
            navigate(MAIN_ROUTE)
        })
    }, [id])


    return (
        <div style={{backgroundColor: "#DFDFDF"}}>
            <Menu/>
            <Container fluid style={{textAlign: "center", marginTop: "50px"}}>
                <div className={"Text-Header2"}
                     style={{textAlign: "center"}}>

                    Projects with {(id as string).replace("<@>", "#")}:
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
                            <div className={"Text-Header2"}
                                 style={{fontWeight: "bold"}}>{it.name.substring(0, 15)}</div>
                            <div className={"Text-Regular"}>{it.description.substring(0, 25)}</div>
                            <img width={"100%"} src={`${previews.find(prev => prev.projectId === it.index)?.preview}`}
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