<template>
  <!--add lesson-->
  <div class="container text-start">
    <h2 class="text-center">Aggiungi Lezione</h2>
    <form @submit.prevent="lessonAdd">
      <FormGroupCustom :error="errors['name']" v-model:value="lesson.name" label="name" type="text"></FormGroupCustom>
      <span>Descrizione Lezione</span>
      <editor-text-area v-model:dataValue="lesson.description" />
      <span class="text-start">Contenuto Lezione</span>
      <editor-text-area v-model:dataValue="lesson.content" />
      <FormGroupCustom name="image" :error="errors['image']" @change="onFileChange" label="image" type="file"></FormGroupCustom>
      <div class="py-2">
        <RadioList v-model:value="lessonType" label="Scegli il tipo della lezione: " :data="radioListData"/>

      </div>
      <FormGroupCustom v-if="lessonType === 'video'" v-model:value="lesson.video" label="video" type="text"></FormGroupCustom>
      <FormGroupCustom v-else v-model:value="lesson.script" label="script" type="text"></FormGroupCustom>
      <FormGroupCustom :error="errors['requiredTag']" v-model:value="lesson.requiredTag" label="tag" type="number"></FormGroupCustom>
      <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>
    </form>
    <div class="text-start mb-4"><icon-button label="Chiudi" icon="bi bi-x-circle" @click="closeModalView"/></div>
  </div>
    <!--add lesson-->



</template>

<script>


import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import IconButton from "../../shared/design/iconButton";
import RadioList from "../../shared/form/RadioList";


export default {
  name: 'AddLesson',
  components: {RadioList, IconButton, FormGroupCustom, EditorTextArea},
  data(){

    return {
      lesson: {},
      lessonType: 'video',
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
    lessonAdd(){
      if (this.isValid(this.lesson)) {
        const callback = () => this.lesson={}
        this.$emit('addLesson', {
          lesson: this.lesson,
          callback
        })
      }
    },
    closeModalView(){
      this.$emit('closeModalView')
    },
    onFileChange(event){
      this.lesson.image = event.target.files[0]
    },
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  },
  watch: {
    lessonType(newValue, oldValue){
      if (newValue === 'video') {
        this.lesson.video = ''
        this.lesson.script = undefined
      } else {
        this.lesson.video = undefined
        this.lesson.script = ''
      }
    }
  }
}
</script>
