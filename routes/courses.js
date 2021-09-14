const CourseController = require("../controllers/course")
const router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const upload = multer({ storage });
let type = upload.single('image');
router.get("/",  (req, res) => {
    res.send(req.user)
})


router.get("/courses", CourseController.coursesIndex)
router.get("/courses/:id", CourseController.courseShow)
router.get("/courses/:id/lessons", CourseController.lessonsIndex)
router.get("/courses/:id/lesson/:idLesson", CourseController.lessonShow)

router.post("/courses",type,CourseController.courseStore)
router.patch("/courses/:id", CourseController.courseUpdate)
router.delete("/courses/:id", CourseController.courseDelete)

router.post("/courses/:id/lessons", type, CourseController.lessonStore)
router.patch("/courses/:id/lesson/:idLesson", CourseController.lessonUpdate)
router.delete("/courses/:id/lesson/:idLesson", CourseController.lessonDelete)



module.exports = router;