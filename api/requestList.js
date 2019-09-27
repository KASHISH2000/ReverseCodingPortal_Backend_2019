const router = require('express').Router();
const request = require('../models/request');
const member = require('../models/member');
userpolicy = require('../policies/user');

router.get('/requestList', userpolicy, (req, res) => {
    id = req.body.id
    request.find({ 'ReceiverID': id }).then((user) => {
        //res.json({ 'user': user.SenderID });
        member.find({ '_id': user.SenderID }).then((user) => {
            res.json({ 'user': user });
            //     res.json({ 'Details of Requests received': user.name });
        }).catch((err) => {
            res.status(401).json({ err: "" })
        })
    })
})

module.exports = router;