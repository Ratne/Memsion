<template>
  <div class="row">
    <div class="col-6">
      <img :src="lesson.image" class="img-thumbnail" alt="lesson image" @click="editImage">
      <div class="mt-3" v-if="lesson.video"><video-custom :url="lesson.video" /></div>
      </div>
    <!--summary lesson-->
    <div class="col-6">
      <div class="row adminSidebar">
        <div class="col-6 text-start">Nome: {{ lesson.name }}</div>
        <div class="col-6 text-end"><span class="badge bg-primary">Tag: {{ lesson.requiredTag }}</span></div>
        <div class="col-12 text-start">
          <p><span @click="goToSingleLesson">Url Lezione: </span>
            <icon-button label="Copia" icon="bi bi-clipboard-check" @clickEvent="copyUrlLesson" /> </p>
        </div>

        <div class="col-12">
          <h3>Descrizione Lezione:</h3>
          <div class="descriptionLesson">
           <span v-html="lesson.description"></span>
          </div>
        </div>
        <div class="col-12">
          <h3>Contenuto Lezione:</h3>
          <div class="descriptionLesson">
           <span v-html="lesson.content"></span>
          </div>
        </div>
        <div class="col-12">
          <icon-button label="Modifica" icon="bi bi-pencil-square" @clickEvent="$emit('setShowEdit')" />
        </div>

    <!--summary lesson-->
      </div>

    </div>

  </div>
<input type="file" style="display: none" name="imageUpload" ref="uploadInput" @change="onUploadFile"/>
</template>

<script>



import {setFormDataWithImage} from "../../../utils/requestUtils";
import {lessonTimeUpdate, lessonUpdateImage} from "../../../services/lessonService";
import {copyUrlMixin} from "../../../mixins/copyUrl";
import {routeNames} from "../../../router/routeNames";
import IconButton from "../../shared/design/iconButton";
import VideoCustom from "../../shared/design/video/VideoCustom";

export default {
  name: 'SummaryLesson',
  components: {VideoCustom, IconButton},
  props: {
    lesson: {type: Object, default:()=> ({}) },
    courseId: {type: String}
  },
  mixins: [copyUrlMixin],
  emits: ['setShowEdit'],
  methods: {
    editImage(){
      this.$refs.uploadInput.click();
    },
    onUploadFile(){
      const image = this.$refs.uploadInput.files[0]
      let formData = setFormDataWithImage({image})
      lessonUpdateImage(this.courseId, this.lesson._id, formData).then(res =>{
        this.lesson.image = res.image
      })
    },
    goToSingleLesson(){
      this.$router.push({
        name: routeNames.SingleCourseFilterWithLesson,
        params: {
          id: this.courseId,
          idLesson: this.lesson._id
        }
      })

    },
    copyUrlLesson(){
      this.copyUrl({
        name: routeNames.SingleCourseFilterWithLesson,
        params: {
          id: this.courseId,
          idLesson: this.lesson._id
        }}
      )
    },
  }
}
</script>
<style lang="scss" scoped>

@import "src/sass/index";
.adminSidebar{
  padding:20px;
  background-color: #ffffff;
  box-shadow: $bgShadow;
  border-radius: $customBorderRadius;
  margin-right: 0px;
}

.descriptionLesson{
  max-height: 200px;
  overflow: auto;
  text-align: start;
  margin-bottom: 12px;
}

</style>
