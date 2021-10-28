<template>
  <span class="customSpan" @click="customClick"><i :class="icon"></i><span class="ms-2">{{label}}</span></span>
</template>

<script>
export default {
  name: "iconButton",
  props:{
    icon: {type: String},
    label: {type: String}
  },
  methods:{
    customClick(){
      this.$emit('clickEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
.customSpan{
  cursor: pointer;
}
</style>