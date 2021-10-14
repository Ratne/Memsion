export const copyUrlMixin = {

  methods: {
    copyUrl(route){
      const resolve = this.$router.resolve(route)
      const textCopy = `${window.location.origin}${resolve.href}`
      navigator.clipboard.writeText(textCopy)
    }
  }
}