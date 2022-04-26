<template>
  <Vimeo :video-id=url></Vimeo>

</template>

<script>
import {Vimeo} from "@vime/vue-next";
export default {
  name: "VimeoCustom",
  components: {Vimeo},
  props: {
    src: {type: String}
  },
  computed: {
    url(){
      const arr = this.src.split('/')
      return arr[arr.length-1]


    }
  }
}
</script>

<style lang="scss" scoped>
.vimeoFrame{
  aspect-ratio: 16/9;
}
</style>
