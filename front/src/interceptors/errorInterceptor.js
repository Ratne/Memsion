import store from "../store"
const methodList= ['POST', 'DELETE', 'PUT', 'PATCH'];

const generalErrorMessage= 'qualcosa è andato storto' ;

export default (err) => {
    if(err.response?.data?.errorMessage){
        store.dispatch('addError', {
            message: err.response.data.errorMessage,
            type: 'error',
        })
    }
    else if (methodList.includes(err.response.config.method.toUpperCase())  && !err.response?.data?.errorMessage){
        store.dispatch('addError', {
            message: generalErrorMessage,
            type: 'error',
        })
    }
    return Promise.reject(err);
}

