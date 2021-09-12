<template>
<navbar-login />
<div class="container">
  <div class="row">
    <div class="col-8 offset-2">

  <form v-if="form" @submit.prevent="userPassword">

    <FormGroupCustom :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <button class="btn btn-danger w-100 mt-3 mb-3 "  type="submit">CAMBIA PASSWORD</button>

  </form>
      <div class="row" v-if="password">
        <h3>Controlla la tua casella email: se la tua utenza verrà trovata riceverai una email per cambiare password</h3>
      </div>
  </div>
  </div>

</div>


</template>

<script>

import FormGroupCustom from "../components/shared/form/FormGroupCustom";
import {validationMixin} from "../mixins/validationMixin";
import {validationTypeName} from "../utils/validationType";
import {http} from "../utils/http";
import NavbarLogin from "../components/shared/design/NavbarLogin";
export default {
  data(){
    return {
      user: {},
      password: false,
      form: true,
      validazione: [
        {
          name: 'email',
          validation: {
            type: validationTypeName.required,}
        },
        {
          name: 'email',
          validation:
              {type: validationTypeName.email}
        }
      ]

    }
  },
  name: "Reset",
  mixins: [validationMixin],
  components: {NavbarLogin, FormGroupCustom},

  methods:{
    userPassword(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {


        http.post(process.env.VUE_APP_URL+'/password-reset', this.user).then(res =>{
          this.password=true;
          this.form=false;
        })
      }
    }
    },

  computed:{
    allValidations(){
      return [...this.validazione]

    },
    checkLogin(){
      return this.isValid(this.user)
    }
  }

}




</script>

<style scoped>

</style>