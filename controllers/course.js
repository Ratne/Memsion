const Course = require("../models/Course");
const {model: Lesson} = require("../models/Lesson");
const {model: Module} = require("../models/Modules");
const {model: Menu} = require("../models/Menu");
const fs = require('fs');
const {func} = require("joi");
const mongoose = require("mongoose");
// courses

const calcBase64= (path, mimetype='image') => {
        let buff = fs.readFileSync(path);
        let image = buff.toString('base64');
        return `data:${mimetype};base64,${image}`
};

const lessonFind = (res, queryFilter) => {
    Course.findOne(queryFilter,
        {'lessons.$': 1}).then(response =>{
        response?.lessons?.length ?
            res.send({...response.lessons[0]._doc, image:calcBase64(response.lessons[0].image, response.lessons[0].mimetype)})
            : res.status(404).send({errorMessage: 'Lesson Not Found'});
    })
}



exports.coursesIndex = (req,res) =>{
    Course.find({}, {description:1, name:1,image:1, requiredTag:1, modules: 1 }).then(response =>{
        res.send(response.map(course =>{
            return {...course._doc, image: calcBase64(course.image, course.mimetype)}
        }))
    })
};

exports.coursesFilterIndex = (req,res) =>{
    const userTag = req.user.tags || []
    Course.find({requiredTag: { '$in': userTag }}, {description:1, name:1,image:1}).then(response =>{
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

exports.courseFilterShow = (req,res) =>{
    const _id = req.params.id
    const userTag = req.user.tags || []
    const userAdmin = req.user.isAdmin
    Course.aggregate(
        [
            {"$match": {_id: mongoose.Types.ObjectId(_id) , ...(userAdmin ? {} : {requiredTag: {'$in': userTag}}) }},
            {
                "$project": {
                    modules: 1 ,
                    menu: 1,
                    image: 1,
                    name: 1,
                    description: 1,
                    mimetype: 1,
                    lessons: userAdmin ? 1 : {
                        "$filter": {
                            "input": "$lessons",
                            "as": "lesson",
                            "cond": {
                                "$in" : ['$$lesson.requiredTag', userTag]
                            }
                        },
                    }
                }
            },
        ],
        function (err, response){
            if (response && response.length){
            response[0].lessons.forEach(lesson =>{
                lesson.image= calcBase64(lesson.image, lesson.mimetype)
            })
            response[0].image = calcBase64(response[0].image, response[0].mimetype)
            res.send(response[0])
            }
            else {
                res.status(403).send({errorMessage: 'Course Not Found'});
            }

        }
    )

};

exports.courseStore = (req,res) =>{
    const course = new Course({...req.body, image: req.file.path, mimetype: req.file.mimetype});
    course.save().then(result =>{
       const image =  calcBase64(req.file.path, req.file.mimetype)
        res.send({...result._doc, image})
    })
};

exports.courseUpdate = (req,res) =>{
    const _id = req.params.id;
    delete req.body.image;
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
    Course.findOne({_id}, {lessons: {name: 1, description:1,video:1, image:1, content:1, _id: 1, order: 1, module: 1}, _id:0}).then(response =>{
        res.send(response.lessons.map(lesson =>{
            return {...lesson._doc, image: calcBase64(lesson.image, lesson.mimetype)}
        }))

    })
};


exports.lessonShow = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;
    lessonFind(res, {_id, 'lessons._id':idLesson})

};

exports.lessonFilterShow = (req,res) =>{
    const _id = req.params.id;
    const idLesson = req.params.idLesson;
    const userTag = req.user.tags || []
    const userAdmin = req.user.isAdmin
    lessonFind(res, {_id, 'lessons':{
        $elemMatch:
                {_id: mongoose.Types.ObjectId(idLesson), ...(userAdmin ? {} :
                        {
                        requiredTag: {'$in': userTag}
                    })} },
        ...(userAdmin ? {} : {requiredTag: {'$in': userTag}})})
};

exports.lessonStore = (req,res) =>{
    const _id = req.params.id;
    // inserire con joi la validazione di tutti i campi required del db
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
    const dataSet = Object.keys(req.body).filter(ele => ele !== 'image').reduce((acc, ele) =>{
        acc['lessons.$.'+ele] = req.body[ele]
        return acc
    }, {})

    Course.updateOne({_id, 'lessons._id':idLesson}, {$set: dataSet }).then(response =>{
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

// modules
exports.modulesIndex = (req,res) =>{
    const _id = req.params.id
    Course.findOne({_id}, {modules: 1, _id: 0}).then(response =>{
        res.send(response.modules)
    })
};


exports.modulesStore = (req,res) =>{
    const _id = req.params.id;
    const module = new Module({...req.body});
    Course.updateOne({_id}, {$push: {modules: module}} ).then(response =>{
        res.send({
            module, errorMessage: 'Aggiunto Modulo'})
    })
};

exports.moduleShow = (req,res) =>{
    const _id = req.params.id;
    const idModule = req.params.idModule;
    Course.aggregate(
        [
            {"$match": { _id : mongoose.Types.ObjectId(_id) }},
            {
                "$project": {
                    modules: {
                        $first: {"$filter": {
                                "input": "$modules",
                                "as": "module",
                                "cond": {
                                    "$eq" : ['$$module._id', mongoose.Types.ObjectId(idModule)]
                                }
                            }},
                    },
                    lessons: {
                        "$filter": {
                            "input": "$lessons",
                            "as": "lesson",
                            "cond": {
                                "$eq" : ['$$lesson.module', idModule]
                            }
                        },
                    }
                }
            },
          //  { $unwind: "$lessons" }
        ],
        function (err, response){
            if (response.length)
             {
             response[0].lessons.forEach(lesson =>{
                  lesson.image= calcBase64(lesson.image, lesson.mimetype)
             })
             res.send(response[0])
             }
            else res.send({lessons:[]})


        }
    )
};


exports.moduleDelete = (req,res) =>{
    const _id = req.params.id;
    const idModule = req.params.idModule
    Course.updateOne({_id}, {$pull: {lessons: {module: idModule}, modules: {_id : mongoose.Types.ObjectId(idModule)}}} ).then(response =>{
        res.send(response)
    })
};


// menu
exports.courseShowMenu = (req,res) =>{
    const _id = req.params.id
    Course.findOne({_id}, {menu: 1}).then(response =>{
           res.send(response)

    })
};

exports.courseAddVoiceMenu = (req,res) =>{
    const _id = req.params.id
    const menu = new Menu({...req.body});
    Course.updateOne({_id}, {$push: {menu}} ).then(response =>{
        res.send({
             menu: menu, errorMessage: 'Aggiunto Modulo'})
     }
    )
};

exports.courseDeleteMenu = (req,res) =>{
    const _id = req.params.id
    const idMenu = req.params.idMenu
    Course.updateOne({_id}, {$pull: {menu: {_id: mongoose.Types.ObjectId(idMenu)} }} ).then(response =>{
        res.send({
            response,
            errorMessage: 'Voce Menu Cancellata'
        })


    })
};
