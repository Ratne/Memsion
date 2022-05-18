const CourseController = require("../controllers/course")
const router = require('express').Router();
const multer = require('multer');


// path course
const storageCourse = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/image/course')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const uploadCourse = multer({ storage: storageCourse });
let typeCourse = uploadCourse.single('image');

// patch image
const storageLesson = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/image/lesson')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const uploadLesson = multer({ storage: storageLesson });
let typeLesson = uploadCourse.single('image');


router.get("/",  (req, res) => {
    res.send(req.user)
})


router.get("/courses", CourseController.coursesIndex)
router.get("/courses/user", CourseController.coursesFilterIndex)
router.get("/courses/:id/modules", CourseController.modulesIndex)
router.get("/courses/:id", CourseController.courseShow)
router.get("/courses/:id/user", CourseController.courseFilterShow)
router.get("/courses/:id/menu", CourseController.courseShowMenu)
router.get("/courses/:id/lessons", CourseController.lessonsIndex)
router.get("/courses/:id/lesson/:idLesson", CourseController.lessonShow)
router.get("/courses/:id/lesson/:idLesson/user", CourseController.lessonFilterShow)
router.get("/courses/:id/modules/:idModule",typeCourse,CourseController.moduleShow)
router.get("/courses/:id/report",typeCourse,CourseController.reportCourse)
router.get("/courses/:id/list_lessons",typeCourse,CourseController.allCourseLessons)



router.post("/courses",typeCourse,CourseController.courseStore)
router.post("/courses/:id/modules",typeCourse,CourseController.modulesStore)
router.post("/courses/:id/menu",CourseController.courseAddVoiceMenu)
router.patch("/courses/:id", CourseController.courseUpdate)
router.delete("/courses/:id", CourseController.courseDelete)
router.delete("/courses/:id/menu/:idMenu",CourseController.courseDeleteMenu)




router.post("/courses/:id/lessons", typeLesson, CourseController.lessonStore)
router.patch("/courses/:id/lesson/:idLesson", CourseController.lessonUpdate)
router.patch("/courses/:id/lesson/:idLesson/users", CourseController.lessonUsersUpdate)
router.patch("/courses/:id/lessons/:idLesson/order", CourseController.lessonOrderUpdate)
router.delete("/courses/:id/lesson/:idLesson", CourseController.lessonDelete)
router.delete("/courses/:id/modules/:idModule", CourseController.moduleDelete)
router.patch("/courses/:id/modules/:idModule", CourseController.moduleEdit)



router.patch("/courses/:id/image",typeCourse, CourseController.courseUpdateImage)
router.patch("/courses/:id/lesson/:idLesson/image",typeLesson, CourseController.lessonUpdateImage)
module.exports = router;
