<template>
  <navbar/>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 formCustomLogin">
        <h2 class="text-center pb-3">Recupera Password</h2>
        <form @submit.prevent="userChangePassword">

          <FormGroupCustom :error="errors['password']" v-model:value="user.password" type="password" label="Password"/>
          <button class="btn btn-primary mt-3 mb-3 " type="submit">Cambia Password</button>

        </form>
        <p class="align-content-center"><router-link to="/login">Torna al login</router-link></p>
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
import { useRoute } from 'vue-router';
export default {
  data(){
    return {
      user: {},
      userId: this.$route.params.userId,
      userToken: this.$route.params.userToken,
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
  components: {Navbar, FormGroupCustom},
  methods:{
    /*
     if (this.isValid(this.course)){
        coursesStore(formData).then(res =>{
          this.courses.push(res)
          this.course = {}
        })
      }


     */
    userChangePassword(){
      this.$store.dispatch('resetErrors');
      if (this.checkLogin) {

         http.post(process.env.VUE_APP_URL+'/password-reset/'+this.userId +'/'+ this.userToken, {password: this.user.password}).then(res =>{

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
}




</script>

<style scoped>

</style>