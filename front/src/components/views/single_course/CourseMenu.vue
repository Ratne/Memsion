<template>
<div>
  <h2>Menu</h2> <span v-if="isAdmin" @click="goToMenuSettings">[EDIT MENU]</span>
  <ul>
  <li v-for="m in menu">
    <div v-if="m.url" @click="clickUrl(m.url)">
      {{ m.label }}
    </div>
    <ul v-else>
      <h2>Modulo: {{m.label}}</h2>
      <li @click="goToLesson(lesson)" v-for="lesson in m.lessons">
        {{lesson.name}}
      </li>
    </ul>
  </li>
  </ul>
</div>
</template>

<script>



export default {
  name: "CourseMenu",
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