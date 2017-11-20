import React, {Component} from 'react';
import Contact from './Contact';
import "./ContactList.css";

import type {Element} from 'react';
import type {ContactItem, ContactArray} from './ContactTypes';

class ContactList extends Component<*, *> {
    props: { contacts: ContactArray, };
    
    state: { query: string, };

    constructor(props: Props) {
        super(props);
        this.state = {query: ""};
    }

    change = (event:*): void => {
        this.setState({query: event.target.value});
    }

    match = (contact: ContactItem): boolean => {
        let {query} = this.state;
        let {name, email} = contact;
        query = query.toLowerCase();
        name = name.toLowerCase();
        email = email.toLowerCase();
        return (name.includes(query) || email.includes(query));
    }

    render(): Element<'div'> {
        const {contacts: origin_contacts} = this.props;
        const {query} = this.state;
        const contacts = origin_contacts.filter(this.match);
        return (
            <div>
                <ol className='contact-list'>
                    <li className='contact-list-item'>
                        <input value={query} placeholder="Search" onChange={this.change} className="contact-list-search"/>
                    </li>
                    {(contacts.length === origin_contacts.length)
                     ? null
                     : <li className="contact-list-item">
                           <p className="contact-list-info">
                               {contacts.length}/{origin_contacts.length} contacts is shown
                           </p>
                       </li>
                    }
                </ol>
                <ol className='contact-list'>
                    {contacts
                     .map((contact: ContactItem, i: number): Element<'li'> => (
                         <li key={contact.id} className='contact-list-item'>
                             <Contact contact={contact}/>
                         </li>
                     ))}
                </ol>
            </div>
        );
    }
}

export type Props = $PropertyType<ContactList, "props">;
export type State = $PropertyType<ContactList, "state">;

export default ContactList;

