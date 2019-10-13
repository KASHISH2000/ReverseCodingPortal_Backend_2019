const express = require('express');
const bodyParser = require('body-parser');
const Connect = require('./api/Connect');
const showMember = require('./api/showMember');
const postReq = require('./api/postReq');
const confirmReq = require('./api/confirmReq');
const dashboard = require('./api/dashboard');
const requestList = require('./api/requestList');
const connect = require('./api/rounds/connect');
const mongoose = require('./db/mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next()
})

app.use('', Connect);
app.use('', showMember);
app.use('', postReq);
app.use('', confirmReq);
app.use('', dashboard);
app.use('', requestList);
app.use('', connect);
app.listen(port, () => {
    console.log(`Server is up at ${port}`);

});

