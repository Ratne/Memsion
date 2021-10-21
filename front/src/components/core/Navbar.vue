<template>
  <nav class="navbar navbar-expand navbar-light bg-light mb-4 px-4">
    <img :src="logoBrand" class="logoNav me-4" alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div v-if="isAdmin" class="navbar-nav w-100">
        <router-link class="nav-item nav-link" to="/auth">Home</router-link>
        <router-link class="nav-item nav-link" to="/auth/users/">Utenti</router-link>
        <router-link @click.prevent="logout" class="nav-item nav-link ms-auto" to="/logout">Logout</router-link>
      </div>
      <div v-else-if="isAdmin === false" class="navbar-nav w-100">
        <router-link class="nav-item nav-link" to="/auth">Home</router-link>
        <router-link @click.prevent="logout" class="nav-item nav-link ms-auto" to="/logout">Logout</router-link>
      </div>
      <div v-else class="navbar-nav">
        <router-link class="nav-item nav-link" to="/login">Login</router-link>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "Navbar",
  data(){
    return{
      logoBrand: process.env.VUE_APP_LOGOBRAND
    }
  },
  props:{
    isAdmin: {},

  },
  methods:{
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.logoNav{
  width: 12rem;
  display: block;
}
</style>