const User = require('../models/User');
const Token = require("../models/Tokens");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {userPasswordReset} = require("../utils/userEmail");

router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const emailSend = userPasswordReset(user._id, token.token);
        await sendEmail(user.email, "Reimposta la tua password", emailSend);

        res.send("Se questa email esiste riceverai a breve una email di reset");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {

        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);

        if (!user) return res.status(400).send("Link non valido o scaduto");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Link non valido o scaduto");
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
        await user.save();
        await token.delete();

        res.send({errorMessage: 'Password reimpostata'});
    } catch (error) {
        res.send({errorMessage: 'Errore: contattare l\'amministratore'});
        console.log(error);
    }
});

module.exports = router;
