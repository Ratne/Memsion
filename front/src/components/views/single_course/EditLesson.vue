<template>

  <div class="container text-start">
    <h2 class="mt-5">Modifica Lezione</h2>
    <form @submit.prevent="editLessonAction">
      <FormGroupCustom :error="errors['name']" v-model:value="editLesson.name" label="name" type="text"></FormGroupCustom>
      <span class="text-start">Descrizione Lezione</span>
      <editor-text-area v-model:dataValue="editLesson.description" />
      <span class="text-start">Contenuto Lezione</span>
      <editor-text-area v-model:dataValue="editLesson.content" />
      <FormGroupCustom v-model:value="editLesson.video" label="video" type="text"></FormGroupCustom>
      <FormGroupCustom :error="errors['requiredTag']" v-model:value="editLesson.requiredTag" label="tag" type="number"></FormGroupCustom>
      <button class="btn btn-primary mt-3 mb-3 "  type="submit">Modifica Lezione</button>
    </form>
    <div class="text-start mb-4"><icon-button @click="closeModalView" icon="bi bi-x-circle" label="Chiudi" /></div>
  </div>
    <!--edit lesson-->



</template>

<script>


import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import IconButton from "../../shared/design/iconButton";


export default {
  name: 'EditLesson',
  components: {IconButton, FormGroupCustom, EditorTextArea},
  props: {
    lesson: {type: Object}
  },
  data(){

    return {
      editLesson: {},
      validazione: [
        {
          name: 'name',
          validation: {
            type: validationTypeName.required,}
        },
        {
          name: 'description',
          validation:
              {type: validationTypeName.required}
        },
        {
          name: 'content',
          validation:
              {type: validationTypeName.required}
        }
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    editLessonAction(){
      if (this.isValid(this.editLesson)) {
        this.$emit('editLesson', this.editLesson)
      }
    },
    closeModalView(){
      this.$emit('closeModalView')
    },
    init(){
      this.editLesson = {...this.lesson}
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    lesson(){
      this.init()
    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
