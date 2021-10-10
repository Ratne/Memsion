<template>
  <div class="home">
    <div class="container">
      <h1>User Courses</h1>
      <div class="row">
    <div class="card mb-sm-2 ms-2 mx-2" style="width: 18rem;" v-for="course of courses" @click="goToCourse(course._id)">
        <img :src="course.image" class="card-img-top mt-2" alt="course image">
        <div class="card-body">
         <h5 class="card-title">{{course.name}}</h5>
         <p class="card-text" v-html="course.description"></p>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script>


import {coursesFilterIndex} from "../../../services/coursesService";


export default {
  name: 'UserCourses',
  data(){
    return {
      courses:[],
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
