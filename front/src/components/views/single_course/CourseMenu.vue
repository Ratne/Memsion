<template>
<div>
  <h2 class="text-start mb-2">Menu</h2> <span class="editAdmin" v-if="isAdmin" @click="goToMenuSettings"><i class="bi bi-pencil-square"></i>Modifica</span>

    <div class="accordion">
      <template v-for="(m, index) in menu">
        <Accordion v-if="m.lessons && m.lessons.length" :title="m.label" :index="index">
          <span @click="goToLesson(lesson)" v-for="lesson in m.lessons">
           <i class="bi bi-card-heading me-2"></i> {{lesson.name}}
          </span>
        </Accordion>
      </template>
      <h2 class="text-start mt-3 mb-1">Link</h2>
      <template v-for="(l) in link">
        <div class="text-start p-1" @click="clickUrl(l.url)"><i class="bi bi-link-45deg me-2 "></i><span class="text-capitalize">{{l.label}}</span></div>
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
    link: {type: Array, default: () => []},
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

<style lang="scss" scoped>
.editAdmin{
  cursor: pointer;

}
</style>