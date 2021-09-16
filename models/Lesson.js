const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    mimetype: {type: String, required: true},
    video: {type: String},
    content: {type: String, required: true},
    requiredTag: {type: Number},
})


module.exports = {
    model: mongoose.model('Lesson', lessonSchema),
    lessonSchema
}
