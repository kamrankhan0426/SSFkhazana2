const mongoose = require('mongoose');

const register_newUser = new mongoose.Schema({
    parent_client_Id: {
        type: String,
        required: false,
    },
    client_Id: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    masteraccount :{
        type: String,
        required: false,
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },    
    phone: {
        type: String,
        required: false,
    },
    aadhaar: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    profileimg: {
        type: String,
        required: false,
    },
    accountstatus: {
        type: String,
        required: false,
    },
    createddatetime: {
        type: Date,
        required: false,
    },
});



const Users = mongoose.model('User', register_newUser);

module.exports = { Users  };
