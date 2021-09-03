<template>
  <div class="card">
    <div class="card-header">
      {{ title }}
    </div>
    <div class="card-body">
     <slot></slot>

    </div>
  </div>
</template>

<script>
export default {
  name: "CardCustom",
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>