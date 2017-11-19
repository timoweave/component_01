import React, {Component} from 'react';
import ContactList from './ContactList';
import "./App.css";

import type {Element} from 'react';
import type {ContactArray} from './ContactTypes';

class App extends Component<*, *> {
    props: { contacts: ContactArray, };
    state: { };

    render(): Element<'div'> {
        const {contacts} = this.props;
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



