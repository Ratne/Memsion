<template>
  <div class="singleCourse mt-5 pt-5 container-fluid">

    <div class="row">
      <div class="col-sm-12 col-md-9 leftSide">
        <div class="containerCourseLesson">
          <div v-if="selectLesson">
            <SelectLesson :idLesson="selectLesson.idLesson" :idCourse="course._id"/>
          </div>
          <div class="containerBackground" v-else>
            <TitleH3 label="Introduzione"/>
            <div class="d-flex">
              <div class="imageContainer">
                <img :src="course.image"/>
              </div>

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
            <div class="p-3">  <TitleH3 class="mt-3" label="Seleziona una lezione per continuare"></TitleH3>
              <ListLessons :lessons="menu" @goToLesson="goToLesson"></ListLessons></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-3 rightSide">
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
      selectLesson: undefined
    }
  },
  methods: {
    goToLesson(lesson) {
      this.selectLesson = lesson
    },
  },
  mounted() {
    coursesFilterShow(this.$route.params.id).then(res => {
      this.course = res
      this.modules = res.modules
      this.link = res.menu
      if (this.$route.params.idLesson) {
        const lesson = this.course.lessons.find(ele => ele._id === this.$route.params.idLesson)
        this.selectLesson = lesson ? {...lesson, idLesson: lesson._id} : lesson
      }
    });
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

    .courseBg {

    }

    .courseHeading {


    }
  }

  .containerCourseLesson {

  }
}


.leftSide {
  order: 1;
}

.rightSide {
  order: 2;
}


.containerBackground {

}

@media(max-width: $md-device) {

  .leftSide {
    order: 1;
  }
  .rightSide {
    margin-top: 50px;
    order: 2;
  }
}

</style>
