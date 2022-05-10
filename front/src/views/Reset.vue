<template>
  <navbar />
<div class="container-fluid h-100 d-flex flex-column">

  <div class="row mt-5 p-5">
    <div class="col-12">

      <TitleH1 className="text-center" label="Reset Password"></TitleH1>
    </div>
  </div>

  <div class="row px-md-5 px-2 pb-5 pt-5 bgGrayLight h-100">
    <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">

<div class="formCustomLogin">
  <form  v-if="form" v-on:keydown.enter.prevent="userPassword" @submit.prevent="userPassword">
    <div class="row">
    <FormGroupCustom :noLabel="true" :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
   <div class="col-12 mt-4">
     <ButtonPrimary label="Cambia Password" class="w-100" :disabled="isActive"></ButtonPrimary>
   </div>
    </div>
  </form>


      <div class="row" v-if="password">
        <p class="text-center">Controlla la tua casella email: se la tua utenza verrà trovata riceverai una email per cambiare password</p>
      </div>
  <p class="text-uppercase text-center mt-2"><router-link to="/login">Torna al login</router-link></p>
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
import TitleH1 from "../components/shared/design/TitleH1";
import ButtonPrimary from "../components/shared/design/ButtonPrimary";
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
  components: {ButtonPrimary, TitleH1, Navbar, FormGroupCustom},

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
