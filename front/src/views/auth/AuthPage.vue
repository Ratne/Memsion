<template>
<div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link @click.prevent="logout" to="/logout">Logout</router-link>
  </div>
  <router-view/>
  <h2>Auth</h2>
</div>

</template>

<script>

export default {
  name: "AuthPage",
  methods:{
    logout() {
      this.$store.dispatch('logout')
    }
  }
}

</script>

<style scoped>

</style>