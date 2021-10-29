<template>

<div class="mt-2 mb-2">
        <editor :apiKey="apiTiny" v-model="value"
                :init="{
           height: 300,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | code \
             bullist numlist outdent indent | removeformat | help'
         }"
        />

</div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "EditorTextArea",
  components: {Editor},
  props: ["dataValue"],
  data(){
    return{
      value: '',
      apiTiny: process.env.VUE_APP_APIKEY,
    }
  },
  watch: {
    dataValue(){

      this.value = this.dataValue || ''
    },
    value(){

      this.$emit("update:dataValue", this.value)
    }
  }
}
</script>

<style scoped>

</style>