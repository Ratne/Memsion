<template>
    <h1 :class="['fw-bold text-uppercase pb-3', className]">{{ label }}</h1>
</template>





<script>
export default {
  name: "TitleH1",
  props: ['label','className'],
}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";
@import "src/sass/mediaQuery";
@media (max-width: $md-device) {
  h1{
    font-size: $h1fontmobile;
  }
}
</style>
