<template>
  <div>
  <VimeoCustom v-if="isElement.isVimeo" @onTimeUpdate="onTimeUpdate" @getDuration="getDuration" :src="url" />
  <YoutubeCustom v-else-if="isElement.isYoutube" @onTimeUpdate="onTimeUpdate" @getDuration="getDuration" :src="url" />
  <Player v-else id="vid" playsinline
          controls
          ref="player"
          @vmCurrentTimeChange="onTimeUpdate"
          @vmDurationChange="getDuration"
  >
    <Video>
     <source
          :data-src=url
          type="video/mp4"
      />
    </Video>
  </Player>

  </div>
</template>
<script>
import {Player, Video, Youtube, Vimeo} from "@vime/vue-next";
import VimeoCustom from "./VimeoCustom";
import YoutubeCustom from "./YoutubeCustom";
export default {
  emits: ["timeupdate"],
  name: "VideoCustom",
  components: { YoutubeCustom, VimeoCustom, Player, Video, Youtube, Vimeo},
  props: {
    url: {type: String}
  },
  data() {
    return {
    isElement: {},
    currentTime: 0,
    timeoutVal: undefined,
    totalDuration: 0,
    }
  },
  beforeUnmount() {
    console.log('distrutto')
    this.currentTime && this.percentageUpdate(0)
  },
  mounted() {
    this.isElement = this.checkUrl(this.url)

  },
  computed: {
    percentage(){
      return (this.currentTime / this.totalDuration)*100
    }
  },
  methods: {
    checkUrl(url) {
      const isYoutube = url.includes('youtube') || url.includes('youtu.be')
      const isVimeo = url.includes('vimeo')
      return {
        isYoutube,
        isVimeo,
        isNone: !isYoutube && !isVimeo
      }
    },
    onTimeUpdate(time){
      this.currentTime = time
      this.percentageUpdate();
    },
    getDuration(duration){
      this.totalDuration = duration
    },
    percentageUpdate(setTime = 500){
      this.timeoutVal && clearTimeout(this.timeoutVal)
      this.timeoutVal = setTimeout(() => {
        const percUpdate = (this.currentTime / this.totalDuration)*100;
        this.$emit('timeupdate', percUpdate)
      }, setTime)
    }
  }


}
</script>

<style scoped>
@import '~@vime/core/themes/default.css';
</style>
