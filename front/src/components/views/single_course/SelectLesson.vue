<template>

  <div>
    <div class="headerImage" :style="{ backgroundImage: `url('${lesson.image}')` }"></div>

    <h2>{{lesson.title}}</h2>
    <div class="lessonDescription" v-html="lesson.description"></div>
    <div v-if="lesson.video"><video-custom :url="lesson.video" /></div>
    <div class="lessonDescription" v-html="lesson.content"></div>
  </div>



</template>


<script>
import {lessonFilterShow} from "../../../services/lessonService";
import VideoCustom from "../../shared/design/video/VideoCustom";

export default {
  name: "SelectLesson",
  components: {VideoCustom},
  props: {
    idLesson: {type: String},
    idCourse: {type: String},
  },
  data () {
    return {
      lesson: {},
    }
  },

  mounted() {

    this.init()
  },

  methods: {
    init(){
      this.lesson = {}
      lessonFilterShow(this.idCourse, this.idLesson).then(res => {
        this.lesson = res
      })
    }
  },

  watch: {
    idLesson(){
     this.init()
    }
  }

}
</script>

<style lang="scss" scoped>

.headerImage{
  height: 180px;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.lessonDescription{
  font-size: 18px;
}

</style>