import type {ContactItem, ContactArray} from './ContactTypes';
import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

export type Headers = {
    Accept: string,
    Authorization: string,
};

const api: string = 'http://localhost:5001';
const headers: Headers = {
    Accept: 'application/json',
    Authorization: getToken(),
};

function getToken(): string {
    const {localStorage: {token = null} = {}} = window;
    if (token !== null) {
        return token;
    }
    return window.localStorage.token = 'whatever-you-want';
}

export function getAll(): Promise<ContactArray> {
    return fetch(`${api}/contacts`, { headers })
        .then(res => res.json())
        .then(data => data.contacts);
}
    
export function remove(contact: ContactItem): Promise<ContactItem> {
    return fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
        .then(res => res.json())
        .then(data => data.contact);
}

export function create(body: *): Promise<Object> {
    return fetch(`${api}/contacts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(res => res.json());
}

function getImageType(path: string): string  {
    const parts = path.split('.');
    const extension =  parts[parts.length - 1];
    switch (extension) {
    case 'gif': return 'image/gif';
    case 'png': return 'image/png';
    case 'bmp': return 'image/bmp';
    case 'webp': return  'image/webp';
    case 'jpeg': 
    case 'jpg': 
    default:
        return 'image/jpeg';    
    }
}

/*
function getImageTypeAndData(received_data: string): Array<string> {
    const matches = received_data.match(/^data:(.+\/.+);base64,(.*)$/);

    const extension = matches[1];
    const base64_data = matches[2];
    return [extension, base64_data];
}
*/

export function savePhoto(path: string, data: string): Promise<*> {
    const form = new FormData();
    form.append('avatar', path);
    form.append('my_field', 'hello my_field');

    return fetch(`${api}/avatar`, {
        method: 'POST',
        headers: {
            ...headers,
            "Content-Type": 'multipart/form-data',
        },
        body: form,
    }).then(res => {
        console.log({res});
    })
}
