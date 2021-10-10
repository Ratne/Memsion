import router from "../../router";

const actions = {
    setToken: (context, payload) => {
        //    context.dispatch()  dispacciamo una azione mentre con context.commit() dispacciamo una mutation
        context.commit('SET_TOKEN', payload)
    },
    resetToken: (context) => {
        context.commit('RESET_TOKEN')
    },
    setUser: (context, payload) => {
        context.commit('SET_USER', payload)
    },
    resetUser: (context) =>{
        context.commit('RESET_USER')
    },
    logout: (context) =>{
        localStorage.removeItem('token');
        context.dispatch("resetToken");
        context.dispatch("resetUser");
        router.push({name: 'Login'});
    }
}

export default actions