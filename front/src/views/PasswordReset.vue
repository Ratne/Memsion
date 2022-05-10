<template>
  <navbar/>
  <div class="container-fluid h-100 d-flex flex-column">
    <div class="row mt-5 p-5">
      <div class="col-12">

        <TitleH1 className="text-center" label="Recupera Password"></TitleH1>
      </div>
    </div>

    <div class="row px-md-5 px-2 pb-5 pt-5 bgGrayLight h-100">
      <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">

        <div class="formCustomLogin">
        <form @submit.prevent="userChangePassword">
          <div class="row">
          <FormGroupCustom :noLabel="true" :error="errors['password']" v-model:value="user.password" type="password" label="Password"/>
            <div class="col-12 mt-4">
              <ButtonPrimary label="Cambia Password" class="w-100"></ButtonPrimary>
            </div>
          </div>
        </form>
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
import { useRoute } from 'vue-router';
import TitleH1 from "../components/shared/design/TitleH1";
import ButtonPrimary from "../components/shared/design/ButtonPrimary";
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
  components: {Navbar, FormGroupCustom, ButtonPrimary, TitleH1},
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
