<template>
  <div class="home">
<LessonList :lessons="module.lessons" @goToLesson="goToLessonId"/>


  </div>

<div class="mt-3 mb-3">
  <icon-button  label="Aggiungi Lezione" icon="bi bi-plus-circle" @clickEvent="showAddLesson=true" />
  <go-back class="text-start mt-3 mb-3 ms-3" />
</div>
  <div class="container">
    <div class="row">
    <div class="col-12 text-end">
      <!--module delete-->
     <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteModule">ELIMINA MODULO</button>
    </div>
  </div>
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
import IconButton from "../../../components/shared/design/iconButton";
import GoBack from "../../../components/shared/design/GoBack";


export default {
  name: 'SingleCourseModule',
  components: {
    GoBack,
    IconButton,
    AddLesson, ModuleAdd, ModulesList, LessonList, EditCourse, SummaryCourse, FormGroupCustom, EditorTextArea},
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
      if(confirm("Vuoi eliminare il modulo?")){
      moduleDelete(this.$route.params.courseId, this.$route.params.moduleId).then(res =>{
        this.$router.push({
          name: 'SingleCourse',
          params:{
            id: this.$route.params.courseId
          }
        })

      })
      }
    }
  },
  mounted() {
   moduleShow(this.$route.params.courseId, this.$route.params.moduleId).then(res =>{
     this.module=res
   })
  },
}
</script>
