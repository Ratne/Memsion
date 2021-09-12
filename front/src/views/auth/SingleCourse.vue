<template>
  <div class="home">
   <SummaryCourse :course="course" @setShowEdit="showEdit = true"/>

    <EditCourse :course="course" @updateCourse="editCourseAction" v-if="showEdit" />

    <LessonList :lessons="course.lessons" @goToLesson="goToLesson" @showEditLesson="showEditLesson = true" />




    <!--edit lesson-->
  <div v-if="showEditLesson">
    <h2>Aggiungi Lezione</h2>
    <form @submit.prevent="lessonAdd">
      <FormGroupCustom :error="errors['name']" v-model:value="lesson.name" label="name" type="text"></FormGroupCustom>
      <editor-text-area v-model:dataValue="lesson.description" />
      <editor-text-area v-model:dataValue="lesson.content" />
      <FormGroupCustom :error="errors['image']" v-model:value="lesson.image" label="image" type="text"></FormGroupCustom>
      <FormGroupCustom v-model:value="lesson.video" label="video" type="text"></FormGroupCustom>
      <FormGroupCustom :error="errors['requiredTag']" v-model:value="lesson.requiredTag" label="tag" type="number"></FormGroupCustom>
      <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>
    </form>
  </div>
    <!--edit lesson-->


<!--    caricamento dell'immagine-->
  </div>


  <div>
    <!--course delete-->
    <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteCourse">ELIMINA CORSO</button>
  </div>
</template>

<script>


import {coursesDelete, coursesShow, coursesUpdate} from "../../services/coursesService";
import {lessonStore} from "../../services/lessonService";
import FormGroupCustom from "../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../mixins/validationMixin";
import {validationTypeName} from "../../utils/validationType";
import EditorTextArea from "../../components/shared/form/EditorTextArea";
import SummaryCourse from "../../components/views/single_course/SummaryCourse";
import EditCourse from "../../components/views/single_course/EditCourse";
import LessonList from "../../components/views/single_course/LessonList";


export default {
  name: 'SingleCourse',
  components: {LessonList, EditCourse, SummaryCourse, FormGroupCustom, EditorTextArea},
  data(){
    return {
      course: {},
      lesson: {},
      showEdit: false,
      showEditLesson: false,
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
       lessonStore(this.lesson,this.course._id).then(res =>{
         this.course.lessons.push(res.lesson);
         this.lesson = {};
         this.showEditLesson=false;
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
    },
    editCourseAction(editCourse){
      coursesUpdate(editCourse).then(res =>{
        this.course = {...editCourse}
        this.showEdit = false;
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
