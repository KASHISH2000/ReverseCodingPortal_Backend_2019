const mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    //From
    SenderID: {
        type: String
    },
    //TO
    ReceiverID: {
        type: String
    }
});

const request = mongoose.model('request', requestSchema);
module.exports = request;