const mongoose = require('mongoose');

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


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,

    },
    surname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    infusionsoftId : {
        type: Number,
    },
    tags: {
        type: [Number]
    },
    userKey: {
        type: String,
        default: makeSecret(7)
    }
},{
    timestamps: true,
});



module.exports = mongoose.model('User', userSchema);
