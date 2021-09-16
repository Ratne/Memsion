<template>
  <navbar />
<div class="container">
  <div class="row">
    <div class="col-8 offset-2">

  <form v-if="form" v-on:keydown.enter.prevent="userPassword" @submit.prevent="userPassword">

    <FormGroupCustom :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <button class="btn btn-danger w-100 mt-3 mb-3 " :disabled="isActive" type="submit"> CAMBIA PASSWORD</button>

  </form>
      <p class="align-content-center"><router-link to="/login">Torna al login</router-link></p>
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
import Navbar from "../components/core/Navbar";
export default {
  data(){
    return {
      user: {},
      isActive: false,
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
  components: {Navbar, FormGroupCustom},

  methods:{
    userPassword(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {

        this.isActive=true
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