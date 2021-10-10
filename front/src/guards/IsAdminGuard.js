import store from '../store/index.js'
import {http} from "../utils/http";
const authData = () => {
    return new Promise((resolve) => {
        localStorage.getItem('token') ? controlUser(resolve) : resolve()
    })
}

const controlUser = (resolve) => {
    if (store.getters.getUser){
        resolve(store.getters.getUser)
    }
    else {

        http.get('/auth').then(res =>{
            store.dispatch('setUser', res)
            resolve(res)
        })
    }
}

const IsAdminGuard = (to, from, next) =>{
    if (to.meta.isAdmin){
        authData().then((res) => {
            const isAdmin = res?.isAdmin
            isAdmin ? next() : next({name: 'Home'})})
        }
    else {
        next()
    }
}

export default IsAdminGuard