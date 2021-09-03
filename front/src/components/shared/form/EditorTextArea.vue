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
      this.value = this.dataValue
    },
    value(){
      this.$emit("update:value", this.value)
    }
  }
}
</script>

<style scoped>

</style>