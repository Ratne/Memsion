const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const multer = require ('multer')
const csv = require("fast-csv");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const AutoLogin = require("../models/Autologin");
const updateInfusionsoftUser = require("../utils/serviceUser");
const {userRegistrationEmail} = require("../utils/userEmail");


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/csv/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage
});


function makeSecret(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

async function findUser(userEmail) {
    const userFind =
     await User.findOne({
        email: userEmail
    })
    return userFind
}

async function saveUser (userData) {

    for (const ele of userData) {
        const salt = await bcrypt.genSalt(10);
        const randomPassword = Array(10).fill("!$%&=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');;
        const hashPassword = await bcrypt.hash(randomPassword, salt);
        const user = new User({...ele, password: hashPassword});
        const userFind = await findUser(ele.email);
        if (userFind === null) {

            const savedUser = await user.save();


            // valori in infusionsoft
            AutoLogin.findOne({}).then(resp=> {
                resp.customMemsionId && resp.memsionUserKey && updateInfusionsoftUser(savedUser.infusionsoftId, savedUser._id, savedUser.userKey)
            })

            // invio email all'utente
            const emailSend = userRegistrationEmail(ele.name, ele.email, randomPassword);
            await sendEmail(ele.email, "Benvenuto a bordo", emailSend);
        }
    }

}



function uploadToMongo(filePath) {
    let stream = fs.createReadStream(filePath)
    const users =[]
    let csvStream = csv
        .parse({headers: true})
        .on('data', (data) => {
            users.push({
                name: data["First Name"] || '',
                surname: data["Last Name"] || '',
                email:data.Email,
                infusionsoftId: data.Id,
                userKey: makeSecret(7),
            })
        })
        .on('end', () => {
          saveUser(users).then(res =>{

          }).catch(err => {
              console.log(err)
          })


        });

    stream.pipe(csvStream);
}

router.post('/', upload.single("import"),
    async (req, res)=>{
        const salt = await bcrypt.genSalt(10);
        const randomPassword =Array(10).fill("!$%&=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');;
        const hashPassword = await bcrypt.hash(randomPassword, salt);
        uploadToMongo( './uploads/csv/' + req.file.filename, hashPassword)
        res.send({errorMessage: 'Import in background'})
    })
module.exports = router;
