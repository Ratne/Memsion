<template>

  <div class="container text-start">
    <h2 class="mt-5">Modifica Lezione</h2>
    <form @submit.prevent="editLessonAction">
      <FormGroupCustom :error="errors['name']" v-model:value="editLesson.name" label="name" type="text"></FormGroupCustom>
      <span class="text-start">Descrizione Lezione</span>
      <editor-text-area v-model:dataValue="editLesson.description" />
      <span class="text-start">Contenuto Lezione</span>
      <editor-text-area v-model:dataValue="editLesson.content" />
      <div class="py-2">
        <RadioList v-model:value="lessonType" label="Scegli il tipo della lezione: " :data="radioListData"/>
      </div>
      <FormGroupCustom v-if="lessonType === 'video'" v-model:value="editLesson.video" label="video" type="text"></FormGroupCustom>
      <FormGroupCustom v-else v-model:value="editLesson.script" label="script" type="text"></FormGroupCustom>
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
import RadioList from "../../shared/form/RadioList";


export default {
  name: 'EditLesson',
  components: {RadioList, IconButton, FormGroupCustom, EditorTextArea},
  props: {
    lesson: {type: Object}
  },
  data(){

    return {
      editLesson: {},
      lessonType: 'video',
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
      ],
      radioListData: [
        {
          name: 'video',
          id: 'video',
          value: 'video',
          label: 'video'
        },
        {
          name: 'script',
          id: 'script',
          value: 'script',
          label: 'script'
        },

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
    },
    lessonType(newValue, oldValue){
      if (newValue === 'video') {
        this.editLesson.video = ''
        this.editLesson.script = undefined
      } else {
        this.editLesson.video = undefined
        this.editLesson.script = ''
      }
    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
