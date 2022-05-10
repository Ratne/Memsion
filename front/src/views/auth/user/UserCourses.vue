<template>
  <div class="home mt-5">

      <div class="row px-md-5 px-2 mt-5">
        <div class="col-12">
          <TitleH1 className="text-start" :label="label"></TitleH1>
          <TitleH2 label="Elenco Corsi"></TitleH2>
        </div>
      </div>
    <div class="row">

          <CourseItems v-for="course of courses"  :course="course" @goToCourse="goToCourse"/>

    </div>
<!--      <div class="row">-->
<!--        <div class="card courseHomeUser px-5" v-for="course of courses" @click="goToCourse(course._id)">-->
<!--         <div class="ms-3 imageContainer"><img :src="course.image" alt="course image" /></div>-->
<!--           <div class="card-body">-->
<!--             <TitleH3 :label="course.name"></TitleH3>-->
<!--              <p class="card-text text-start" v-html="course.description"></p>-->
<!--           </div>-->
<!--          <div class="me-3 d-flex"><img class="playImage" src="assets/play.svg" alt="play" /></div>-->
<!--        </div>-->
<!--      </div>-->

  </div>
</template>

<script>


import {coursesFilterIndex} from "../../../services/coursesService";
import TitleH1 from "../../../components/shared/design/TitleH1";
import TitleH2 from "../../../components/shared/design/TitleH2";
import TitleH3 from "../../../components/shared/design/TitleH3";
import CourseItems from "../../../components/shared/design/CourseItems";


export default {
  name: 'UserCourses',
  components: {CourseItems, TitleH3, TitleH2, TitleH1},
  data(){
    return {
      courses:[],
      label: process.env.VUE_APP_COURSETITLE
    }
  },
  mounted() {
    coursesFilterIndex().then(res =>{
      this.courses=res
    })
  },
  methods:{
    goToCourse(id){
      this.$router.push({
        name: 'SingleCourseFilter',
        params: {
          id
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">


</style>
