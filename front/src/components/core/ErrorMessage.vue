<template>
  <div class="content-alert">
    <div :class="['alert', 'alert-custom', error.type]" v-for="error in errors">
      <span>{{error.message}}</span>
      <button type="button" class="btn-close" @click="removeAlert(error)"></button>
    </div>

  </div>

</template>

<script>

export default {
  name: "ErrorMessage",

  methods: {
    removeAlert(error){
      this.$store.dispatch('removeError', error)
    }
  },
  computed: {
    errors(){
      return this.$store.getters.getErrors
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/sass/variables";
.content-alert {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5000;
.alert-custom {
  box-shadow: $bgShadow;
  margin: 15px;
  border-radius: 16px;
  span{
    font-weight: bold;
  }
  button{
    &.btn-close{
      right: 8px;
      top: 8px;
      font-size:10px
    }

    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 12px;

  }
  &.success{
   color: white;
   background: #a5e794;
  }
  &.error{
  color: white;
  background: #eb6f6f;
  }
  }
}
</style>