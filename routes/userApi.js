const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
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


        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: obj.email,
            subject: "Benvenuto a bordo",
            text: "Benvenuto in piattaforma",
            html: ` <div align="center"><img alt="logo" width="30%" src="${process.env.PATH_LOGO}" /></div>
                    <h2>Benvenuto nella piattaforma dei corsi</h2>
                    <p>Ciao ${obj.name} da Davide</p>
                    <p>In questa piattaforma potrai visualizzare tutti i corsi
                    ai quali hai avuto accesso o hai acquistato</p>
                    <p>Per poter procedere al login ti inserisco qui sotto username e password</p>
                    <p>La tua username è: ${obj.email}</p>
                    <p>La tua password è: ${randomPassword}</p> 
                    <p>Puoi procedere all'accesso dalla seguente url ${process.env.URL_PIATTAFORMA}</p>
                    `,
        });

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