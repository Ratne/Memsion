<template>
<div class="container">
  <h2>Caricamento in corso</h2>
</div>
</template>

<script>


import {autoLogin} from "../services/userService";
import lastRoute from "../guards/lastRoute";
export default {

  name: "AutoLogin",

  mounted() {
    autoLogin({
      id: this.$route.params.id ,
      userKey:  this.$route.params.userkey
    }).then(res =>{
      localStorage.setItem('token', res.token);
      this.$store.dispatch('setToken',res.token);
      this.$router.push(lastRoute.route? {name: lastRoute.route.name, params: lastRoute.route.params} : {name: 'Home'})
    }, err => {
      this.$store.dispatch('logout')
    })
  }

}




</script>

<style scoped>

</style>