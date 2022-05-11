const mongoose = require('mongoose');

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
        type: String
    }
},{
    timestamps: true,
});



module.exports = mongoose.model('User', userSchema);
