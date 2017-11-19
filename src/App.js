import React, {Component} from 'react';
import ContactList from './ContactList';
import "./App.css";

import type {Element} from 'react';
import type {ContactArray} from './ContactList';

export type Props = {
    contacts: ContactArray,
};

export type State = {
};

class App extends Component<Props, State> {
    render(): Element<'div'> {
        const {contacts} = this.props;
        return (
            <div className="root">
                <ContactList contacts={contacts}/>
            </div>
        );
    }
}

export default App;
