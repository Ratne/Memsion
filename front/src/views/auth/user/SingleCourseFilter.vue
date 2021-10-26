<template>
  <div class="container-fluid">

    <div class="row">
      <div class="col-sm-12 col-md-3 leftSide">
        <CourseMenu @goToLesson="goToLesson" :courseId="course._id" :link="link" :menu="menu" :isAdmin="false" />
      </div>
      <div class="col-sm-12 col-md-9 rightSide">

        <div class="containerCourseLesson">
        <div v-if="selectLesson">
          <SelectLesson  :idLesson="selectLesson.idLesson" :idCourse="course._id" />
        </div>

        <div class="containerBackground" :style="{ backgroundImage: `url('${course.image}')` }" v-else>


          <div class="courseIntroduction">

             <div class="courseHeading">
             <h2>Benvenuto nel corso: {{course.name}}</h2>
              <h3 v-html="course.description"></h3>
              <p>Seleziona una lezione per continuare</p>
            </div>
          </div>
        </div>
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
import SelectLesson from "../../../components/views/single_course/SelectLesson";


export default {
  name: 'SingleCourseFilter',
  components: {
    SelectLesson,
    CourseMenu,
    ModulesList, LessonList, SummaryCourse},
  data(){
    return {
      course: {},
      link:[],
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
      this.link=res.menu
      if (this.$route.params.idLesson){
      const lesson = this.course.lessons.find(ele => ele._id === this.$route.params.idLesson)
      this.selectLesson = lesson ? {...lesson, idLesson: lesson._id } : lesson
      }
    });
  },

  computed:{
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
      return modules
    },


  }
}
</script>

<style scoped lang="scss">
@import "src/sass/variables";
.leftSide{
  order: 1;
}
.rightSide{
  order: 2;
}
.containerCourseLesson {
      box-shadow: $bgShadow;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 25px;
      background-color: $bgCard;
      border-radius: 20px;
      margin-top: 32px;
}
.containerBackground{
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 400px;

}
.courseIntroduction{
position: absolute;


  .courseBg{

  }

  .courseHeading{
    max-width: 320px;
    padding: 18px;
    background-color: white;
    position: relative;
    left: 80px;
    top: 80px;
    border-radius: 20px;
    h2{
      color: #1e6866;
    }

  }
}
@media(max-width: 960px){
  .courseIntroduction{
    position: unset;
    .courseHeading{
      margin-top: 12px;
      margin-left: 12px;
      position: unset;
    }
  }
}
@media(max-width: 768px){

    .leftSide{
      margin-top: 50px;
      order: 2;
    }
  .rightSide{
    order: 1;
  }
  }

</style>