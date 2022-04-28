<template>
    <div v-for="(m, index) in lessons">
      <div class="d-flex flex-wrap " v-if="m.lessons && m.lessons.length" :title="m.label" :index="index">
          <div class="d-flex flex-column justify-content-center itemLesson" @click="$emit('goToLesson', lesson)" v-for="lesson in m.lessons">
           <TitleH2 :label="lesson.name" />
            <img :src="lesson.image">
          <ButtonPrimary class="mt-3" label="Guarda il video"></ButtonPrimary>
          </div>
      </div>
    </div>
</template>





<script>
import ButtonPrimary from "./ButtonPrimary";
import TitleH2 from "./TitleH2";
export default {
  components: {TitleH2, ButtonPrimary},
  emits: ['goToLesson'],
  name: "ListLessons",
  props: {
    lessons: {
      type: Object
    }
  },
}
</script>

<style lang="scss" scoped>
.itemLesson{
  max-width: 33% ;
  background: white;
  padding: 20px;
}
</style>
