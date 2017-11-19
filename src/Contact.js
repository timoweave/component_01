import React, {Component} from 'react';
import type {Element} from 'react';
import './Contact.css';

export type ContactData = {
    id: string,
    name: string,
    email: string,
    avatarURL: string,
};

export type Props = {
    contact: ContactData,
};

export type State = {
};

class Contact extends Component<Props, State> {
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

export default Contact;




