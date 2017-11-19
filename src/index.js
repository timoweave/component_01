import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import type {ContactArray} from './ContactList';

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

function index() {
    const root = (document.querySelector("#root"): ?HTMLElement);
    
    if ((root === null) ||
        (root === undefined) ||
        (root && !(root instanceof HTMLElement))) {
        console.log({root, type: typeof root});
        throw new Error("Expected a 'root' identifier element.");
    } else {
        console.log({contacts});
        ReactDOM.render(<App contacts={contacts}/>, root);
    }
}

index();
