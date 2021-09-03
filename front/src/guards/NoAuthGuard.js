const NoAuthGuard = (to, from, next) =>{
    localStorage.getItem('token') ? next({name: 'Home'}) : next()
}

export default NoAuthGuard