<template>

  <div class="container">
    <h2>Modifica Lezione</h2>
    <form @submit.prevent="editLessonAction">
      <FormGroupCustom :error="errors['name']" v-model:value="editLesson.name" label="name" type="text"></FormGroupCustom>
      <editor-text-area v-model:dataValue="editLesson.description" />
      <editor-text-area v-model:dataValue="editLesson.content" />
      <FormGroupCustom :error="errors['image']" v-model:value="editLesson.image" label="image" type="text"></FormGroupCustom>
      <FormGroupCustom v-model:value="editLesson.video" label="video" type="text"></FormGroupCustom>
      <FormGroupCustom :error="errors['requiredTag']" v-model:value="editLesson.requiredTag" label="tag" type="number"></FormGroupCustom>
      <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Modifica Lezione</button>
    </form>

  </div>
    <!--edit lesson-->



</template>

<script>


import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";


export default {
  name: 'EditLesson',
  components: {FormGroupCustom, EditorTextArea},
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
        },
        {
          name: 'image',
          validation: {
            type: validationTypeName.required,
          }
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
