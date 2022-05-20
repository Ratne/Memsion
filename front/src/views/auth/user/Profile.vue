<template>
  <div class="mt-5 pt-5 container-fluid">
    <div class="row">
      <div class="col-12 px-md-5 px-2">
        <TitleH1 label="Profilo Personale"/>
        <div>
          <p>Nome: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
        </div>
        <div class="text-start mt-5 mb-5">
          <ButtonPrimary label="I Miei Corsi" @click="getCourse"></ButtonPrimary>
        </div>
        <button-primary label="Reset Password" @click.prevent="resetPassword"/>
       <div class="d-flex justify-content-end" > <router-link @click.prevent="logout" to="/logout">Logout</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>


import TitleH1 from "../../../components/shared/design/TitleH1";
import TitleH2 from "../../../components/shared/design/TitleH2";
import ButtonPrimary from "../../../components/shared/design/ButtonPrimary";
import {passwordResetCall} from "../../../services/userService";

export default {
  name: 'Profile',
  components: {ButtonPrimary, TitleH2, TitleH1},
  methods: {
    getCourse() {
      this.$router.push({name: "Home"});
    },
    logout() {
      this.$store.dispatch('logout')
    },
    resetPassword() {
      passwordResetCall({email: this.user.email}).then(res => {
        this.logout();
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  mounted() {
    this.$store.dispatch('setBackPage', {name: 'Home'})
  },
  beforeUnmount() {
    this.$store.dispatch('resetBackPage')
  },
}
</script>
<style lang="scss" scoped>

</style>
