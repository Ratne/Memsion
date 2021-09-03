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
        required: true
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
},{
    timestamps: true,
});



module.exports = mongoose.model('User', userSchema);