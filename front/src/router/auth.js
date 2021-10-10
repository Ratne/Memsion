import Home from "../views/auth/Home";
import SingleCourse from "../views/auth/admin/SingleCourse";
import SingleLesson from "../views/auth/admin/SingleLesson";
import AdminUser from "../views/auth/admin/AdminUser";
import SingleUser from "../views/auth/admin/SingleUser";
import NewUser from "../views/auth/admin/NewUser";
import SingleCourseModule from "../views/auth/admin/SingleCourseModule";
import MenuSettings from "../components/views/single_course/MenuSettings";
import SingleCourseFilter from "../views/auth/user/SingleCourseFilter";



const authRoutes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: 'course/:id',
    name: 'SingleCourse',
    component: SingleCourse,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'course/:courseId/lesson/:lessonId',
    name: 'SingleLesson',
    component: SingleLesson,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'course/:courseId/modules/:moduleId',
    name: 'SingleCourseModule',
    component: SingleCourseModule,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'users/',
    name: 'AdminUser',
    component: AdminUser,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'users/new',
    name: 'NewUser',
    component: NewUser,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'user/:id',
    name: 'SingleUser',
    component: SingleUser,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'course/:id/menu',
    name: 'MenuSettings',
    component: MenuSettings,
    meta: {
      isAdmin: true
    }
  },
  {
    path: 'course/:id',
    name: 'SingleCourseFilter',
    component: SingleCourseFilter,
  },


]


export default authRoutes
