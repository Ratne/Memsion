const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    label: {type: String, required: true},
    name: {type: String},
    url: {type: String, required: true}
})


module.exports = {
    model: mongoose.model('Menu', menuSchema),
    menuSchema
}
