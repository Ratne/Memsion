const mongoose = require('mongoose');
const {lessonSchema} = require('./Lesson')
const {moduleSchema} = require('./Modules')
const {menuSchema} = require ('./Menu')




const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    mimetype: {type: String, required: true},
    requiredTag: {type: Number, required: true},
    lessons: {type: [lessonSchema], required: true},
    modules:{type: [moduleSchema], required: true},
    menu: {type: [menuSchema], required: true}
})


module.exports = mongoose.model('Courses', courseSchema);