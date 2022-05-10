<template>


  <Player id="vidVimeo" playsinline
          controls
          ref="player"
          @vmCurrentTimeChange="this.$emit('onTimeUpdate', $event)"
          @vmDurationChange="this.$emit('getDuration', $event)"
  >
    <Vimeo :video-id=url></Vimeo>

  </Player>


</template>

<script>
import {Player, Vimeo} from "@vime/vue-next";
export default {
  name: "VimeoCustom",
  components: {Player, Vimeo},
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
@import '~@vime/core/themes/default.css';
</style>
