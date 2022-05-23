<template>

    <div>
      <label class="me-3">{{label}} </label>
      <div class="form-check form-check-inline" v-for="radio in data">
        <input @change="$emit('update:value', $event.target.value)" v-model="value" class="form-check-input" type="radio" :name="radio.name" :id="radio.id" :value="radio.value">
        <label class="form-check-label" :for="radio.id">
          {{ radio.label }}
        </label>
      </div>
    </div>



</template>

<script>
export default {
  name: "RadioList",
  props: {
    label: {type: String},
    data: {type: Array, default: () => []},
    value: {},
  },
}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";
.error {
  border: 1px solid red
}
.form-control{
  border: none;
  border-bottom: 1px solid black;
  color: black;
  text-transform: uppercase;
  border-radius: 0px;
  font-size: 20px;
}

</style>
