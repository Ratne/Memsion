<template>
<div>



  <template v-if="user">
    <navbar :isAdmin="user.isAdmin" />
    <router-view/>
  </template>


</div>

</template>

<script>

import Navbar from "../../components/core/Navbar";
import {http} from "../../utils/http";
export default {
  name: "AuthPage",
  components: {Navbar},

  mounted() {
    http.get('/auth').then(res =>{
      this.$store.dispatch('setUser', res)
    })
  },
  computed: {
    user(){
      return this.$store.getters.getUser
    }
  }
}

</script>

<style scoped>

</style>