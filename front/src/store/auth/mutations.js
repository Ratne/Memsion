const mutations = {
    SET_TOKEN: (state, payload) =>  state.token = payload,
    RESET_TOKEN: (state) => state.token = undefined,
    SET_USER: (state, payload) => state.user = payload,
    RESET_USER: (state) => state.user = undefined
}

export default mutations;