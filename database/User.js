const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({    
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String,
    },
    password: {
        type: String
    },
}, {
    colletion: 'User'
});

module.exports = mongoose.model('User', User);