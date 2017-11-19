const fetch = require('isomorphic-fetch');
const url = 'http://localhost:5001/contacts';

fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
    .then((data) => {
        console.log({data});
    });

