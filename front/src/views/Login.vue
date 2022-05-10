<template>
  <navbar />

<div class="container-fluid d-flex flex-column h-100">
  <div class="row mt-5 p-5">
    <div class="col-12">
      <TitleH1 className="text-center" label="Login"></TitleH1>
    </div>
  </div>
  <div class="row px-md-5 px-2 pb-5 pt-5 bgGrayLight h-100">

    <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 ">
<div class="formCustomLogin">
  <form @submit.prevent="userLogin">
    <div class="row">
    <FormGroupCustom :noLabel="true" :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <FormGroupCustom  :noLabel="true" :error="errors['password']" v-model:value="user.password" type="password" label="Password"/>
    <div class="col-12 mt-4">
      <ButtonPrimary class="w-100" label="Login"></ButtonPrimary>
     </div>
    </div>
  </form>
      <p class="text-uppercase text-center mt-2"><router-link to="/reset">Hai dimenticato la password?</router-link></p>
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
import lastRoute from "../guards/lastRoute";
import TitleH1 from "../components/shared/design/TitleH1";
import ButtonPrimary from "../components/shared/design/ButtonPrimary";
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
  components: {ButtonPrimary, TitleH1, Navbar, FormGroupCustom},

  methods:{
    userLogin(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {

        http.post(process.env.VUE_APP_URL+'/login', this.user).then(res =>{
         localStorage.setItem('token', res.token);
         this.$store.dispatch('setToken',res.token );

          this.$router.push(lastRoute.route? {name: lastRoute.route.name, params: lastRoute.route.params} : {name: 'Home'})
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
