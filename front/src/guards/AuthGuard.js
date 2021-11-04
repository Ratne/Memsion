import lastRoute from "./lastRoute";

const AuthGuard = (to, from, next) =>{
    const isAutoLogin = to.query && to.query.userapi && to.query.userkey
    console.log(to.name, to)
    if (to.name !== 'Autologin'){
        lastRoute.route = to;
    }
    if (isAutoLogin){
        next ({name: 'Autologin', params: {id:to.query.userapi, userkey: to.query.userkey}})
    }
    else {
    localStorage.getItem('token') ? next() : next({name: 'Login'})
    }
}

export default AuthGuard