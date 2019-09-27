const router = require('express').Router();
const member = require('../models/member');
userpolicy = require('../policies/user');

router.get('/dashboard', userpolicy, (req, res) => {
    id = req.body.id
    member.findOne({ '_id': id }).then((user) => {
        if (user) {
            teamid = user.TeamID;
            member.find({ 'TeamID': teamid }).then((user) => {
                if (user) {
                    res.json({ 'Team Details': user })
                } else {
                    res.status(401).json({ err: 'User not Found.' })
                }
            })
        } else {
            res.status(401).json({ err: 'User not Found.' })
        }
    })

})



module.exports = router;