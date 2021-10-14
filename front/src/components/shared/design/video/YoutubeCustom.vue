<template>
<div>
  <iframe width="50%" height="315" :src="url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>
</template>

<script>
export default {
  name: "YoutubeCustom",
  props: {
    src: {type: String}
  },
  methods: {
    getYoutubeNumber(){
      const arr = this.src.split('?v=')
      const number = arr[1]
      return `https://www.youtube.com/embed/${number}`

    },
    getYoubeNumber(){
      const arr = this.src.split('/')
      const number = arr[arr.length-1]
      return `https://www.youtube.com/embed/${number}`
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