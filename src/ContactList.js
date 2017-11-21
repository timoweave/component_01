import React, {Component} from 'react';
import Contact from './Contact';
import ContactAdd from './ContactAdd';
import sortBy from 'sort-by';
import EscRegExp from 'escape-string-regexp';
import defaultContactItem from './ContactTypes';
import "./ContactList.css";

import type {Element} from 'react';
import type {ContactItem, ContactArray, ContactCall} from './ContactTypes';

export type Props = {
    contacts: ContactArray,
    add: ContactCall,
    del: ContactCall,
};

export type State = {
    query: string,
    add: boolean,
    contact: ContactItem,
};

class ContactList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {query: "", add: false, contact: defaultContactItem};
    }

    look = (event:*): void => {
        this.setState({query: event.target.value.trim()});
    }

    match = (contact: ContactItem): boolean => {
        let {query} = this.state;
        let {name, email} = contact;
        console.log({contact});
        query = query.toLowerCase();
        name = name.toLowerCase();
        email = email.toLowerCase();
        return (name.includes(query) || email.includes(query));
    }

    search = (query: string) => {
        const pattern = new EscRegExp(query);
        return (contact: ContactItem): boolean =>
            pattern.test(contact.name);
    }

    toggle = (): void => {
        this.setState((previous) => ({...previous, add: !previous.add}));
    }

    fill = (contact: ContactItem): void => {
        this.setState({...this.state, contact: contact});
    }

    clear = (): void => {
        this.setState({contact: defaultContactItem});
    }

    submit = (): void => {
        const {contact} = this.state;
        const {name, email} = contact;
        const validated = (name && name.length && email && email.length);
        if (validated) {
            this.props.add(contact);
            this.clear();
        }
        this.toggle();
    }

    render(): Element<'div'> {
        const {contacts: origin_contacts} = this.props;
        const {add, query, contact} = this.state;
        const contacts = origin_contacts.filter(this.match)
        return (
            <div className='contact-list-root'>
                <div className='contact-list-top'>
                    <input value={query} placeholder="Search"
                           onChange={this.look} className="search-contacts"/>
                    <button onClick={this.toggle} className="add-contact"/>
                </div>
                <div className='contact-list-middle'>
                    {(contacts.length === origin_contacts.length)
                     ? null
                     : `${contacts.length}/${origin_contacts.length} contacts is shown`
                    }
                    {add === false
                     ? null
                     : <ContactAdd contact={contact} fill={this.fill}
                                   submit={this.submit}/>}
                </div>
                <ol className='contact-list'>
                    {contacts
                     .sort(sortBy('name'))
                     .map((contact: ContactItem, i: number): Element<'li'> => (
                         <li key={contact.id} className='contact-list-item'>
                             <Contact contact={contact} del={this.props.del}/>
                         </li>
                     ))}
                </ol>
            </div>
        );
    }
}

export default ContactList;
