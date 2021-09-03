const Course = require("../models/Course");
const {model: Lesson} = require("../models/Lesson");


// courses
exports.coursesIndex = (req,res) =>{
    Course.find({}, {description:1, name:1,image:1, requiredTag:1 }).then(response =>{
        res.send(response)
    })
};

exports.courseShow = (req,res) =>{
    const _id = req.params.id
    Course.findOne({_id}).then(response =>{
        res.send(response)
    })
};

exports.courseStore = (req,res) =>{
   const course = new Course(req.body);
   course.save().then(result =>{
       res.send(result)
   })
};

exports.courseUpdate = (req,res) =>{
    const _id = req.params.id
    Course.updateOne({_id}, {$set: req.body}).then(response =>{
        res.send(response)
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
    Course.findOne({_id}, {lessons: {name: 1, description:1, content:1, _id:1}, _id:0}).then(response =>{
        res.send(response)
    })
};

exports.lessonShow = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;
    Course.findOne({_id, 'lessons._id':idLesson}, {'lessons.$': 1}).then(response =>{
       res.send(response.lessons[0])
    })

};

exports.lessonStore = (req,res) =>{
    const _id = req.params.id;
    const lesson = new Lesson(req.body);
    Course.updateOne({_id}, {$push: {lessons: lesson}} ).then(response =>{
        res.send(lesson)
    })
};

exports.lessonUpdate = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;
    Course.updateOne({_id, 'lessons._id':idLesson}, {$set: {'lessons.$': req.body}}).then(response =>{
        res.send(response)
    })

};

exports.lessonDelete = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;

    Course.updateOne({_id, 'lessons._id':idLesson}, {$pull: {lessons: {_id: idLesson}}} ).then(response =>{
        res.send(response)
    })
};
