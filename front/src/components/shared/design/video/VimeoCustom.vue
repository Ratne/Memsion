<template>
<div>
  <iframe :src="url" width="100%" class="vimeoFrame" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
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

<style lang="scss" scoped>
.vimeoFrame{
  aspect-ratio: 16/9;
}
</style>