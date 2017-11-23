
export type ContactItem = {
    id: string,
    name: string,
    email: string,
    avatarURL: string,
};

const defaultContactItem: ContactItem = {
    id: "",
    name: "",
    email: "",
    avatarURL: "",
}

export type ContactArray = Array<ContactItem>;

export type ContactCall = (contact: ContactItem) => void;

module.exports = {
    defaultContactItem,
};
