<template>
<div>
  <TitleH1 v-if="isAdmin" label="Menu" ></TitleH1>
    <icon-button v-if="isAdmin" @clickEvent="goToMenuSettings" label="Modifica" icon="bi bi-pencil-square" />
    <div class="accordion">
      <template v-if="isAdmin"  v-for="(m, index) in menu">
        <Accordion v-if="m.lessons && m.lessons.length" :title="m.label" :index="index">
          <span @click="goToLesson(lesson)" v-for="lesson in m.lessons">
           <div><i class="bi bi-card-heading me-2"></i> {{lesson.name}}</div>
          </span>
        </Accordion>
      </template>
      <template v-if="link && link.length">
        <div class="pb-5">
      <TitleH1 class="mt-3" label="Link" />
      <template v-for="(l) in link">
        <div class="text-start p-1  d-flex" ><i class="bi bi-link-45deg me-2 "></i><span @click="clickUrl(l.url)" class="text-capitalize pointer">{{l.label}}</span></div>
      </template>
    </div>
      </template>
    </div>


</div>
</template>



<script>



import Accordion from "../../shared/design/Accordion";
import IconButton from "../../shared/design/iconButton";
import GoBack from "../../shared/design/GoBack";
import TitleH1 from "../../shared/design/TitleH1";
export default {
  name: "CourseMenu",
  components: {TitleH1, GoBack, IconButton, Accordion},
  props:{
    menu: {type: Array, default: () => []},
    link: {type: Array, default: () => []},
    courseId: {type: String},
    isAdmin: {type: Boolean , default: true},

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
  },
}

</script>
<style lang="scss" scoped>
.pointer{
  cursor: pointer;
}
</style>
