<template>

  <quill-editor
      v-model="value"
      :options="editorOption"
      @change="onEditorChange($event)"
  />



</template>

<script>
import {quillEditor} from 'vue3-quill'

export default {
  name: "EditorTextAreaV2",
  components: {quillEditor},
  props: ["dataValue"],
  data(){
    return{
      value: '',
      editorOption: {
        // opz
      }
    }
  },
  methods:{
    onEditorChange({ html }) {
      this.$emit("update:dataValue", html)
    }
  },
  watch: {
    value(){
      this.$emit("update:dataValue", this.dataValue)
    }
  }
}

/*

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


 */
</script>

<style scoped>
</style>
