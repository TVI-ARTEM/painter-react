import React from 'react';
import {observer} from "mobx-react-lite";
import {Container, Navbar} from "react-bootstrap";
import {useParams} from "react-router-dom";

const ProfilePage = observer(() => {
    const {id} = useParams()

    return (
        <>
            <Navbar fixed={'top'} bg={'dark'}>
                <Container fluid>
                    <Navbar.Brand className={'roboto-text-regular'}/>

                </Container>
            </Navbar>
            <br/>
            PROFILE {id}
        </>)
})

export default ProfilePage;