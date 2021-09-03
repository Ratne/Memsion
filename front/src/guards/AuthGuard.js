// to quale rotta sto accedendo
// from da dove vengo
// next se ti do il permesso di andare posso anche reindirizzarti in un'altra pagina

const AuthGuard = (to, from, next) =>{
    localStorage.getItem('token') ? next() : next({name: 'Login'})
}

export default AuthGuard