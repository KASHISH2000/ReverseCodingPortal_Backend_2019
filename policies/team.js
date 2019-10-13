const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    generate = function (user) {
        var data = {
            TeamID: user.TeamID.toHexString()
        }
        var token = jwt.sign(data, process.env.JWT_SECRET).toString();
        return token;
    }
    try {
        decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
        member.findOne({ _id: decoded._id }).then((user) => {
            var tkon = generate(user)
            try {
                decode = jwt.verify(tkon, process.env.JWT_SECRET);
            } catch (e) {
                console.log(e.message)
                console.log('Error decoding token');
                res.status(401).json({ err: e.message })
            }
            req.body.TeamID = decode.TeamID
        })

        next();
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
        res.status(401).json({ err: e.message })
    }


}

