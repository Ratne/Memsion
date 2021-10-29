<template>
  <div class="home">
<div class="container-fluid">
      <div v-if="course" class="row">
        <div class="col-sm-12 col-md-3">

          <CourseMenu class="menuAdmin" :link="course.menu"  :courseId="course._id" :menu="menu" />
        </div>
        <div class="col-sm-12 col-md-9">
          <SummaryCourse  :course="course" @showEdit="showEdit = true"/>

          <EditCourse  class="mt-5" :course="course" @updateCourse="editCourseAction" v-if="showEdit" />

          <ModulesList @goToModule="goToModule" @showModuleAdd="showModuleAdd = true" :modules="modules" />
          <ModuleAdd v-if="showModuleAdd" @addModule="moduleAdd" />

        </div>
        </div>
  <div class="row text-end">
    <div class="col-12">
      <!--course delete-->
      <button class="btn btn-danger mt-3 mb-3" type="submit" @click="deleteCourse">ELIMINA CORSO</button>
    </div>
  </div>
      </div>

  </div>



</template>

<script>


import {coursesDelete, coursesShow, coursesUpdate} from "../../../services/coursesService";
import {lessonStore} from "../../../services/lessonService";
import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import SummaryCourse from "../../../components/views/single_course/SummaryCourse";
import EditCourse from "../../../components/views/single_course/EditCourse";
import LessonList from "../../../components/views/single_course/LessonList";
import {setFormDataWithImage} from "../../../utils/requestUtils";
import ModulesList from "../../../components/views/single_course/ModulesList";
import {modulesIndex, modulesStore} from "../../../services/moduleService";
import ModuleAdd from "../../../components/views/single_course/ModuleAdd";
import CourseMenu from "../../../components/views/single_course/CourseMenu";
import GoBack from "../../../components/shared/design/GoBack";


export default {
  name: 'SingleCourse',
  components: {
    GoBack,
    CourseMenu,
    ModuleAdd, ModulesList, LessonList, EditCourse, SummaryCourse, FormGroupCustom, EditorTextArea},
  data(){
    return {
      course: undefined,
      modules: [],
      moduleNew: {},
      showModuleAdd: false,
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
    goToModule(moduleId){
      this.$router.push({
        name: 'SingleCourseModule',
        params: {
          courseId: this.course._id,
          moduleId
        }
      })
    },
    lessonAdd(){
      this.$store.dispatch('resetErrors');
      let formData = setFormDataWithImage(this.lesson)
      if (this.isValid(this.lesson)){
       lessonStore(formData,this.course._id).then(res =>{
         this.course.lessons.push(res);
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
      if(confirm("Vuoi eliminare il corso?")) {
        coursesDelete(this.course._id).then(res => {
          this.$router.push({
            name: 'Home',
          })
        })
      }
    },
    editCourseAction(editCourse){
      delete editCourse.image
      coursesUpdate(editCourse).then(res =>{
        this.course = {...this.course, ...editCourse}
        this.showEdit = false;
      })
    },
    onFileChange(event){
      this.lesson.image = event.target.files[0]
    },
    moduleAdd(moduleNew){
      modulesStore(this.$route.params.id, moduleNew).then(res =>{
        this.modules.push(res.module);
      })

      this.showModuleAdd = false
    }
  },
  mounted() {
    coursesShow(this.$route.params.id).then(res =>{
      this.course=res
      this.modules=res.modules

    });
  },

  computed:{
    allValidations(){
      return [...this.validazione]
    },
    menu(){
      const modules = this.modules.map(module => {
        return {
          label: module.label,
          type: 'module',
          id: module._id,
          lessons: this.course.lessons.filter(lesson =>{
           return lesson.module === module._id
        }).map(lesson =>{
          return {
            name: lesson.name ,
            idLesson: lesson._id
          }
          }
          )
        }
      })
      return [...modules, ...(this.course?.menu || [])]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
