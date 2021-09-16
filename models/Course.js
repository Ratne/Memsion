const mongoose = require('mongoose');
const {lessonSchema} = require('./Lesson')

const menuSchema = new mongoose.Schema({
    label: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true}
})

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    mimetype: {type: String, required: true},
    requiredTag: {type: Number, required: true},
    lessons: {type: [lessonSchema], required: true},
    menu: {type: [menuSchema], required: true}
})


module.exports = mongoose.model('Courses', courseSchema);