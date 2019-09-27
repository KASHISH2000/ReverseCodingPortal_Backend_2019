const router = require('express').Router();
const request = require('../models/request');
userpolicy = require('../policies/user');

router.post('/postReq', userpolicy, (req, res) => {
    from = req.body.id
    new request({
        SenderID: from, //from->the one who has logged in currenrtly
        ReceiverID: req.body.to //to->the on to whom req is sent
    }).save().then(() => {
        res.json({ 'Message': 'Request Successfully Sent!' });
    }).catch((err) => {
        res.status(401).json({ err: "Error in sending postReq" })
    });
})

module.exports = router;