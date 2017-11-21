import React, {Component} from 'react';
import ContactList from './ContactList';
import {getAll, create, remove} from './ContactApi';
import "./App.css";

import type {Element} from 'react';
import type {ContactItem, ContactArray, ContactCall} from './ContactTypes';

export type Props = {
};

export type State =  {
    contacts: ContactArray,
    create: boolean,
};

class App extends Component<Props, State> {
    
    state: State = {
        contacts: [],
        create: false,
    };

    delContact: ContactCall = (contact: ContactItem): void => {
        console.log({delete: contact});
        remove(contact).then(() => this.setState((previous_state) => ({
            contacts: previous_state.contacts.filter((contact_i) => contact_i.id !== contact.id)
        })));
    }

    addContact: ContactCall = (contact: ContactItem): void => {
        console.log({create: contact});
        create(contact).then(() => this.setState((previous_state) => ({
            contacts: [...previous_state.contacts, contact],
        })));
    }
    
    getContacts = (): void => {
        getAll().then((contacts) => this.setState({contacts}));
    }

    componentDidMount(): void {
        this.getContacts();
    }

    render(): Element<'div'> {
        const {contacts} = this.state;
        return (
           <div className="root">
                <ContactList contacts={contacts} add={this.addContact} del={this.delContact}/>
            </div>
        );
    }
}

export default App;



