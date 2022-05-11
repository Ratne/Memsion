<template>

  <div class="px-md-5 px-2">
    <TitleH1 :label="courseName"></TitleH1>
    <TitleH2 :label="lesson.name"></TitleH2>
    <div v-if="lesson.video">
      <video-custom @timeupdate="timeUpdate"  :url="lesson.video" />
    </div>
    <div v-else-if="lesson.script" >
      <Suspense>
         <PlayerExt :script="lesson.script" />
      </Suspense>
    </div>
    <TitleH4 class="mt-3" :label="selectModuleLabel"></TitleH4>
    <div class="lessonDescription" v-html="lesson.description"></div>

    <div class="lessonDescription" v-html="lesson.content"></div>

    <button-primary class="mt-3" label="Segna come completato"></button-primary>
  </div>



</template>


<script>
import {lessonFilterShow, lessonTimeUpdate} from "../../../services/lessonService";
import VideoCustom from "../../shared/design/video/VideoCustom";
import TitleH1 from "../../shared/design/TitleH1";
import TitleH2 from "../../shared/design/TitleH2";
import TitleH4 from "../../shared/design/TitleH4";
import ButtonPrimary from "../../shared/design/ButtonPrimary";
import PlayerExt from "../../shared/design/video/PlayerExt";

export default {
  name: "SelectLesson",
  components: {ButtonPrimary, TitleH4, TitleH2, TitleH1, VideoCustom, PlayerExt},
  props: {
    idLesson: {type: String},
    idCourse: {type: String},
    courseName: {type: String},
    selectModuleLabel: {type:String}
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
    },
    timeUpdate(time){
      lessonTimeUpdate(this.idCourse,this.idLesson,Math.round(time)).then(res => {
        console.log(res)
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
  word-break: break-word;
}

</style>
