const router = require('express').Router();
const member = require('../models/member');

router.get('/showMember', (req, res) => {
    member.find({ TeamID: undefined }, 'name').then((user) => {
        res.json({ "Members are:": user })
    }).catch((e) => {
        res.json({ err: e.message })
    })
});

module.exports = router;
