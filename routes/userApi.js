const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");
const Joi = require('joi');
const axios = require("axios");
const myCache = require("../myCache");
const Course = require("../models/Course");
const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string(),
    email: Joi.string().required().email(),
    contactId: Joi.string().required(),
})
const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})

const customField = (userId,userObjectId,userKey) =>{
    axios.get('https://api.infusionsoft.com/crm/rest/v1/contacts/model', {
        headers: {
            Accept: 'application/json, */*',
            Host: 'api.infusionsoft.com',
            Authorization: `Bearer ${myCache.get('tokens').accessToken}`
        }
    }).then(res =>{
        const fields = res.data.custom_fields.filter(ele =>{
         return   ele.field_name === myCache.get('customId') || ele.field_name === myCache.get('customKey')
        })
        if (fields.length === 2){
            const body = {
                "custom_fields": [
                    {
                        "id": fields.find(ele => ele.field_name === myCache.get('customId')).id,
                        "content": userObjectId.toString()
                    },
                    {
                        "id": fields.find(ele => ele.field_name === myCache.get('customKey')).id,
                        "content": userKey.toString()
                    }
                ]
            }
            axios.patch(`https://api.infusionsoft.com/crm/rest/v1/contacts/${userId}`, body,{
                headers: {
                    Accept: 'application/json, */*',
                    Host: 'api.infusionsoft.com',
                    Authorization: `Bearer ${myCache.get('tokens').accessToken}`
                },
            }).then(res => {
                console.log(res)
            })
        }
        else {
            console.log('errore')
        }// error message

    })
}




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
    if (isOk.error) return  res.status(400).send(isOk.error.details[0].message);
    const user = new User({
        name: obj.name,
        surname: obj.surname,
        email: obj.email,
        password: hashPassword,
        infusionsoftId: obj.contactId
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});

        if (myCache.get('customId') && myCache.get('customKey')){
            customField(savedUser.infusionsoftId, savedUser._id, savedUser.userKey)
        }



        // send email
        const emailSend = `
                    <div align="center"><img alt="logo" width="30%" src="${process.env.PATH_LOGO}" /></div>
                    <h2>Benvenuto nella piattaforma dei corsi</h2>
                    <p>Ciao ${obj.name} da Davide</p>
                    <p>In questa piattaforma potrai visualizzare tutti i corsi
                    ai quali hai avuto accesso o hai acquistato</p>
                    <p>Per poter procedere al login ti inserisco qui sotto username e password</p>
                    <p>La tua username è: ${obj.email}</p>
                    <p>La tua password è: ${randomPassword}</p> 
                    <p>Puoi procedere all'accesso dalla seguente url ${process.env.URL_PIATTAFORMA}</p>
                         `;
        await sendEmail(user.email, "Benvenuto a bordo", emailSend);

    }
    catch (err){

        res.status(400).send(err);
    }
});

const retrieveId = (userId) =>{
    axios.get('https://api.infusionsoft.com/crm/rest/v1/contacts/'+userId+'/tags', {
        headers: {
            Accept: 'application/json, */*',
            Host: 'api.infusionsoft.com',
            Authorization: `Bearer ${myCache.get('tokens').accessToken}`
        }
    }).then(res =>{
        let tagId =(res.data.tags);
        const userTag = tagId.map(ele => ele.tag.id);
        User.updateOne({infusionsoftId: userId}, {
            $set: {
                tags: userTag
            }
        }).then(response=>{
            //console.log(response)
        }).catch(err =>{
            console.log(err, 'problema')
        })
    })
}


// login by autologin


router.post('/autologin' , async (req,res) =>{
    const obj = req.body
    if (!myCache.get('tokens')?.accessToken ){
        res.status(503).send({errorMessage: 'Keap offline'});
    }
   // fare una joi per validare che ci sia a single String of 12 bytes or a string of 24 hex characters const isOk = loginSchema.validate(obj)
    const user = await User.findOne({
        _id: obj.id,
        userKey: obj.userKey
    });
    if (!user) return res.status(401).send({errorMessage: 'Utente non trovato'});


    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.TOKEN_SECRET);
    let userId = user.infusionsoftId;
    retrieveId(userId)
    res.send({'token': token});
});




// user login (isAdmin check false or true)
router.post('/login' , async (req,res) =>{
    const obj = req.body
    if (!myCache.get('tokens')?.accessToken ){
        res.status(503).send({errorMessage: 'Keap offline'});
    }
    const isOk = loginSchema.validate(obj)
    if (isOk.error) return res.status(400).send(isOk.error.details[0].message);
    const user = await User.findOne({
        email: obj.email
    });
    if (!user) return res.status(400).send({errorMessage: 'Email or password wrong'});
    const validPass = await bcrypt.compare(obj.password, user.password);
    if (!validPass) return res.status(400).send({errorMessage: 'Email or password wrong'});

    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.TOKEN_SECRET);
    let userId = user.infusionsoftId;
    retrieveId(userId)
    res.send({'token': token , errorMessage: 'Login effettuato'});
});


// list user
router.get( '/user-list', async (req, res) =>{
   User.find({}, (err, users) =>{
       let userMap = []
       users.forEach(user => {
           userMap.push({
               id : user._id,
               admin: user.isAdmin,
               name: user.name,
               surname: user.surname,
               email: user.email,
               tag: user.tags,
               infusionsoftId: user.infusionsoftId
           })
       })
       res.send(userMap)
   })
})

// delete user
router.delete( '/user-list/delete-user/:id', async (req, res) =>{
    const _id = req.params.id
    User.deleteOne({_id}).then(response =>{
        res.send(response)
    })
})

// user show
router.get('/user-list/:id', async (req,res)=>{
    const _id = req.params.id
    User.findOne({_id}).then(response =>{
        res.send( {...response._doc})
    })
})

// user update

router.patch('/user-list/user-update/:id', async (req, res) =>{
    const _id = req.params.id
    User.updateOne({_id}, {$set: req.body}).then(response =>{
        res.send({
            errorMessage: 'Aggiornato'
        })
    })
})

// Custom memsion id e user key

router.get('/custom-key', async (req, res ) =>{
    res.send({customKey: myCache.get('customKey'),customId: myCache.get('customId') })
})

router.post('/custom-key' , async (req,res) =>{
    const obj = req.body
    myCache.set( "customKey", obj.customKey, 0 ); // questi sono i campi dal frontend
    myCache.set("customId", obj.customId, 0) // questi sono i campi dal frontend
    res.send({errorMessage: 'Aggiornato'});
});


// customer update
router.post('/customer-update', async (req, res ) =>{
    let result = User.find({}, function (err) {

    });

    res.send({errorMessage: 'Aggiornamento in corso, la procedura procede in background'})
})

module.exports = router;