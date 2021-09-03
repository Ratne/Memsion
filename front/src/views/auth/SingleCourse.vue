<template>
  <div class="home">

        {{ course.name }} - {{ course.requiredTag }}
    <!--lessons-->

        <div><h1>Elenco lezioni</h1>
          <ul v-if="course.lessons">
            <li @click="goToLesson(lesson._id)" v-for="lesson in course.lessons">Titolo: {{lesson.name}}</li>
          </ul>
        </div>

    <form @submit.prevent="lessonAdd">
      {{lesson}}
      <FormGroupCustom :error="errors['name']" v-model:value="lesson.name" label="name" type="text"></FormGroupCustom>
      <editor-text-area v-model="lesson.description" />
      <editor-text-area v-model="lesson.content" />
      <FormGroupCustom :error="errors['image']" v-model:value="lesson.image" label="image" type="text"></FormGroupCustom>
      <FormGroupCustom :error="errors['requiredTag']" v-model:value="lesson.requiredTag" label="tag" type="number"></FormGroupCustom>
      <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>
    </form>


<!--    aggiornamento del corso-->
<!--    aggiornamento della lezione -->
<!--    caricamento dell'immagine-->
<!--    al click ci sarà dettaglio lezione e aggiornamento lezione-->
<!--    al click ci sarà dettaglio lezione e aggiornamento lezione e eliminazione della lezione-->
  </div>


  <div>
    <!--course delete-->
    <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteCourse">ELIMINA CORSO</button>
  </div>
</template>

<script>


import {coursesDelete, coursesShow} from "../../services/coursesService";
import {lessonStore} from "../../services/lessonService";
import FormGroupCustom from "../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../mixins/validationMixin";
import {validationTypeName} from "../../utils/validationType";
import EditorTextArea from "../../components/shared/form/EditorTextArea";


export default {
  name: 'SingleCourse',
  components: {FormGroupCustom, EditorTextArea},
  data(){
    return {
      course: {},
      lesson: {},
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
    lessonAdd(){
      this.$store.dispatch('resetErrors');
      if (this.isValid(this.lesson)){
        console.log(this.lesson)
       lessonStore(this.lesson,this.course._id).then(res =>{
         this.course.lessons.push(res)
         this.lesson = {}
       })
      }
    },
    goToLesson(lessonId){
      this.$router.push({
        name: 'SingleLesson',
        params: {
          courseId: this.course._id,
          lessonId
        }
      })
    },
    deleteCourse(){
      coursesDelete(this.course._id).then(res =>{
        this.$router.push({
          name: 'Home',
        })
      })
    }
  },
  mounted() {
    coursesShow(this.$route.params.id).then(res =>{
      this.course=res
    })
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
