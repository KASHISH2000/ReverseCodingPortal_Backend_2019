const router = require('express').Router();
const request = require('../models/request');
const member = require('../models/member');
userpolicy = require('../policies/user');

router.post('/requestList', userpolicy, async (req, res) => {
    id = req.body.id
    request.find({ 'ReceiverID': id }).then(async (users) => {
        console.log(users)
        requests = []
        for (let i = 0; i < users.length; i++) {
            try {
                user = await member.findOne({ '_id': users[i].SenderID, "TeamID": "" }, { name: 1, regno: 1 })
                if (user) requests.push(user)
            } catch (err) {
                return res.status(401).json({ err: err.message })
            }
        }
        res.json({ 'user': requests });
    })
})

module.exports = router;