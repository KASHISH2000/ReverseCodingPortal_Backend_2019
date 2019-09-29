const router = require('express').Router();
const member = require('../models/member');
const Team = require('../models/team')
userpolicy = require('../policies/user');

router.post('/me', userpolicy, (req, res) => {
    member.findOne({ _id: req.body.id}).then((user) => {
        res.json(user);
    }).catch((e)=>{
        res.status(401).json({err:e.message})
    })
})
router.post('/dashboard', userpolicy, (req, res) => {
    id = req.body.id
    Team.findOne({ $or: [{ MemberOneID: id }, { MemberTwoID: id }] }).then((team) => {

        if (team) {
            member.find({ _id: { $in: [team.MemberOneID, team.MemberTwoID] } }).then((user) => {
                if (user) {
                    res.json({ 'Team': user })
                } else {
                    res.status(401).json({ err: 'User not Found.' })
                }
            })
        } else {
            res.status(401).json({ err: 'Team not Found.' })
        }
    })

})



module.exports = router;