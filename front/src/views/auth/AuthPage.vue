<template>
<div>

    <navbar :isAdmin="true" />

  <router-view/>

</div>

</template>

<script>

import Navbar from "../../components/core/Navbar";
export default {
  name: "AuthPage",
  components: {Navbar},
}

</script>

<style scoped>

</style>