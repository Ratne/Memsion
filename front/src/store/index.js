import { createStore } from 'vuex'
import auth from "./auth";
import errors from "./errors";
export default createStore({
  modules: {
    auth: auth,
    errors: errors
  }
})
