<template>

  <div class="row  mt-5">
    <div class="col-12 col-md-6 py-3 bgGrayLight mt-5">
      <img :src="course.image" class="imageLesson" alt="course image" @click="editImage">
      </div>

    <!--summary course-->
    <div class="col-12 col-md-6 bgGrayLight py-3 mt-5">
      <div class="row adminSidebar">
        <div class="col-6 text-start">Nome: {{ course.name }}</div>
        <div class="col-6 text-end"><span class="badge text-black bg-primary">Tag: {{ course.requiredTag }}</span></div>
        <div class="col-12 text-start">
          <p><span @click="goToSingleCourse">Url Corso:</span> <span @click="copyUrlCourse"><i class="bi bi-clipboard-check"></i> Copia</span> </p>
        </div>
        <div class="col-12 text-start">
         <h3> Descrizione Corso: </h3>
          <span v-html="course.description"></span>
        </div>

        <div class="col-12">
          <icon-button icon="bi bi-pencil-square" label="Modifica" @clickEvent="setShowEdit"  />
          </div>

    <!--summary course-->
      </div>
      <div class="mt-3"><icon-button icon="bi bi-bar-chart" label="Vai al Report" @clickEvent="goToReport"  /></div>
      <div class="mt-3"><icon-button icon="bi bi-chevron-bar-contract" label="Ordina Lezioni" @clickEvent="goToAllLesson"  /></div>
    </div>

  </div>
<input type="file" style="display: none" name="imageUpload" ref="uploadInput" @change="onUploadFile"/>

</template>

<script>



import {setFormDataWithImage} from "../../../utils/requestUtils";
import {coursesUpdateImage} from "../../../services/coursesService";
import {copyUrlMixin} from "../../../mixins/copyUrl";
import IconButton from "../../shared/design/iconButton";

export default {
  name: 'SummaryCourse',
  components: {IconButton},
  props: {
    course: {type: Object, default:()=> ({}) }
  },
  mixins: [copyUrlMixin],
  emits: ['showEdit'],
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
    },
    goToReport(){
      this.$router.push({
        name: 'ReportCourse',
        params: {
          courseId: this.course._id,
        }
      })
    },
    goToAllLesson(){
      this.$router.push({
        name: 'ListAllLessons',
        params: {
          courseId: this.course._id,
        }
      })
    },
    setShowEdit(){
      this.$emit('showEdit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/sass/index";
.adminSidebar{
  padding:20px;
  background-color: #ffffff;
  margin-right: 0px;

}

.badge{
  &.bg-primary{
    background-color: red;
  }
}
.imageLesson{
  width: 100%;
}

</style>
