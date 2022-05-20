<template>
  <div>
    <icon-button icon="bi bi-arrow-left-circle" label="Torna Indietro" @clickEvent="goBack"/>
  </div>
</template>





<script>
import IconButton from "./iconButton";

export default {
  name: "GoBack",
  components: {IconButton},
  methods:{
    goBack(){
      return this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
