const mutations = {
    SET_TOKEN: (state, payload) =>  state.token = payload,
    RESET_TOKEN: (state) => state.token = undefined
}

export default mutations;