<template>
  <!--lessons-->
  <div class="container">
    <h1>Elenco Lezioni</h1>
    <div class="row">
      <div class="card mb-sm-2 ms-2 mx-2 lessonAdminList" style="width: 18rem;" v-for="lesson in lessons" @click="$emit('goToLesson', lesson._id)">
        <img :src="lesson.image" class="card-img-top mt-2" alt="course image">
        <div class="card-body">
          <h5 class="card-title">{{lesson.name}}</h5>
          <p class="card-text" v-if="lesson.requiredTag">Tag: {{lesson.requiredTag}}</p>
        </div>
      </div>
    </div>

  </div>
  <!--lessons-->
</template>

<script>



export default {
  name: 'LessonList',
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
    background-color: $bgCard;
    border-radius: 20px;
    border: none;
    color: $colorUserCard;
    box-shadow: $bgShadow;
  }


}

</style>