const CourseController = require("../controllers/course")
const router = require('express').Router();

router.get("/",  (req, res) => {
    res.send(req.user)
})


router.get("/courses", CourseController.coursesIndex)
router.get("/courses/:id", CourseController.courseShow)
router.get("/courses/:id/lessons", CourseController.lessonsIndex)
router.get("/courses/:id/lesson/:idLesson", CourseController.lessonShow)

router.post("/courses", CourseController.courseStore)
router.patch("/courses/:id", CourseController.courseUpdate)
router.delete("/courses/:id", CourseController.courseDelete)

router.post("/courses/:id/lessons", CourseController.lessonStore)
router.patch("/courses/:id/lesson/:idLesson", CourseController.lessonUpdate)
router.delete("/courses/:id/lesson/:idLesson", CourseController.lessonDelete)



module.exports = router;