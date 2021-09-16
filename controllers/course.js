const Course = require("../models/Course");
const {model: Lesson} = require("../models/Lesson");
const fs = require('fs');
// courses

const calcBase64= (path, mimetype='image') => {
        let buff = fs.readFileSync(path);
        let image = buff.toString('base64');
        return `data:${mimetype};base64,${image}`
};


exports.coursesIndex = (req,res) =>{
    Course.find({}, {description:1, name:1,image:1, requiredTag:1 }).then(response =>{
        res.send(response.map(course =>{
            return {...course._doc, image: calcBase64(course.image, course.mimetype)}
        }))
    })
};

exports.courseShow = (req,res) =>{
    const _id = req.params.id
    Course.findOne({_id}).then(response =>{
        res.send({...response._doc, image: calcBase64(response.image, response.mimetype),
                lessons: response.lessons.map((lesson => ({...lesson._doc, image: calcBase64(lesson.image, lesson.mimetype)})
            ))})
    })
};

exports.courseStore = (req,res) =>{
    const course = new Course({...req.body, image: req.file.path, mimetype: req.file.mimetype});
    course.save().then(result =>{
       const image =  calcBase64(req.file.path, req.file.mimetype)
        res.send({...result._doc, image})
    })
};

exports.courseUpdate = (req,res) =>{
    const _id = req.params.id
    Course.updateOne({_id}, {$set: req.body}).then(response =>{
        res.send({
            errorMessage: 'Aggiornato'
        })
    })
};

exports.courseUpdateImage = (req,res) =>{
    const _id = req.params.id
    Course.updateOne({_id}, {$set: {image: req.file.path, mimetype: req.file.mimetype}}).then(response =>{
        const image =  calcBase64(req.file.path, req.file.mimetype)
        res.send({
            image,
            _id,
            errorMessage: 'Aggiornato'
        })
    })
};


exports.courseDelete = (req,res) =>{
    const _id = req.params.id;
    Course.deleteOne({_id}).then(response =>{
        res.send(response)
    })
};


// lessons

exports.lessonsIndex = (req,res) =>{
    const _id = req.params.id;
    Course.findOne({_id}, {lessons: {name: 1, description:1,video:1, image:1, content:1, _id:1}, _id:0}).then(response =>{
        res.send(response.lessons.map(lesson =>{
            return {...lesson._doc, image: calcBase64(lesson.image, lesson.mimetype)}
        }))

    })
};

exports.lessonShow = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;
    Course.findOne({_id, 'lessons._id':idLesson}, {'lessons.$': 1}).then(response =>{
       res.send({...response.lessons[0]._doc, image:calcBase64(response.lessons[0].image, response.lessons[0].mimetype)})
    })

};

exports.lessonStore = (req,res) =>{
    const _id = req.params.id;
    const lesson = new Lesson({...req.body, image: req.file.path, mimetype: req.file.mimetype});
    console.log(req.file);
    Course.updateOne({_id}, {$push: {lessons: lesson}} ).then(response =>{
        const image =  calcBase64(req.file.path, req.file.mimetype)
        res.send({...lesson._doc, image, errorMessage: 'Aggiunta Lezione'})
    })
};

exports.lessonUpdate = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;
    Course.updateOne({_id, 'lessons._id':idLesson}, {$set: {'lessons.$': req.body}}).then(response =>{
        res.send({
            errorMessage: 'Aggiornato'})
    })

};

exports.lessonDelete = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;

    Course.updateOne({_id, 'lessons._id':idLesson}, {$pull: {lessons: {_id: idLesson}}} ).then(response =>{
        res.send(response)
    })
};

exports.lessonUpdateImage = (req,res) =>{
    const _id = req.params.id
    const idLesson = req.params.idLesson;
    Course.updateOne({_id, 'lessons._id':idLesson}, {$set: {'lessons.$.image': req.file.path,'lessons.$.mimetype': req.file.mimetype }}).then(response =>{
        const image =  calcBase64(req.file.path, req.file.mimetype)
        res.send({
            image,
            _id,
            errorMessage: 'Aggiornato'
        })
    })
};