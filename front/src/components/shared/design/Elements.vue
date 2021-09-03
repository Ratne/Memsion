<template>
  <div class="row">
    <div class="col-6" v-for="element in elements">
      <Element :label="element.label" :value="element.value"></Element>
    </div>
  </div>
</template>

<script>
import Element from "./Element";
export default {

  name: "Elements",
  components:{
    Element
  },
  props: {
    elements: {
      type: Array,
      default: ()=> []
    }
  }
}
</script>

<style scoped>

</style>