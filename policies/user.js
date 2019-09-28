const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        decoded = jwt.verify(req.body.token , process.env.JWT_SECRET);
        req.body.id = decoded._id;
        next();
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
        res.status(401).json({err:e.message})
    }

}

