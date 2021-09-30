import Home from "../views/auth/Home";
import SingleCourse from "../views/auth/SingleCourse";
import SingleLesson from "../views/auth/SingleLesson";
import AdminUser from "../views/auth/AdminUser";
import SingleUser from "../views/auth/SingleUser";
import NewUser from "../views/auth/NewUser";
import SingleCourseModule from "../views/auth/SingleCourseModule";
import MenuSettings from "../components/views/single_course/MenuSettings";


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
  },
  {
    path: 'course/:courseId/modules/:moduleId',
    name: 'SingleCourseModule',
    component: SingleCourseModule
  },
  {
    path: 'users/',
    name: 'AdminUser',
    component: AdminUser
  },
  {
    path: 'users/new',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: 'user/:id',
    name: 'SingleUser',
    component: SingleUser
  },
  {
    path: 'course/:id/menu',
    name: 'MenuSettings',
    component: MenuSettings
  },


]


export default authRoutes
