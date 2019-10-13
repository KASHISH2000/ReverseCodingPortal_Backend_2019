const mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    testinput: {
        type: String
    },
    testoutput: {
        type: String
    },
    exe: {
        type: String
    },
    obj: {
        type: String
    },
    points: {
        type: Number
    },
    input: {
        type: String
    },
    output: {
        type: String
    }
})

const question = mongoose.model('question', memberSchema);
module.exports = member;