import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login";
import authRoutes from "./auth";
import AuthGuard from "../guards/AuthGuard"
import NoAuthGuard from "../guards/NoAuthGuard";
import AuthPage from "../views/auth/AuthPage";
import Reset from "../views/Reset";
import PasswordReset from "../views/PasswordReset";
import IsAdminGuard from "../guards/IsAdminGuard";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter : NoAuthGuard
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
    beforeEnter : NoAuthGuard
  },
  {
    path: '/password-reset/:userId/:userToken',
    name: 'PasswordReset',
    component: PasswordReset,
    beforeEnter : NoAuthGuard
  },
  {
    path: '/auth',
    component: AuthPage,
    children: authRoutes,
    beforeEnter : AuthGuard
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'Home'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeResolve(IsAdminGuard)
export default router
