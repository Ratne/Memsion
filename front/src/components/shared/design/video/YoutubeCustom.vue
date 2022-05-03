<template>
  <Player id="vidYoutube" playsinline
          controls
          ref="player"
          @vmCurrentTimeChange="this.$emit('onTimeUpdate', $event)"
          @vmDurationChange="this.$emit('getDuration', $event)"
  >
    <Youtube :video-id=url></Youtube>

  </Player>


</template>

<script>
import {Player, Youtube} from "@vime/vue-next";
export default {
  name: "YoutubeCustom",
  components:{Player, Youtube},
  props: {
    src: {type: String}
  },
  methods: {
    getYoutubeNumber(){

      const arr = this.src.split('?v=')
      return arr[1]

    },
    getYoubeNumber(){

      const arr = this.src.split('/')
      return arr[arr.length-1]
    }
  },

  computed: {
    url(){
        return  this.src.includes('youtube') ? this.getYoutubeNumber() : this.getYoubeNumber()
    }
  },
}


</script>

<style scoped>

</style>
