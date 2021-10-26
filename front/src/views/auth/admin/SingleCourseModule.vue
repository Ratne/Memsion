<template>
  <div class="home">

<LessonList :lessons="module.lessons" @goToLesson="goToLessonId"/>


  </div>

<div>
  <button @click="showAddLesson =  true" class="btn btn-primary">Aggiungi Lezione</button>
</div>
  <div>
    <!--module delete-->
    <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteModule">ELIMINA MODULO</button>
  </div>

  <AddLesson v-if="showAddLesson" @addLesson="lessonAdd"/>
</template>

<script>


import {lessonStore} from "../../../services/lessonService";
import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import SummaryCourse from "../../../components/views/single_course/SummaryCourse";
import EditCourse from "../../../components/views/single_course/EditCourse";
import LessonList from "../../../components/views/single_course/LessonList";
import {setFormDataWithImage} from "../../../utils/requestUtils";
import ModulesList from "../../../components/views/single_course/ModulesList";
import {moduleDelete, moduleShow} from "../../../services/moduleService";
import ModuleAdd from "../../../components/views/single_course/ModuleAdd";
import AddLesson from "../../../components/views/single_course/AddLesson";


export default {
  name: 'SingleCourseModule',
  components: {AddLesson, ModuleAdd, ModulesList, LessonList, EditCourse, SummaryCourse, FormGroupCustom, EditorTextArea},
  data(){
    return {
      module: {},
      showAddLesson: false,
      courseId: this.$route.params.courseId,
      moduleId: this.$route.params.moduleId
    }
  },
  methods:{

    // definisci riga 54, non esiste qui course.lesson , metti in un componente il form di aggiunta lezione
    lessonAdd(data){
      this.$store.dispatch('resetErrors');
      let formData = setFormDataWithImage({...data.lesson, module: this.moduleId})
       lessonStore(formData,this.courseId).then(res =>{
         this.module.lessons.push(res);
         data.callback()
         this.showAddLesson=false;
       })

    },
    goToLessonId(lessonId){
      this.$router.push({
        name: 'SingleLesson',
        params: {
          courseId: this.courseId,
          lessonId
        }
      })
    },
    deleteModule(){
      moduleDelete(this.$route.params.courseId, this.$route.params.moduleId).then(res =>{
        this.$router.push({
          name: 'SingleCourse',
          params:{
            id: this.$route.params.courseId
          }
        })

      })
    }
  },
  mounted() {
   moduleShow(this.$route.params.courseId, this.$route.params.moduleId).then(res =>{
     this.module=res
   })
  },
}
</script>
