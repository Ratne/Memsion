<template>
<div class="container">
  <div class="row">
    <div class="col-8 offset-2">
  <h2>Fai il login</h2> {{user}}
  <form @submit.prevent="userLogin">

    <FormGroupCustom :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['password']" v-model:value="user.password" type="password" label="Password"/>
    <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>

  </form>

  </div>
  </div>

</div>


</template>

<script>

import FormGroupCustom from "../components/shared/form/FormGroupCustom";
import {validationMixin} from "../mixins/validationMixin";
import {validationTypeName} from "../utils/validationType";
import {http} from "../utils/http";
export default {
  data(){
    return {
      user: {},
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
        },
        {
          name: 'password',
          validation: {
            type: validationTypeName.required,
          }
        }
      ]

    }
  },
  name: "Login",
  mixins: [validationMixin],
  components: {FormGroupCustom},

  methods:{
    userLogin(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {

        http.post(process.env.VUE_APP_URL+'/login', this.user).then(res =>{
         localStorage.setItem('token', res.token);
         this.$store.dispatch('setToken',res.token );
         this.$router.push({name: 'Home'})
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