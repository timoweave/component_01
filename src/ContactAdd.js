import React, {Component} from 'react';
import type {Element} from 'react';
import type {ContactItem, ContactCall} from './ContactTypes';
import {savePhoto} from './ContactApi';
import './ContactAdd.css';

export type Props = {
    contact: ContactItem,
    fill: ContactCall,
    submit: ContactCall,
};

export type State = {
    selectAvatarURL:  string,
    defaultAvatarURL:  string,
};

class ContactAdd extends Component<Props, State> {
    state = {
        defaultAvatarURL: "http://localhost:5001/profile_photo.jpg",
        selectAvatarURL: "",
    };
    
    changeName = (event: SyntheticInputEvent<HTMLInputElement>): void => {
        this.props.fill({...this.props.contact, name: event.target.value});
    }

    changeEmail = (event: SyntheticInputEvent<HTMLInputElement>): void => {
        this.props.fill({...this.props.contact, email: event.target.value});
    };

    changeImage = async (event: SyntheticInputEvent<HTMLInputElement>): Promise<*> => {
        const file = event.target.files[0]
        if (file === null || file === undefined || !file.type.match(/^image\//)) {
            this.props.fill({...this.props.contact, avatarURL: ''});
            return Promise.resolve(false);
        } 
        const dataURL = await this.readImageAsDataURL(file);
        this.setState({selectAvatarURL: dataURL, });
        this.props.fill({...this.props.contact, avatarURL: `http://localhost:5001/${file.name}`});
        savePhoto(file.name, dataURL);
        return Promise.resolve(true);
    };
    
    readImageAsDataURL = async (file: *): Promise<*> => {
        const answer = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                resolve(event.target.result)
            }
            reader.readAsDataURL(file)
        });
        return answer;
    };

    render(): Element<'div'> {
        const {contact} = this.props;
        const {id, name, email, avatarURL} = contact;
        const {selectAvatarURL, defaultAvatarURL} = this.state;
        const displayAvatarURL = avatarURL || selectAvatarURL || defaultAvatarURL;
        const styles = {backgroundImage: `url(${displayAvatarURL})`};
        return (
            <div className='contact contact-add'>
                <div className='contact-avatar contact-avatar-add' style={styles}>
                    <input type="file" className="contact-avatar-input"
                           onChange={this.changeImage} accept=".jpg, .jpeg, .png, .gif"/>
                </div>
                <div className='contact-details contact-details-add'>
                    <input placeholder="Full Name" value={name}
                           onChange={this.changeName}/>
                    <input placeholder="Email Address"  value={email}
                           onChange={this.changeEmail}/>
                </div>
                <button className='contact-action contact-action-plus' onClick={this.props.submit}>
                   add
                </button>
            </div>
        );
    }
}

export default ContactAdd;
