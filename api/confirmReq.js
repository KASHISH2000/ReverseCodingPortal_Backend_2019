const router = require('express').Router();
const member = require('../models/member');
const request = require('../models/request');
const team = require('../models/team');

router.post('/confirmReq', (req, res) => {
    //from->the one who has logged in currently
    //to->the on to whom req is sent
    request.findOne({ 'ReceiverID': req.body.from }).then((user) => {
        if (user) {
            new team({
                MemberOneID: req.body.to,
                MemberTwoID: req.body.from
            }).save().then((newUser) => {
                member.find({ '_id': req.body.from }).then((userEntry) => {
                    userEntry.teamID = newUser._id
                })
                member.find({ '_id': req.body.to }).then((userEntry) => {
                    userEntry.teamID = newUser._id
                })
            })
        }
        else {
            res.json({ 'ERROR MESSAGE': 'REQUEST NOT FOUND' });
        }

    });
    request.findOneAndDelete({ 'ReceiverID': req.body.from }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        else {
            return
        }
    });
})

module.exports = router;