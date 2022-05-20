import { createStore } from 'vuex'
import auth from "./auth";
import errors from "./errors";
import generalSetting from "./generalSetting"
export default createStore({
  modules: {
    auth: auth,
    errors: errors,
    generalSetting
  }
})
