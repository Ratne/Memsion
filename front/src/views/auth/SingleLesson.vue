<template>
  <div class="home">

        {{ lesson.name }} - {{ lesson.requiredTag }}
  </div>



  <div>
    <!--lesson delete-->
    <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteLesson">ELIMINA LEZIONE</button>
  </div>
</template>

<script>


import {lessonDelete, lessonShow, lessonStore} from "../../services/lessonService";
import FormGroupCustom from "../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../mixins/validationMixin";
import {validationTypeName} from "../../utils/validationType";
import EditorTextArea from "../../components/shared/form/EditorTextArea";


export default {
  name: 'SingleLesson',
  components: {FormGroupCustom, EditorTextArea},
  data(){
    return {
      courseId: undefined,
      lesson: {},
      lessonId: undefined,
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
    }
  },
  mounted() {
    this.courseId= this.$route.params.courseId;
    this.lessonId= this.$route.params.lessonId;
    lessonShow(this.courseId, this.lessonId).then(res =>{
      this.lesson=res
    })
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
