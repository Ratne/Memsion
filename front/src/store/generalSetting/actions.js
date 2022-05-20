const actions = {
    setBackPage: (context, payload) => {
        context.commit('SET_BACKPAGE', payload)
    },
    resetBackPage: (context, payload) => {
    context.commit('RESET_BACKPAGE', payload)
    }

}

export default actions
