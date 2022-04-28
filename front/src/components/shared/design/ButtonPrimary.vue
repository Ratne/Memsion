<template>
  <button :disabled="disabled" class="btn btn-primary" @click="$emit('buttonClick')" type="submit">{{ label }}</button>
</template>





<script>
export default {
  name: "ButtonPrimary",
  props: {
    label: {type: String},
    type: {type: String, default: 'submit'},
    disabled: {type: Boolean}
  },
}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";
.btn-primary{
  background-color: $primary;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  color: $dark;
  border-radius: $borderRadius;
}
</style>
