import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';

function index(): void {
    const root: ?HTMLElement = document.querySelector("#root");

    if ((root === null) ||
        (root === undefined) ||
        (root && !(root instanceof HTMLElement))) {
        throw new Error("Expected a 'root' identifier element.");
    }
    const app  = (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
    ReactDOM.render(app, root);
}

index();
