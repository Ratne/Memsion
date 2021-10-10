<template>
  <div class="home">
    <div class="row">
      <div class="col-3">
        <CourseMenu @goToLesson="goToLesson" :courseId="course._id" :menu="menu" :isAdmin="false" />
      </div>
      <div class="col-9">


        <div v-if="selectLesson">
          {{selectLesson}}
        </div>




      </div>
    </div>
  </div>


</template>

<script>


import {coursesFilterShow} from "../../../services/coursesService";
import SummaryCourse from "../../../components/views/single_course/SummaryCourse";
import LessonList from "../../../components/views/single_course/LessonList";
import ModulesList from "../../../components/views/single_course/ModulesList";
import CourseMenu from "../../../components/views/single_course/CourseMenu";


export default {
  name: 'SingleCourseFilter',
  components: {
    CourseMenu,
    ModulesList, LessonList, SummaryCourse},
  data(){
    return {
      course: {},
      modules: [],
      selectLesson: undefined
    }
  },
  methods:{
    goToLesson(lesson){
      this.selectLesson = lesson
    },
  },
  mounted() {
    coursesFilterShow(this.$route.params.id).then(res =>{
      this.course=res
      this.modules=res.modules

    });
  },

  computed:{
    menu(){
      const modules = this.modules.map(module => {
      debugger
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