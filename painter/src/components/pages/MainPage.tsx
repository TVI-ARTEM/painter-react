import React from 'react';
import {observer} from "mobx-react-lite";
import {Col, Container, Row, Navbar} from "react-bootstrap";

const MainPage  = observer(() => {

    return (
        <>
            <Navbar fixed={'top'} bg={'dark'}>
                <Container fluid>
                    <Navbar.Brand className={'roboto-text-regular'}/>

                </Container>
            </Navbar>
            <br/>
            MAIN

        </>)
})

export default MainPage;