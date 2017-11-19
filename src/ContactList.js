import React, {Component} from 'react';
import Contact from './Contact';
import "./ContactList.css";

import type {Node, Element} from 'react';
import type {ContactData} from './Contact';

export type ContactArray = Array<ContactData>;

export type Props = {
    contacts: ContactArray,
};

export type State = {
    query: string,
};

class ContactList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {query: ""};
    }

    change = (event:*): void => {
        this.setState({query: event.target.value});
    }

    match = (contact: ContactData): boolean => {
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
                     .map((contact: ContactData, i: number): Element<'li'> => (
                         <li key={contact && contact.id || i} className='contact-list-item'>
                             <Contact contact={contact}/>
                         </li>
                     ))}
                </ol>
            </div>
        );
    }
}

export default ContactList;
