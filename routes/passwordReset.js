const User = require('../models/User');
const Token = require("../models/Tokens");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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

        const emailSend = `
                            <h2>Resetta la tua password</h2>
                            <p>Ciao da Davide</p>
                            <p>Abbiamo ricevuto una richiesta per recuperare la tua password</p>
                            <p>Se sei stato te ti basterà seguire questo link qui sotto</p>
                            <p>Altrimenti ti basterà ignorare questa email</p>
                            <p>Per resettare la tua password segui questo link:
                            ${process.env.BASE_URL}/api/password-reset/${user._id}/${token.token}</p>
                         `;
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

        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;