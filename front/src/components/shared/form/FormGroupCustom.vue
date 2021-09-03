<template>

  <div class="form-group">
    <label>{{ label }}</label>
    <input :disabled="disabled" v-if="type !== 'textarea'" :value="value" @input="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" />
    <textarea :disabled="disabled" v-if="type === 'textarea'" :value="value" @change="$emit('update:value', $event.target.value)" :class="['form-control', {error: error}]" :type="type" >{{value}}</textarea>
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