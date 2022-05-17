<template>
  <!--lessons-->

  <div class="container-fluid">
    <TitleH1 label="Elenco Lezioni" />
    <div class="row bgGrayLight py-3">
      <div class="card mb-2 ms-2 mx-2 lessonAdminList" style="width: 18rem;" v-for="lesson in lessons" @click="$emit('goToLesson', lesson._id)">
        <div class="imgLesson"><img :src="lesson.image" class="card-img-top mt-2" alt="course image"></div>
        <div class="card-body">
          <h5 class="card-title">{{lesson.name}}</h5>
          <p class="badge text-black bg-primary" v-if="lesson.requiredTag">Tag: {{lesson.requiredTag}}</p>
        </div>
      </div>
    </div>
</div>

  <!--lessons-->
</template>

<script>



import TitleH1 from "../../shared/design/TitleH1";
export default {
  name: 'LessonList',
  components: {TitleH1},
  props: {
    lessons: {type: Array, default: ()=> [] }
  },
}
</script>
<style lang="scss" scoped>
@import "src/sass/variables";

.card{
  cursor: pointer;


  &.lessonAdminList{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 15px;
    background-color: $white;
    border: none;
    color: $dark;
    min-height: 350px;
    .imgLesson{
      max-height: 130px;
      overflow: hidden;
      display: flex;
      align-items: center;
      min-height: 130px;
    }
  }


}

</style>
