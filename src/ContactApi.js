import type {ContactItem, ContactArray} from './ContactTypes';

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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json());
}
