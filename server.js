const express = require('express');
const bodyParser = require('body-parser');
const Connect = require('./api/Connect');
const showMember = require('./api/showMember');
const postReq = require('./api/postReq');
const confirmReq = require('./api/confirmReq');
var { mongoose } = require('./db/mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', Connect);
app.use('', showMember);
app.use('', postReq);
app.use('', confirmReq);

//require('./api')(app, {});
app.listen(port, () => {
    console.log(`Server is up at ${port}`);

});

