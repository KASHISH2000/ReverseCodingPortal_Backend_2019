const router = require('express').Router();
const member = require('../models/member');
const request = require('../models/request');
const userpolicy = require('../policies/user');

router.post('/showMember', userpolicy, (req, res) => {
    var { id } = req.body
    
    member.find({ TeamID: '' }, {name:1,regno:1}).then((user) => {
        request.find({ $or: [{ ReceiverID: id }, { SenderID: id }] }).then((reqs)=>{
            var exists={}
            exists[id]=true
            console.log(reqs)
            reqs.forEach(r=>{
                exists[r.ReceiverID]=true
                exists[r.SenderID]=true
            })
            console.log({...exists})
            user2=user.filter((e)=>!(exists[e._id]))
            res.json({ members: user2 })
        })
    }).catch((e) => {
        res.json({ err: e.message })
    })
});

module.exports = router;
