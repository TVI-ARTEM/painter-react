import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";


export default function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

