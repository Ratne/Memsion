<template>
  <navbar-login />
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2">
        {{ currentRoute }}
        <form @submit.prevent="userChangePassword">

          <FormGroupCustom :error="errors['password']" v-model:value="user.password" type="password" label="Password"/>
          <button class="btn btn-primary w-100 mt-3 mb-3 " type="submit">Cambia Password</button>

        </form>
        <p class="align-content-center">Torna al <a href="/login">Login</a></p>

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
import { useRoute } from 'vue-router';
export default {
  data(){
    return {
      user: {},
      tokenPassword: String,
      currentRoute: useRoute().path,
      validazione: [
       {
          name: 'password',
          validation: {
            type: validationTypeName.required,
          }
        }
      ]

    }
  },
  name: "PasswordReset",
  mixins: [validationMixin],
  components: {NavbarLogin, FormGroupCustom},
  methods:{
    userChangePassword(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {

         http.post(process.env.VUE_APP_URL+'/password-reset/'+ this.tokenPassword +'?password='+this.user.password).then(res =>{

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
    },
  },
mounted() {

    const token= this.currentRoute;
    const newToken = token.replace('/password-reset/', '');
    this.tokenPassword= newToken
  }


}




</script>

<style scoped>

</style>