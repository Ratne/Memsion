<template>


        <editor  v-model="value"
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
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }"
        />


</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "EditorTextArea",
  components: {Editor},
  props: ["dataValue"],
  data(){
    return{
      value: ''
    }
  },
  watch: {
    dataValue(){
      console.log(this.value, this.dataValue)
      this.value = this.dataValue || ''
    },
    value(){
      console.log(this.value)
      this.$emit("update:dataValue", this.value)
    }
  }
}
</script>

<style scoped>

</style>