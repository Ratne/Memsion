<template>
<div>

    <NavbarAdmin />

  <router-view/>
  <h2>Auth</h2>
</div>

</template>

<script>

import NavbarAdmin from "../../components/shared/design/NavbarAdmin";
export default {
  name: "AuthPage",
  components: {NavbarAdmin},
}

</script>

<style scoped>

</style>