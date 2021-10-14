<template>
  <div class="row">
    <div class="col-6">
      <img :src="course.image" class="img-thumbnail" alt="course image" @click="editImage">
      </div>
    <!--summary course-->
    <div class="col-6">
      <div class="row">
        <div class="col-6">name: {{ course.name }}</div>
        <div class="col-6">Tag: {{ course.requiredTag }}</div>
        <div class="col-12">
          <p><span @click="goToSingleCourse">UrlCorso</span> <span @click="copyUrlCourse">[Copy]</span> </p>
        </div>
        <div class="col-12">
          Descrizione: <br>
          <span v-html="course.description"></span>
        </div>

        <div class="col-12">
       <button class="btn btn-info" @click="$emit('setShowEdit')">Modifica</button>
          </div>
    <!--summary course-->
      </div>

    </div>

  </div>
<input type="file" style="display: none" name="imageUpload" ref="uploadInput" @change="onUploadFile"/>

</template>

<script>



import {setFormDataWithImage} from "../../../utils/requestUtils";
import {coursesUpdateImage} from "../../../services/coursesService";
import {copyUrlMixin} from "../../../mixins/copyUrl";

export default {
  name: 'SummaryCourse',
  props: {
    course: {type: Object, default:()=> ({}) }
  },
  mixins: [copyUrlMixin],
  methods: {
    editImage(){
      this.$refs.uploadInput.click();
    },
    onUploadFile(){
      const image = this.$refs.uploadInput.files[0]
      let formData = setFormDataWithImage({image})
      coursesUpdateImage(this.course._id, formData).then(res =>{
        this.course.image = res.image
      })
    },
    goToSingleCourse(){
      this.$router.push({
        name: 'SingleCourseFilter',
        params: {
          id: this.course._id
        }
      })
    },
    copyUrlCourse(){
      this.copyUrl({
        name: 'SingleCourseFilter',
        params: {
          id: this.course._id
        }
      })
    }
  }
}
</script>
