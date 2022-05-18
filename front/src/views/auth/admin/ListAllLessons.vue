<template>
  <div class="">

    <br><br><br>
    <br><br><br>
    <!--  {{modules}}-->
    <div v-for="module in modules">
      <h1>{{ module.label }}</h1>

      <draggable
          group="module.lessons"
          :list="module.lessons"
          @change="log"
          @start="drag=true"
          @end="drag=false"
          item-key="_id">
        <template #item="{element}">
          <div>{{ element.name }}</div>
        </template>
      </draggable>

    </div>
  </div>
</template>

<script>


import {listAllLesson} from "../../../services/coursesService";
import draggable from "vuedraggable"
import {lessonOrderUpdate} from "../../../services/lessonService";

export default {
  name: 'ListAllLessons',
  components: {draggable},
  data() {
    return {
      modules: [],
      drag: false,
    }
  },
  methods: {
    log(evt) {
      console.log(evt);
      if (evt.moved) {

        lessonOrderUpdate(this.$route.params.courseId, evt.moved.element._id, evt.moved.newIndex, evt.moved.element.module)
            .then(res => console.log(res))
      }


    }
  },
  mounted() {
    listAllLesson(this.$route.params.courseId).then(res => {
      this.modules = res
    })

  }
}
</script>

<style lang="scss" scoped>

</style>
