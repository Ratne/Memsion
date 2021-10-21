<template>
<div>
  <h2 class="text-start">Menu</h2> <span v-if="isAdmin" @click="goToMenuSettings">[EDIT MENU]</span>

    <div class="accordion">
      <template v-for="(m, index) in menu">
        <div v-if="m.url" @click="clickUrl(m.url)">{{m.label}}</div>
        <Accordion  v-else-if="m.lessons.length" :title="m.label" :index="index">
          <span @click="goToLesson(lesson)" v-for="lesson in m.lessons">
            {{lesson.name}}
          </span>
        </Accordion>
      </template>
    </div>


</div>
</template>



<script>



import Accordion from "../../shared/design/Accordion";
export default {
  name: "CourseMenu",
  components: {Accordion},
  props:{
    menu: {type: Array, default: () => []},
    courseId: {type: String},
    isAdmin: {type: Boolean , default: true}
  },
  methods: {
    clickUrl(url) {
      window.open(url, '_blank')
    },
    goToLesson(lesson){
      this.$emit('goToLesson', lesson)
      this.isAdmin &&
      this.$router.push({
        name: 'SingleLesson',
        params: {
          courseId: this.courseId,
          lessonId: lesson.idLesson
        }
      })
    },
    goToMenuSettings(){
      this.$router.push({
        name: 'MenuSettings',
        params: {
          id: this.courseId,
        }
      })
    }
  }

}

</script>

<style scoped>

</style>