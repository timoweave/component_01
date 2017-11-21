import React, {Component} from 'react';
import './Contact.css';

import type {Element} from 'react';
import type {ContactItem, ContactCall} from './ContactTypes'

export type Props = {
    contact: ContactItem,
    del: ContactCall,
};

export type State = {|
|};

export class Contact extends Component<Props, State> {
    render(): Element<'div'> {
        const {contact} = this.props;
        const {name, email, avatarURL} = contact;
        const {del} = this.props;
        const styles = {backgroundImage: `url(${avatarURL})`};
        return (
            <div className='contact'>
                <div className='contact-avatar' style={styles}/>
                <div className='contact-details'>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <button className='contact-action' onClick={() => del(contact)}>
                    Remove
                </button>
            </div>
        );
    }
}

export default Contact;


