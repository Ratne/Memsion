const actions = {
    setErrors: (context, payload) => {
        context.commit('SET_ERRORS', payload)
    },
    resetErrors: (context) => {
        context.commit('RESET_ERRORS')
    },
    addError: (context, payload) =>{
        payload.id=Date.now()*(Math.round(Math.random() * 100))
        context.commit('ADD_ERROR', payload)

        if (payload.type === 'success') {
            setTimeout(() =>{
               context.dispatch('removeError', payload);
            }, 5000)
        }
    },

    removeError: (context, payload) => {
        context.commit('REMOVE_ERROR', payload)
    }

}

export default actions