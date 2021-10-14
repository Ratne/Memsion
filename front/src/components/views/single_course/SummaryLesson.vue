<template>
  <div class="row">
    <div class="col-6">
      <img :src="lesson.image" class="img-thumbnail" alt="lesson image" @click="editImage">
      </div>
    <!--summary lesson-->
    <div class="col-6">
      <div class="row">
        <div class="col-6">name: {{ lesson.name }}</div>
        <div class="col-6">Tag: {{ lesson.requiredTag }}</div>
        <div class="col-12">
          <p><span @click="goToSingleLesson">UrlLesson</span> <span @click="copyUrlLesson">[Copy]</span> </p>
        </div>
        <div class="col-12">
          Descrizione: <br>
          <span v-html="lesson.description"></span>
        </div>

        <div class="col-12">
       <button class="btn btn-info" @click="$emit('setShowEdit')">Modifica</button>
          </div>
    <!--summary lesson-->
      </div>

    </div>

  </div>
<input type="file" style="display: none" name="imageUpload" ref="uploadInput" @change="onUploadFile"/>

</template>

<script>



import {setFormDataWithImage} from "../../../utils/requestUtils";
import {lessonUpdateImage} from "../../../services/lessonService";
import {copyUrlMixin} from "../../../mixins/copyUrl";
import {routeNames} from "../../../router/routeNames";

export default {
  name: 'SummaryLesson',
  props: {
    lesson: {type: Object, default:()=> ({}) },
    courseId: {type: String}
  },
  mixins: [copyUrlMixin],
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
    }
  }
}
</script>
