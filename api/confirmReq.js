const router = require('express').Router();
const member = require('../models/member');
const request = require('../models/request');
const team = require('../models/team');
var ObjectID = require('mongodb').ObjectID;

router.post('/confirmReq', (req, res) => {
    //from->the one who has logged in currently
    //to->the on to whom req is sent
    request.findOne({ 'ReceiverID': req.body.from }).then((user) => {
        if (user) {
            new team({
                MemberOneID: req.body.to,
                MemberTwoID: req.body.from
            }).save().then((newUser) => {
                member.update({ _id: { $in: ['req.body.from', 'req.body.to'] } }, {
                    $set: {
                        TeamID: newUser._id
                    }
                }, { multi: true }).then(() => {
                    res.json({ "Message": "kkkkkkkkkkkkkkkkkk" })
                })
            })
        } else {
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
