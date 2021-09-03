import Home from "../views/auth/Home";
import SingleCourse from "../views/auth/SingleCourse";
import SingleLesson from "../views/auth/SingleLesson";


const authRoutes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: 'course/:id',
    name: 'SingleCourse',
    component: SingleCourse
  },
  {
    path: 'course/:courseId/lesson/:lessonId',
    name: 'SingleLesson',
    component: SingleLesson
  }

]


export default authRoutes
