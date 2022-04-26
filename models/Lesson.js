const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    percentage: {
        type: Number,
        required: true
    }
})


const lessonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    mimetype: {type: String, required: true},
    video: {type: String},
    content: {type: String, required: true},
    requiredTag: {type: Number},
    module: {type: String, required: true},
    order: {type: Number, required: true},
    users: {type: [UserSchema], default: []}
})


module.exports = {
    model: mongoose.model('Lesson', lessonSchema),
    UserSchema,
    lessonSchema,
    userModel: mongoose.model('UserLesson',UserSchema)
}
