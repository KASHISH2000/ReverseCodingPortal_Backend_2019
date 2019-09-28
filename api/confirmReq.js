const router = require('express').Router();
const member = require('../models/member');
const request = require('../models/request');
const team = require('../models/team');
userpolicy = require('../policies/user');
//from->the one who has logged in currently
//to->the on to whom req is sent

router.post('/confirmReq', userpolicy, (req, res) => {
    if (!req.body.to) return res.status(401).json({ err: 'RequestId not found' })
    from = req.body.id
    // console.log("from", from)
    // console.log("to", req.body.to)
    console.log({ 'ReceiverID': from, 'SenderID': req.body.to })
    request.findOne({ 'ReceiverID': from, 'SenderID': req.body.to }).then((user) => {
        if (user) {
            console.log('Creating new Team')
            new team({
                MemberOneID: req.body.to,
                MemberTwoID: from
            }).save().then((newUser) => {
                member.update({ _id: { $in: [from, req.body.to] } }, {
                    $set: {
                        TeamID: newUser._id
                    }
                }, { multi: true }).then(() => {
                    res.json({ "Message": "Congratulations! Team Formed." })
                })
            })
            request.deleteMany({
                $or: [
                    { 'ReceiverID': req.body.to },
                    { 'SenderID': req.body.to },
                    { 'ReceiverID': from },
                    { 'SenderID': from },
                ]
            })
        } else {
            res.status(401).json({ "err": 'REQUEST NOT FOUND' });
        }
    });

})

module.exports = router;
