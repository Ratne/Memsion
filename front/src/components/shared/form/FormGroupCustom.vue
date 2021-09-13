<template>

  <div class="form-group mt-2 mb-2">
    <label>{{ label }}</label>
    <input :disabled="disabled" v-if="type === 'text'" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <input :disabled="disabled" v-if="type === 'number'" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <input :disabled="disabled" v-if="type === 'password'" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <input :disabled="disabled" v-if="type === 'file'" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" />
    <textarea :disabled="disabled" v-if="type === 'textarea'" :value="value" @change="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" :name="name" >{{value}}</textarea>
<!--    <select @change="$emit('update:value', $event.target.value === '-1' ? undefined : $event.target.value)" :disabled="disabled" v-if="type === 'select'" :value="value || '-1'" :class="['form-control', {error: error}]" :type="type" >-->
<!--      <option :disabled="option.disabled" v-for="option of options" :value="option.value">{{option.label}}</option>-->
<!--    </select>-->


    <div style="color: red" v-if="error">{{error}}</div>
  </div>


</template>

<script>
export default {
  name: "FormGroupCustom",

  props: {
    label: {type: String},
    value: {},
    type: {type: String, default: 'text'},
    name: {type: String},
    options: {type: Array, default: () => []},
    disabled: {type: Boolean, default: false},
    error: {type: String},
  }
}
</script>

<style type="text/css" scoped>
.error {
  border: 1px solid red}

</style>