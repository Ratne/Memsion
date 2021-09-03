import router from "../router";


export default (err) => {
    if(err.response && err.response.status === 401){
        localStorage.removeItem('token')
        router.push({name: 'Login'})
    }
    return Promise.reject(err);
}