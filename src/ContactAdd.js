import React, {Component} from 'react';
import axios from 'axios';
import {savePhoto} from './ContactApi';
import {defaultContactItem} from './ContactTypes';
import './ContactAdd.css';

import type {Element} from 'react';
import type {ContactItem, ContactCall} from './ContactTypes';

export type Props = {
    contact: ContactItem,
    fill: ContactCall,
    submit: ContactCall,
};

export type State = {
    file: ?File,
    file_reader: ?FileReader,
    selectAvatarURL:  string,
    defaultAvatarURL:  string,
};

class ContactAdd extends Component<Props, State> {
    state = {
        file: null,
        file_reader: null,
        selectAvatarURL: "",
        defaultAvatarURL: "http://localhost:5001/profile_photo.jpg",
    };

    fillName = (event: SyntheticInputEvent<HTMLInputElement>): void => {
        this.props.fill({...this.props.contact, name: event.target.value});
    }

    fillEmail = (event: SyntheticInputEvent<HTMLInputElement>): void => {
        this.props.fill({...this.props.contact, email: event.target.value});
    };

    fillAvatar = (address: string): void => {
        this.props.fill({...this.props.contact, avatarURL: address});
    };

    changeImage = async (event: SyntheticInputEvent<HTMLInputElement>): Promise<*> => {
        const {files} = event.target;
        if (files === null || files === undefined || files.length === 0) {
            return;
        }
        const [file] = files;
        if (file === null || file === undefined || !file.type.match(/^image\//)) {
            return;
        }
        const file_reader = new FileReader();
        file_reader.onload = this.showImage(file, file_reader);
        file_reader.readAsDataURL(file);
    };

    showImage = (file: *, file_reader: FileReader) => (loaded: *): void => {
        this.fillAvatar(this.avatarURL(file.name));
        this.setState({selectAvatarURL: file_reader.result, file, file_reader});
    }

    saveImage = (): Promise<*> => {
        const {file, file_reader} = this.state;
        const form = new FormData();
        form.append('avatar', file);
        return axios({
            url: this.avatarURL('uploads'),
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'whatever-you-want',
            },
            data: form,
        }).then((response) => {
            const saved_avatar_url = this.avatarURL(file.name);
            const contact = {...this.props.contact, avatarURL: saved_avatar_url}
            console.log({response, contact, file, avatar_url: file_reader.result});
            this.fillAvatar(saved_avatar_url);
        }).catch((error) => {
            console.log({error});
        });
    };

    submit = (event): void => {
        this.saveImage().then(() => {
            console.log({saved_contact: this.props.contact});
            this.props.submit(event);
            this.props.fill(defaultContactItem);
        })
    };

    avatarURL = (name: string): string => `http://localhost:5001/${name}`;

    render(): Element<'div'> {
        const {contact} = this.props;
        const {id, name, email, avatarURL} = contact;
        const {selectAvatarURL, defaultAvatarURL} = this.state;
        const displayAvatarURL = selectAvatarURL || avatarURL || defaultAvatarURL;
        console.log({selectAvatarURL, defaultAvatarURL, displayAvatarURL, avatarURL});
        const styles = {backgroundImage: `url(${displayAvatarURL})`};
        return (
            <div className='contact contact-add'>
                <div className='contact-avatar contact-avatar-add' style={styles}>
                    <input type="file" className="contact-avatar-input"
                           onChange={this.changeImage} accept=".jpg, .jpeg, .png, .gif"/>
                </div>
                <div className='contact-details contact-details-add'>
                    <input placeholder="Full Name" value={name}
                           onChange={this.fillName}/>
                    <input placeholder="Email Address"  value={email}
                           onChange={this.fillEmail}/>
                </div>
                <button className='contact-action contact-action-plus' onClick={this.submit}>
                   add
                </button>
            </div>
        );
    }
}

export default ContactAdd;
