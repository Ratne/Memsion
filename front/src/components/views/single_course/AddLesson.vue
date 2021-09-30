<template>
  <!--add lesson-->
  <div class="container">
    <h2>Aggiungi Lezione</h2>
    <form @submit.prevent="lessonAdd">
      <FormGroupCustom :error="errors['name']" v-model:value="lesson.name" label="name" type="text"></FormGroupCustom>
      <editor-text-area v-model:dataValue="lesson.description" />
      <editor-text-area v-model:dataValue="lesson.content" />
      <FormGroupCustom name="image" :error="errors['image']" @change="onFileChange" label="image" type="file"></FormGroupCustom>
      <FormGroupCustom v-model:value="lesson.video" label="video" type="text"></FormGroupCustom>
      <FormGroupCustom :error="errors['requiredTag']" v-model:value="lesson.requiredTag" label="tag" type="number"></FormGroupCustom>
      <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>
    </form>

  </div>
    <!--add lesson-->



</template>

<script>


import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";


export default {
  name: 'AddLesson',
  components: {FormGroupCustom, EditorTextArea},
  data(){

    return {
      lesson: {},
      validazione: [
        {
          name: 'name',
          validation: {
            type: validationTypeName.required,}
        },
        {
          name: 'image',
          validation:
              {type: validationTypeName.required}
        },
        {
          name: 'requiredTag',
          validation:
              {type: validationTypeName.required}
        }
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    lessonAdd(){
      if (this.isValid(this.lesson)) {
        const callback = () => this.lesson={}
        this.$emit('addLesson', {
          lesson: this.lesson,
          callback
        })
      }
    },
    onFileChange(event){
      this.lesson.image = event.target.files[0]
    },
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
