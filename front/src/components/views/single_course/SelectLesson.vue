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
    <button-primary @click="lessonPrev" :disabled="!prevLesson" class="mt-3" label="Indietro"></button-primary>
    <button-primary @click="lessonNext" :disabled="!nextLesson" class="mt-3" label="Avanti"></button-primary>
    <TitleH4 class="mt-3" :label="moduleLabel"></TitleH4>
    <div class="lessonDescription" v-html="lesson.description"></div>

    <div class="lessonDescription" v-html="lesson.content"></div>

    <button-primary @click="lessonComplete" class="mt-3" label="Segna come completato"></button-primary>
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
  emits: ["goToLesson"],
  props: {
    idLesson: {type: String},
    idCourse: {type: String},
    courseName: {type: String},
    moduleList: {type: Array},
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
    timeUpdate(time, callback){
      lessonTimeUpdate(this.idCourse,this.idLesson,Math.round(time)).then(res => {
        callback && callback()
      })
    },
    lessonComplete(){
      const callback = () => {
        this.nextLesson && this.lessonNext()
      }
      this.timeUpdate(100, callback)
    },
    lessonNext(){
      this.$emit('goToLesson', this.nextLesson)
    },
    lessonPrev(){
      this.$emit('goToLesson', this.prevLesson)
    }
  },

  watch: {
    idLesson(){
     this.init()
    }
  },
  computed: {
    moduleIndex(){

      return this.lesson.module && this.moduleList.findIndex(module => this.lesson.module === module.id)
    },
    module() {

      return this.moduleIndex!== undefined && this.moduleList[this.moduleIndex]
    },
    moduleLabel() {
      return this.module && this.module.label
    },
    prevLesson(){
      if (this.lesson.module){
      const moduleIndex = this.moduleList.findIndex(module => this.lesson.module === module.id)
      const module = this.moduleList[moduleIndex];
      const indexLesson = module.lessons.findIndex(lesson => lesson.idLesson === this.idLesson);

      if(indexLesson > 0){
        return module.lessons[indexLesson - 1]
      } else {
        if (moduleIndex > 0){
          const module = this.moduleList[moduleIndex - 1];
          return module.lessons[module.lessons.length - 1]
        } else {
          return undefined
        }
      }
    }
      },
    nextLesson(){
      if (this.lesson.module){
        const moduleIndex = this.moduleList.findIndex(module => this.lesson.module === module.id)
        const module = this.moduleList[moduleIndex];
        const indexLesson = module.lessons.findIndex(lesson => lesson.idLesson === this.idLesson);

        if(indexLesson < module.lessons.length - 1){
          return module.lessons[indexLesson + 1]
        } else {
          if (moduleIndex < this.moduleList.length - 1){
            const module = this.moduleList[moduleIndex + 1];
            return module.lessons[0]
          } else {
            return undefined
          }
        }
      }
    }
  },

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
