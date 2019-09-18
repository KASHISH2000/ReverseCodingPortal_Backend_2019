const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const member = require('../models/member');
var ObjectID = require('mongodb').ObjectID;


DecodeToken = function (token) {
    try {
        console.log('Decoded token:', token)
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
    }
}

router.post('/Connect', (req, res) => {
    var dtoken = DecodeToken(req.body.token);
    member.findById(dtoken._id).then((newUser) => {
        if (newUser) {
            if (newUser.TeamID != '') {
                res.json({ 'key': false });
            }
            else {
                res.json({ 'key': true });
            }
        }
        else {
            new member({
                name: currentUser.name,
                regno: currentUser.regno,
                phone: currentUser.phone,
                email: currentUser.email,
                _id: new ObjectID(dtoken._id)
            }).save().then((newUser) => {
                if (newUser.TeamID != '') {
                    res.json({ 'key': false });
                }
                else {
                    res.json({ 'key': true });
                }
            })
        }

    })




})
module.exports = router;