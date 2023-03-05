import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import "@fontsource/vt323"
import {UserContextProvider} from "./components/providers/UserProvider";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <UserContextProvider>
        <App/>
    </UserContextProvider>
);

