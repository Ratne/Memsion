const jwt = require('jsonwebtoken');
const User = require("../models/User");


module.exports = function(req,res,next){
    const token = req.header('token');
    if(!token) return res.status(401).send('access denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        User.findOne({
            _id: verified._id
        }, {isAdmin: 1, name: 1,tags: 1}).then(res => {
            req.user = res
            console.log(res)
            next()
        });
    }catch (err){
        res.status(401).send('Invalid token')
    }
}
