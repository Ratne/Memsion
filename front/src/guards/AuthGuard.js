const AuthGuard = (to, from, next) =>{
    localStorage.getItem('token') ? next() : next({name: 'Login'})
}

export default AuthGuard