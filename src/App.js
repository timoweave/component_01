import React, {Component} from 'react';
import ContactList from './ContactList';
import {getAll} from './ContactApi';
import "./App.css";

import type {Element} from 'react';
import type {ContactArray} from './ContactTypes';

class App extends Component<*, *> {
    props: { };
    
    state: {
        contacts: ContactArray,
    } = {
        contacts: [],
    };

    componentDidMount(): void {
        getAll().then((contact_array) => {
            this.setState({
                contacts: contact_array,
            });
        })
    }
    
    render(): Element<'div'> {
        const {contacts} = this.state;
        return (
            <div className="root">
                <ContactList contacts={contacts}/>
            </div>
        );
    }
}

export type Props = $PropertyType<App, "props">;
export type State = $PropertyType<App, "state">;

export default App;



