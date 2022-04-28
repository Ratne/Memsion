<template>
  <div class="card mb-5 mb-md-0 courseHomeUser px-5" @click="$emit('goToCourse', course._id)">
    <div class="ms-md-3 imageContainer"><img :src="course.image" alt="course image" /></div>
    <div class="card-body">
      <TitleH3 :label="course.name"></TitleH3>
      <p class="card-text text-start" v-html="course.description"></p>
    </div>
    <ButtonPrimary label="Entra" class="d-md-none mb-3"/>
    <div class="me-3 d-flex"><img class="playImage d-none d-md-block" src="assets/play.svg" alt="play" /></div>
  </div>
</template>





<script>
import TitleH3 from "./TitleH3";
import ButtonPrimary from "./ButtonPrimary";
export default {
  emits: ["goToCourse"],
  name: "CourseItems",
  components: {ButtonPrimary, TitleH3},
  props: {
    course:{
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";
@import "src/sass/mediaQuery";


.card{
  cursor: pointer;
  &.courseHomeUser{
    min-height: 220px;
    display: flex;
    flex-direction: row;
    background-color: $grayLight;
    margin-top: 24px;
    border: none;
    color: $dark;
    &:nth-child(odd){
      background-color: white;
    }
    .card-text{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .imageContainer{
      width: 350px;
      min-width: 350px;
      overflow: hidden;
      max-height: 220px;
      background-color: white;

      img{
        width: 100%;
        height: auto;
      }
    }

    .playImage{
      width: 72px;
    }
    @media (max-width: $md-device) {
      flex-direction: column;
      .imageContainer {
        min-width: 100%;
        max-height: fit-content;
       }
      }
  }



}
</style>
