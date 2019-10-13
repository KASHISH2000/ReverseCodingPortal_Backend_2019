const mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    TeamID: {
        type: String
    },
    points: [{
        quesID: { type: Number }
    }]
})

const score = mongoose.model('score', memberSchema);
module.exports = member;