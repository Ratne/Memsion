const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const multer = require ('multer')
const csv = require("fast-csv");
const bcrypt = require("bcryptjs");


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


async function findUser(userEmail) {
    const userFind =
     await User.findOne({
        email: userEmail
    })
    console.log(userFind)
    return userFind
}

async function saveUser (userData) {

    for (const ele of userData) {
        const user = new User(ele);
        const userFind = await findUser(ele.email);
        if (userFind === null) {

            const savedUser = await user.save();
        }
    }

}

function uploadToMongo(filePath, hashPassword) {
    let stream = fs.createReadStream(filePath)
    const users =[]
    let csvStream = csv
        .parse()
        .on('data', (data) => {
            users.push({
                name: data[0],
                surname: data[1],
                email:data[2],
                infusionsoftId: data[3],
                password: hashPassword
            })
        })
        .on('end', () => {
          saveUser(users).then(res =>{

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