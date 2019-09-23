const mongoose = require('mongoose');
const validator = require('validator');
var ObjectID = require('mongodb').ObjectID;


var memberSchema = new mongoose.Schema({
    _id: {
        type: ObjectID
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
        type: String
    }
});

const member = mongoose.model('member', memberSchema);
module.exports = member;