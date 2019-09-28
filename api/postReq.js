const router = require('express').Router();
const Request = require('../models/request');
const Member = require('../models/member');
userpolicy = require('../policies/user');

router.post('/postReq', userpolicy, (req, res) => {
    if (!req.body.id || !req.body.to) return res.status(401).json({ err: 'Bad Request' })
    var request = {
        SenderID: req.body.id, //from->the one who has logged in currenrtly
        ReceiverID: req.body.to //to->the on to whom req is sent
    }
    Member.findOne({ _id: { $in: [req.body.id, req.body.to] }, TeamID: { $ne: '' } }).then(u => {
        if (u) return res.status(401).json({ err: 'Request not allowed' })
        Request.findOne(request).then(user => {
            if (user) return res.status(401).json({ err: 'Request already sent' })

            new Request(request).save().then(() => {
                res.json({ 'message': 'Request Successfully Sent!' });
            })
        })
    }).catch((err) => {
        console.log(err.message)
        res.status(401).json({ err: "Error in finding at postReq" })
    });
})

module.exports = router;