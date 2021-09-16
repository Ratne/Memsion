<template>
  <div>
  <nav v-if="isAdmin" class="navbar navbar-expand navbar-light bg-light mb-4 ">
    <img :src="logoBrand" class="logoNav" alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link active" to="/">Home</router-link>
        <router-link @click.prevent="logout" class="nav-item nav-link" to="/logout">Logout</router-link>
      </div>
    </div>
  </nav>

  <nav v-else class="navbar navbar-expand navbar-light bg-light mb-4 ">
    <img :src="logoBrand" class="logoNav" alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link active" to="/login">Login</router-link>

      </div>
    </div>
  </nav>
  </div>
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
    isAdmin: {type: Boolean, default: false},

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