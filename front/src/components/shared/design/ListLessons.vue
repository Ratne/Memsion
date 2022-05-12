<template>
    <div v-for="(m, index) in moduleSorted">
      <div class="row mb-3" v-if="m.lessons && m.lessons.length" >
        <TitleH3 class="moduleLabel" :label="m.label"></TitleH3>
          <div class="col-lg-3 col-md-4 col-sm-6 mb-3 pointer" @click="$emit('goToLesson', lesson, m.label)" v-for="lesson in m.lessons">
          <div class="itemLesson"> <TitleH2 class="cardText" :label="lesson.name" />
            <img class="w-100" :src="lesson.image">

          <ButtonPrimary class="mt-3 w-100 buttonVideo" label="Guarda"></ButtonPrimary>
          </div>
          </div>
      </div>
    </div>
</template>





<script>
import ButtonPrimary from "./ButtonPrimary";
import TitleH2 from "./TitleH2";
import TitleH3 from "./TitleH3";
export default {
  components: {TitleH3, TitleH2, ButtonPrimary},
  emits: ['goToLesson'],
  name: "ListLessons",
  props: {
    lessons: {
      type: Object
    },
    reverse: {
      type: Boolean,
      default: false
  }
  },
  computed: {
    moduleSorted() {
      return this.reverse ? [...this.lessons].reverse() : this.lessons;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";
.moduleLabel{
  font-size: 20px;
  color: $gray;
}
.itemLesson{
  h2{
    font-size: 20px;
  }
  .buttonVideo{
    font-size: 16px;
  }
  background: white;
  padding: 20px;
}
.cardText{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space : nowrap;
  }
.pointer{
  cursor: pointer;
}
</style>
