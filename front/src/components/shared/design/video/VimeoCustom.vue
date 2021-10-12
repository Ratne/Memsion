<template>
<div>
  <iframe :src="url" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>
</template>

<script>
export default {
  name: "VimeoCustom",
  props: {
    src: {type: String}
  },
  computed: {
    url(){
      const arr = this.src.split('/')
      const number = arr[arr.length-1]
      return `https://player.vimeo.com/video/${number}`

    }
  }
}
</script>

<style scoped>

</style>