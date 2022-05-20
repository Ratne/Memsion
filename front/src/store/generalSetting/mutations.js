const mutations = {
    SET_BACKPAGE: (state, payload) =>  state.backPage = payload,
    RESET_BACKPAGE: (state) =>  state.backPage = undefined,
}

export default mutations;
