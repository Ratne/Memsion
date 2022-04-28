<template>

  <div class="form-group mt-2 mb-2">
    <label v-if="!noLabel">{{label}}</label>
    <input :disabled="disabled" v-if="type === 'text'" :placeholder="label" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <input :disabled="disabled" v-if="type === 'number'" :placeholder="label" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <input :disabled="disabled" v-if="type === 'password'" :placeholder="label" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <input :disabled="disabled" v-if="type === 'file'" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <textarea :disabled="disabled" v-if="type === 'textarea'" :value="value" @change="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" >{{value}}</textarea>
    <div style="color: red" v-if="error">{{error}}</div>
  </div>


</template>

<script>
export default {
  name: "FormGroupCustom",

  props: {
    label: {type: String},
    noLabel: {type: Boolean, default: false},
    value: {},
    type: {type: String, default: 'text'},
    name: {type: String},
    options: {type: Array, default: () => []},
    disabled: {type: Boolean, default: false},
    error: {type: String},
  }
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
