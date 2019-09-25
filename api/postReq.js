const router = require('express').Router();
const request = require('../models/request');

router.post('/postReq', (req, res) => {
    new request({
        SenderID: req.body.from, //from->the one who has logged in currenrtly
        ReceiverID: req.body.to //to->the on to whom req is sent
    }).save().then(() => {
        res.json({ 'Message': 'Request Successfully Sent!' });
    });
})

module.exports = router;