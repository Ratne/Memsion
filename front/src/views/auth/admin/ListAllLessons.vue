<template>
  <div class="pt-5 mt-5 px-md-5 px-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-6" v-for="(module, index) in modules">
         <div class="mb-3">
           <Accordion :index="index" :title="module.label">
           <draggable :data-id="module._id"
               group="module.lessons"
               :list="module.lessons"
               @change="log"
               @start="drag=true"
               @end="onEnd"
               item-key="_id">
             <template #item="{element}">
               <div class="draggableItem"><i class="bi bi-grip-horizontal me-3"></i>{{ element.name }}</div>
             </template>
           </draggable>
           </Accordion>
         </div>

        </div>
      </div>
    </div>
  </div>
</template>

<!--<Accordion :title="course.name" :right-content="coursePercentage(course)" :index="index">-->

<!--<div class="w-100 d-flex" v-for="lesson in course.lessons"><span><i class="bi bi-card-heading me-2"></i> {{lesson.name}} </span> <span class="ms-auto me-4">{{lesson.users[0].percentage}}%</span></div>-->

<!--</Accordion>-->

<script>


import {listAllLesson} from "../../../services/coursesService";
import draggable from "vuedraggable"
import {lessonOrderUpdate} from "../../../services/lessonService";
import TitleH2 from "../../../components/shared/design/TitleH2";
import Accordion from "../../../components/shared/design/Accordion";

export default {
  name: 'ListAllLessons',
  components: {Accordion, TitleH2, draggable},
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


    },
    onEnd(ev){
      console.log(ev)
      debugger
      this.drag= false
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
@import "src/sass/variables";
.draggableItem{
  padding: 12px;
  border: 1px solid $dark;
  margin-bottom: 6px;
  cursor: grab;
  &:hover{
    background: rgba($dark, 0.2);
  }
}
</style>
