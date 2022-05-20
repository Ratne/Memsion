<template>
  <div class="singleCourse mt-5 pt-5 container-fluid">

    <div class="row">
      <div class="col-sm-12">
        <div class="containerCourseLesson">

          <div v-if="selectLesson">
            <SelectLesson @goToLesson="goToLesson" :moduleList=menu :idLesson="selectLesson.idLesson" :idCourse="course._id" :courseName="course.name"/>
          </div>
          <div class="containerBackground px-md-5 px-2" v-else>
            <TitleH3 label="Introduzione"/>
            <div class="cardIntroduction">
              <div class="imageContainer">
                <img :src="course.image"/>
              </div>

              <br>
              <div class="courseIntroduction">
                <div class="courseHeading">
                  <TitleH2 :label="course.name"></TitleH2>

                  <p v-html="course.description"></p>

                </div>
              </div>
            </div>

          </div>
          <div class="row mt-5 listLessonContainer">

            <div class="col-12">
            <div class="px-md-5 px-2 pt-5 pb-5">  <TitleH3 class="mt-3" label="Scegli una lezione"></TitleH3>

              <ListLessons :selectLesson="selectLesson" :reverse="course.reverse" :lessons="menu" @goToLesson="goToLesson"></ListLessons></div>
            </div>

          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <CourseMenu @goToLesson="goToLesson" :courseId="course._id" :link="link" :menu="menu" :isAdmin="false"/>
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
import TitleH3 from "../../../components/shared/design/TitleH3";
import TitleH2 from "../../../components/shared/design/TitleH2";
import ListLessons from "../../../components/shared/design/ListLessons";
import {routeNames} from "../../../router/routeNames";


export default {
  name: 'SingleCourseFilter',
  components: {
    ListLessons,
    TitleH2,
    TitleH3,
    SelectLesson,
    CourseMenu,
    ModulesList, LessonList, SummaryCourse
  },
  data() {
    return {
      course: {},
      link: [],
      modules: [],
      selectLesson: undefined,
      selectModuleLabel: undefined
    }
  },
  methods: {
    setGoBack(){
      this.selectLesson ? this.$store.dispatch('setBackPage', {name: 'SingleCourseFilter', params: {id: this.course._id} }) : this.$store.dispatch('setBackPage', {name: 'Home'})
    },
    setSelectedLesson(){
      const lesson = this.course.lessons.find(ele => ele._id === this.$route.params.idLesson)
      this.selectLesson = lesson ? {...lesson, idLesson: lesson._id} : lesson
    },
    goToLesson(lesson, moduleLabel) {
      this.$router.push({
        name: routeNames.SingleCourseFilterWithLesson,
        params: {
          id: this.course._id,
          idLesson: lesson.idLesson
        }})
      const l =  this.course.lessons.find(ele => ele._id === lesson.idLesson)
      this.selectLesson = {...l, idLesson: l._id}
      this.selectModuleLabel= moduleLabel
      window.scrollTo(0,0)
    },
  },
  mounted() {
    this.setGoBack();
    coursesFilterShow(this.$route.params.id).then(res => {
      this.course = res
      this.modules = res.modules
      this.link = res.menu
      if (this.$route.params.idLesson) {
        this.setSelectedLesson()
      }
    });
  },
  watch:{
    selectLesson(){
      this.setGoBack()
    },
    [`$route.params.idLesson`](){
      if (this.$route.params.idLesson){
       this.setSelectedLesson()
      }
      else {
        this.selectLesson = undefined
      }
      },
  },
  beforeUnmount() {
    this.$store.dispatch('resetBackPage')
  },

  computed: {
    menu() {
      const modules = this.modules.map(module => {

        return {
          label: module.label,
          type: 'module',
          id: module._id,
          lessons: this.course.lessons.filter(lesson => {
            return lesson.module === module._id
          }).map(lesson => {
                return {
                  name: lesson.name,
                  image: lesson.image,
                  idLesson: lesson._id,
                  module: lesson.module,
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
@import "src/sass/mediaQuery";

.singleCourse {
  .imageContainer {
    width: 300px;
    min-width: 300px;
    overflow: hidden;
    background-color: white;

    img {
      width: 100%;
      height: auto;
    }
  }
  .listLessonContainer{
    background: $grayLight;
  }
  .courseIntroduction {
    padding-left: 18px;

  }
  .containerBackground {
    .cardIntroduction{
      display: flex;
    }

  }

  @media (max-width: $md-device) {
    .containerBackground {
      .cardIntroduction {
        flex-direction: column;
        .imageContainer{
          margin-bottom: 16px;
          width: 100%;
        }
      }
    }
  }
}






</style>
