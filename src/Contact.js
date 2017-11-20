import React, {Component} from 'react';
import './Contact.css';

import type {Element} from 'react';
import type {ContactItem} from './ContactTypes'

export class Contact extends Component<*, *> {
    props: { contact: ContactItem, };
    
    state: {| |};

    render(): Element<'div'> {
        const {contact: {name, email, avatarURL}} = this.props;
        const styles = {backgroundImage: `url(${avatarURL})`};
        return (
            <div className='contact'>
                <div className='contact-avatar' style={styles}/>
                <div className='contact-details'>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <button className='contact-remove'>Remove</button>
            </div>
        );
    }
}

export type Props = $PropertyType<Contact, "props">;
export type State = $PropertyType<Contact, "state">;

export default Contact;


