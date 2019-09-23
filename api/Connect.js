const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const member = require('../models/member');
const rp = require('request-promise');
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

reqpost = function (req) {
    return new Promise((resolve, reject) => {

        var options = {
            method: 'POST',
            uri: `https://login-authentication-app.herokuapp.com/getinfo`,
            body: {
                'state': req.state,
                'id': req._id
            },
            json: true
        };

        rp(options)
            .then(function (data) {
                // console.log('--------', data)
                resolve(data)
            })
            .catch(function (err) {
                console.log('Error in CONNECT route!!!!', err);
                reject(err)
            });
    })

}
router.all('/Connect', (req, res) => {
    var dtoken = DecodeToken(req.body.token);
    console.log("dtoken._id", dtoken._id, dtoken.state)
    member.findOne({ _id: dtoken._id }).then((newUser) => {
        if (newUser) {
            console.log(1111111111111111111111)
            console.log("Member schema user", newUser)
            // if (newUser.TeamID != '') {
            //     res.json({ 'key': false });
            // }
            // else {
            //     res.json({ 'key': true });
            // }
        }
        // else {
        //     reqpost(dtoken).then(data=>{
        //         new member({
        //             name: data.name,
        //             regno: data.regno,
        //             phone: data.phno,
        //             email: data.email,
        //             _id: new ObjectID(dtoken._id)
        //         }).save().then((newUser) => {
        //             if (newUser.TeamID != '') {
        //                 res.json({ 'key': false });
        //             }
        //             else {
        //                 res.json({ 'key': true });
        //             }
        //         })
        //     })
        // }

    }).catch((e) => {
        res.send('Error');
    })
})
module.exports = router;