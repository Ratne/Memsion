<template>
  <div class="home">
    <h1>Admin Courses</h1>
    <ul>
      <li v-for="course of courses" @click="goToCourse(course._id)" >
        {{ course.name }} - {{ course.requiredTag }}
      </li>
    </ul>
    <h3 class="text-center">Aggiungi corso</h3>
    <form @submit.prevent="courseAdd">
      {{course}}
    <FormGroupCustom :error="errors['name']" v-model:value="course.name" label="name" type="text"></FormGroupCustom>
    <editor-text-area v-model="course.description" />
      <FormGroupCustom :error="errors['image']" v-model:value="course.image" label="image" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['requiredTag']" v-model:value="course.requiredTag" label="tag" type="number"></FormGroupCustom>
    <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>
    </form>

  </div>
</template>

<script>


import {coursesIndex, coursesStore} from "../../services/coursesService";
import FormGroupCustom from "../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../mixins/validationMixin";
import {validationTypeName} from "../../utils/validationType";
import EditorTextArea from "../../components/shared/form/EditorTextArea";


export default {
  name: 'AdminCourses',
  components: {EditorTextArea, FormGroupCustom},
  data(){
    return {
      courses:[],
      course: {},
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
          name: 'image',
          validation: {
            type: validationTypeName.required,
          }
        },
        {
          name: 'requiredTag',
          validation: {
            type: validationTypeName.required,
          }
        }
      ]
    }
  },
  mixins: [validationMixin],
  mounted() {
    coursesIndex().then(res =>{
      this.courses=res
    })
  },
  methods:{
    courseAdd(){
      this.$store.dispatch('resetErrors');
      if (this.isValid(this.course)){
        coursesStore(this.course).then(res =>{
          this.courses.push(res)
          this.course = {}
        })
      }
    },
    goToCourse(id){
      this.$router.push({
        name: 'SingleCourse',
        params: {
          id
        }
      })
    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
