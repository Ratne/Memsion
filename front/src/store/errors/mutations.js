const mutations = {
    SET_ERRORS: (state, payload) =>  state.errors = payload,
    RESET_ERRORS: (state) => state.errors = [],
    ADD_ERROR: (state, payload) => state.errors = [...state.errors, payload] ,
    REMOVE_ERROR: (state,payload) => state.errors = state.errors.filter(ele => {
     return   ele.id !== payload.id;
    })
}

export default mutations;