const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const member = require('../models/member');
const rp = require('request-promise');
var ObjectID = require('mongodb').ObjectID;
userpolicy = require('../policies/user');


reqpost = function (token) {
    return new Promise((resolve, reject) => {

        var options = {
            method: 'POST',
            uri: `https://login-authentication-app.herokuapp.com/getinfo`,
            body: {
                'id': token
            },
            json: true
        };

        rp(options)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (err) {
                console.log('Error in Connect route!!!!', err);
                reject(err)
            });
    })

}

router.all('/Connect', userpolicy, (req, res) => {
    id = req.body.id
    member.findOne({ '_id':id }).then((user) => {
        if (user) {
            if (user.TeamID != '') {
                res.json({ 'key': false });
            }
            else {
                res.json({ 'key': true });
            }
        } else {
            reqpost(req.body.token).then((data) => {
                console.log(data)
                new member({
                    name: data.name,
                    regno: data.regno,
                    phno: data.phno,
                    email: data.email,
                    picture:data.picture,
                    _id: new ObjectID(id)
                }).save().then((newUser) => {
                    if (newUser.TeamID != '') {
                        res.json({ 'key': false });
                    }
                    else {
                        res.json({ 'key': true });
                    }
                })
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router;