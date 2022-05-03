<template>
  <ErrorMessage />
  <router-view/>



</template>

<style lang="scss">

@import "sass/index";

</style>
<script>
import ErrorMessage from "./components/core/ErrorMessage";
import VimeoCustom from "./components/shared/design/video/VimeoCustom";
export default {
  components: {VimeoCustom, ErrorMessage}
}
</script>
