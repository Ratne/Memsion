<template>
  <div class="row">
    <div class="col-6">
      {{label}}
    </div>
    <div class="col-6">
      {{value}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Element",
  props: {
    label:{
      type: String
    },
    value: {}
  }
}
</script>

<style scoped>

</style>