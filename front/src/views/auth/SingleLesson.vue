<template>
  <div class="home">
      <summary-lesson :courseId="courseId" :lesson="lesson" @setShowEdit="editLessonShow = true" />
  </div>

  <div v-if="editLessonShow">

    <EditLesson :lesson="lesson" @editLesson="lessonEdit" />

  </div>

  <div>
    <!--lesson delete-->
    <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteLesson">ELIMINA LEZIONE</button>
  </div>
</template>

<script>


import {lessonDelete, lessonShow, lessonUpdate} from "../../services/lessonService";
import FormGroupCustom from "../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../mixins/validationMixin";
import {validationTypeName} from "../../utils/validationType";
import EditorTextArea from "../../components/shared/form/EditorTextArea";
import EditLesson from "../../components/views/single_course/EditLesson";
import SummaryLesson from "../../components/views/single_course/SummaryLesson";


export default {
  name: 'SingleLesson',
  components: {SummaryLesson, EditLesson, FormGroupCustom, EditorTextArea},
  data(){
    return {
      courseId: undefined,
      lesson: {},
      editLesson: {},
      lessonId: undefined,
      editLessonShow: false,
      validazione: [
        {
          name: 'name',
          validation: {
            type: validationTypeName.required,}
        },
        {
          name: 'description',
          validation:
              {type: validationTypeName.required}
        },
        {
          name: 'content',
          validation:
              {type: validationTypeName.required}
        },
        {
          name: 'image',
          validation: {
            type: validationTypeName.required,
          }
        }
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    deleteLesson(){
      lessonDelete(this.courseId, this.lessonId).then(res =>{
        this.$router.push({
          name: 'SingleCourse',
          params: {
            id: this.courseId
          }
        })
      })
    },
    lessonEdit(editLesson){
      lessonUpdate(this.courseId, this.lessonId, editLesson).then(res =>{
        this.lesson = {...editLesson};
        this.editLessonShow = false;
      })
    }
  },
  mounted() {
    this.courseId= this.$route.params.courseId;
    this.lessonId= this.$route.params.lessonId;
    lessonShow(this.courseId, this.lessonId).then(res =>{
      this.lesson=res
      this.editLesson= {...res}
    })
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
