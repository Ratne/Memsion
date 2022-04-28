<template>
    <h2 :class="['fw-light text-uppercase pb-3', className]">{{ label }}</h2>
</template>





<script>
export default {
  name: "TitleH2",
  props: ['label','className'],
}
</script>

<style lang="scss" scoped>

</style>
