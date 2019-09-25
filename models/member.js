const mongoose = require('mongoose');
const validator = require('validator');



var memberSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    regno: {
        type: String,
        required: true,
        unique: true
    },
    phno: {
        type: String,
        required: true,
        unique: true,
        default: 'undefined'
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is invalid email'
        }
    },
    TeamID: {
        type: String,
        default: ''
    }
});

const member = mongoose.model('member', memberSchema);
module.exports = member;