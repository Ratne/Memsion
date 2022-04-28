<template>
    <h3 :class="['fw-bold text-uppercase pb-3', className]">{{ label }}</h3>
</template>





<script>
export default {
  name: "TitleH3",
  props: ['label','className'],
}
</script>

<style lang="scss" scoped>

</style>
