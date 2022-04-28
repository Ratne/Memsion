<template>
  <ErrorMessage />
  <router-view/>
</template>

<style lang="scss">

@import "sass/index";

</style>
<script>
import ErrorMessage from "./components/core/ErrorMessage";
export default {
  components: {ErrorMessage}
}
</script>
