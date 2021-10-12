<template>
<div>
  <VimeoCustom v-if="isElement.isVimeo" :src="url" />
  <YoutubeCustom v-else-if="isElement.isYoutube" :src="url" />
  <div v-else>Youtube or vimeo url not found</div>

</div>
</template>

<script>
import VimeoCustom from "./VimeoCustom";
import YoutubeCustom from "./YoutubeCustom";
export default {
  name: "VideoCustom",
  components: { YoutubeCustom, VimeoCustom},
  props: {
    url: {type: String}
  },
  data() {
    return {
    isElement: {}
    }
  },

  mounted() {

    this.isElement = this.checkUrl(this.url)

  },
  methods: {
    checkUrl(url){
      const isYoutube = url.includes('youtube') || url.includes('youtu.be')
      const isVimeo = url.includes('vimeo')
      return {
        isYoutube,
        isVimeo,
        isNone: !isYoutube && !isVimeo
      }
    }
  }


}
</script>

<style scoped>

</style>