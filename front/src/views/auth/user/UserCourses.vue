<template>
  <div class="home">
    <div class="container">
      <div class="row">
    <div class="card mb-sm-2 ms-2 mx-2 courseHomeUser" style="width: 18rem;" v-for="course of courses" @click="goToCourse(course._id)">
      <img :src="course.image" class="card-img-top mt-2" alt="course image">
        <div class="card-body">
         <h5 class="card-title text-start">{{course.name}}</h5>
         <p class="card-text text-start" v-html="course.description"></p>
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

<style scoped lang="scss">
@import "src/sass/variables";
.card{
  cursor: pointer;


  &.courseHomeUser{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 25px;
    background-color: $bgCard;
    border-radius: 20px;
    margin-top: 32px;
    border: none;
    color: $colorUserCard;
    box-shadow: $bgShadow;
  };
  .card-text{
    max-height: 200px;
    overflow: auto;
  }

}

</style>