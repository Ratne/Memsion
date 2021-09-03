const router = require('express').Router();

router.get("/",  (req, res) => {
    res.send(req.user)
})

//router.get("/courses")
//router.get("/courses/:id")
//router.get("/courses/:id/lessons")
//router.get("/courses/:id/lesson/:idLesson")

//router.post("/courses")
//router.patch("/courses/:id")
//router.delete("/courses/:id")

//router.post("/courses/:id/lessons")
//router.patch("/courses/:id/lesson/:idLesson")
//router.delete("/courses/:id/lesson/:idLesson")


module.exports = router;