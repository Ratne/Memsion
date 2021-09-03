<template>
  <div class="content-alert">
    <div :class="['alert', 'alert-custom', error.type]" v-for="error in errors">
      <span>{{error.message}}</span>
      <button type="button" class="btn-close" @click="removeAlert(error)"></button>
    </div>

  </div>

</template>

<script>
import dataErrors, {removeErrors} from "./dataErrors";

export default {
  name: "ErrorMessage",
  // data(){
  //   return {
  //     errors:[]
  //   }
  // },
  methods: {
    removeAlert(error){
      // removeErrors(error.id)
      this.$store.dispatch('removeError', error)
    }
  },
  computed: {
    errors(){
      return this.$store.getters.getErrors
    }
  },
 // mounted(){
    // const self = this;
    // dataErrors.update=(errors)=>{
    //   self.errors = errors
    // }
 // }
}
</script>

<style scoped lang="scss">
.content-alert {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5000;
.alert-custom {
  margin: 15px;
  border: 2px solid #115769;
  background: aquamarine;
  button{
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 12px;
  }
  &.success{
   color: #33db33;
  }
  &.error{
  color: #db3333
  }
  }
}
</style>