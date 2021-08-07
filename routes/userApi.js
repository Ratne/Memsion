const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



//Joy validate
const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().email()
})
const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})


router.post('/register', async (req, res) => {
    const obj = req.body;
    const isOk = schema.validate(obj)

    const emailExist = await User.findOne({
        email: obj.email
    });
    if (emailExist) return res.status(400).send('Email exist');
    const salt = await bcrypt.genSalt(10);
    const randomPassword =Array(10).fill("!$%&=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');;
    const hashPassword = await bcrypt.hash(randomPassword, salt);
    console.log(randomPassword);
    if (isOk.error) return  res.status(400).send(isOk.error.details[0].message);
    const user = new User({
        name: obj.name,
        surname: obj.surname,
        email: obj.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    }
    catch (err){

        res.status(400).send(err);
    }
});

router.post('/login' , async (req,res) =>{
    const obj = req.body
    const isOk = loginSchema.validate(obj)
    if (isOk.error) return res.status(400).send(isOk.error.details[0].message);
    const user = await User.findOne({
        email: obj.email
    });
    if (!user) return res.status(400).send({errorMessage: 'Email or password wrong'});
    const validPass = await bcrypt.compare(obj.password, user.password);
    if (!validPass) return res.status(400).send({errorMessage: 'Email or password wrong'});

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({errorMessage: 'Login effettuato'});
});


module.exports = router;