<template>
  <nav class="navbar navbar-expand navbar-light bg-light mb-4 ">
    <img :src="logoBrand" class="logoNav" alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="/login">Login</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarLogin",
  data(){
    return{
      logoBrand: process.env.VUE_APP_LOGOBRAND
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