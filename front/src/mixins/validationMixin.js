import {messageErrors, validationType} from "../utils/validationType";


export const validationMixin = {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    isValid(data) {
      this.errors = {};
      const control = this.allValidations.reduce((acc, ele) => {

        const type = ele.validation.type;
        const valid = (validationType[type](data, ele.name))
        if (!valid) {

          this.errors[ele.name] = ele.validation.message ? ele.validation.message :
              (messageErrors[type] ? messageErrors[type](ele.name) : `Il campo ${ele.name} non è valido`)

        }
        return valid ? acc : false
      }, true);

      return control
    }
  },
  computed: {
    allValidations() {
      return []
    }
  }
}