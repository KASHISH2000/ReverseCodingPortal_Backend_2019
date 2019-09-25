const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const member = require('../models/member');
const rp = require('request-promise');
var ObjectID = require('mongodb').ObjectID;

DecodeToken = function (token) {
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
    }
}

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

router.all('/Connect', (req, res) => {
    var dtoken = DecodeToken(req.body.token);
    member.findOne({ '_id': dtoken._id }).then((user) => {
        if (user) {
            if (user.TeamID != '') {
                res.json({ 'key': false });
            }
            else {
                res.json({ 'key': true });
            }
        } else {
            reqpost(req.body.token).then((data) => {
                new member({
                    name: data.name,
                    regno: data.regno,
                    phno: data.phno,
                    email: data.email,
                    _id: new ObjectID(dtoken._id)
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