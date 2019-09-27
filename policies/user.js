const jwt = require("jsonwebtoken");


DecodeToken = function (token) {
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
    }
}
module.exports = (req, res, next) => {
    dtoken = DecodeToken(req.headers.token)
    req.body.id = dtoken._id;
    req.body.token = req.headers.token
    next();
}

