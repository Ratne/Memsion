<template>
    <h4 :class="['fw-bold text-primary pb-3', className]">{{ label }}</h4>
</template>





<script>
export default {
  name: "TitleH4",
  props: ['label','className'],
}
</script>

<style lang="scss" scoped>

</style>
