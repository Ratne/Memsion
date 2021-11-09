<template>
  <div class="home">
    <div class="container-fluid">

      <summary-lesson :courseId="courseId" :lesson="lesson" @setShowEdit="editLessonShow = true" />
      <go-back class="mt-3 ms-3 mb-3 text-start" />
    </div>
  </div>

  <div v-if="editLessonShow">

    <EditLesson :lesson="lesson" @editLesson="lessonEdit" @closeModalView="editLessonShow = false" />

  </div>

  <div class="container text-end">
    <div class="row">
      <div class="col-12">
          <!--lesson delete-->
          <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteLesson">ELIMINA LEZIONE</button>
      </div>
    </div>
  </div>
</template>

<script>


import {lessonDelete, lessonShow, lessonUpdate} from "../../../services/lessonService";
import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import EditLesson from "../../../components/views/single_course/EditLesson";
import SummaryLesson from "../../../components/views/single_course/SummaryLesson";
import GoBack from "../../../components/shared/design/GoBack";


export default {
  name: 'SingleLesson',
  components: {GoBack, SummaryLesson, EditLesson, FormGroupCustom, EditorTextArea},
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
      if(confirm("Vuoi eliminare la lezione?")) {
        lessonDelete(this.courseId, this.lessonId).then(res => {
          this.$router.push({
            name: 'SingleCourse',
            params: {
              id: this.courseId
            }
          })
        })
      }
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
