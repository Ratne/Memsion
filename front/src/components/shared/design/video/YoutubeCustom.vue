<template>

  <Youtube :video-id=url></Youtube>

</template>

<script>
import {Youtube} from "@vime/vue-next";
export default {
  name: "YoutubeCustom",
  components:{Youtube},
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
.youtubeFrame{
  aspect-ratio: 16/9;
}
</style>
