<template>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <a v-if="token" href="#" @click="logout">Logout</a>
    </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>

export default {
  name: "Header",
  computed: {
    token(){
     return this.$store.getters.getToken
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    token && this.$store.dispatch('setToken', token)
  }
}
</script>