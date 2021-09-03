import store from "../store"

export default (config) => {
    if(config?.data?.errorMessage){
        store.dispatch('addError', {
            message: config.data.errorMessage,
            type: 'success',
        })
    }
    return config;
}
