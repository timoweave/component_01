import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import type {ContactArray} from './ContactTypes';

const contacts: ContactArray = [
    {
        "id": "ryan",
        "name": "Ryan Florence",
        "email": "ryan@reacttraining.com",
        "avatarURL": "http://localhost:5001/ryan.jpg",
    },
    {
        "id": "michael",
        "name": "Michael Jackson",
        "email": "michael@reacttraining.com",
        "avatarURL": "http://localhost:5001/michael.jpg",
    },
    {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "email": "tyler@reacttraining.com",
        "avatarURL": "http://localhost:5001/tyler.jpg",
    },
];

function index(): void {
    const root: ?HTMLElement = document.querySelector("#root");

    if ((root === null) ||
        (root === undefined) ||
        (root && !(root instanceof HTMLElement))) {
        throw new Error("Expected a 'root' identifier element.");
    }

    ReactDOM.render(<App contacts={contacts}/>, root);
}

index();
