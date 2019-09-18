const mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    MemberOneID: {
        type: String
    },
    MemberTwoID: {
        type: String
    }
});

const team = mongoose.model('team', teamSchema);
module.exports = team;