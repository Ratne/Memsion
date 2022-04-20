const mongoose = require('mongoose');



const autologinSchema = new mongoose.Schema({
    customMemsionId: {type: String, required: true},
    memsionUserKey: {type: String, required: true},
})


module.exports = mongoose.model('Autologin', autologinSchema);
