import React, {Component} from 'react';
import type {Element} from 'react';
import type {ContactItem, ContactCall} from './ContactTypes';
import './ContactAdd.css';

export type Props = {
    contact: ContactItem,
    fill: ContactCall,
    submit: ContactCall,
};

export type State = {
};

class ContactAdd extends Component<Props, State> {
    render(): Element<'div'> {
        const {contact, fill} = this.props;
        const {id, name, email, avatarURL,} = contact;
        const emptyAvatarURL = 'http://localhost:5001/profile_photo.jpg';
        const styles = {backgroundImage: `url(${emptyAvatarURL})`};
        return (
            <div className='contact contact-add'>
                <div className='contact-avatar contact-avatar-add' style={styles}>
                </div>
                <div className='contact-details contact-details-add'>
                    <p><input placeholder="Full Name" value={name}
                              onChange={(event) => fill({...contact, name: event.target.value})}/></p>
                    <p><input placeholder="Email Address"  value={email}
                              onChange={(event) => fill({...contact, email: event.target.value})}/></p>
                    <p><input placeholder="Avatar Image"  value={avatarURL}
                              onChange={(event) => fill({...contact, avatarURL: event.target.value})}/></p>
                </div>
                <button className='contact-action contact-action-plus' onClick={this.props.submit}>
                   add
                </button>
            </div>
        );
    }
}

export default ContactAdd;
