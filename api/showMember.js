const router = require('express').Router();
const member = require('../models/member');

router.get('/showMember', (req, res) => {
    member.find().then((user) => {
        if (!user.TeamID) {
            res.json({ 'name': user.name, '_id': user._id });

        }
    }).catch((e) => {
        res.json({ err: e.message })
    })
});

module.exports = router;
