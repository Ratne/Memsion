const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    label: {type: String, required: true},
})


module.exports = {
    model: mongoose.model('Module', moduleSchema),
    moduleSchema
}
