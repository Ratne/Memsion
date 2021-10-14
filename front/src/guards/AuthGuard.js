import lastRoute from "./lastRoute";

const AuthGuard = (to, from, next) =>{
    lastRoute.route = to;
    localStorage.getItem('token') ? next() : next({name: 'Login'})
}

export default AuthGuard