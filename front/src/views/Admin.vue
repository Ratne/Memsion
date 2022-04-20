<template>
<navbar />
<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 formCustomLogin">
<h2 class="text-center pb-3">Login</h2>
  <form @submit.prevent="userLogin">

    <FormGroupCustom :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['password']" v-model:value="user.password" type="password" label="Password"/>
    <button class="btn btn-primary  mt-3 mb-3 "  type="submit">Invia</button>

  </form>
      <p class="align-content-center">Password persa? <router-link to="/reset">Clicca qui</router-link></p>

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
import lastRoute from "../guards/lastRoute";
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
  name: "Admin",
  mixins: [validationMixin],
  components: {Navbar, FormGroupCustom},

  methods:{
    userLogin(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {

        http.post(process.env.VUE_APP_URL+'/login', this.user).then(res =>{
         localStorage.setItem('token', res.token);
         this.$store.dispatch('setToken',res.token );
          this.$router.push({name: 'Config'})
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