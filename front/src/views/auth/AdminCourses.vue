<template>
  <div class="home">
    <div class="container">
      <h1>Admin Courses</h1>
      <div class="row">
    <div class="card mb-sm-2 ms-2 mx-2" style="width: 18rem;" v-for="course of courses" @click="goToCourse(course._id)">
      <img :src="'data:image;base64,' + course.image" class="card-img-top" alt="course image">
      <div class="card-body">
        <h5 class="card-title">{{course.name}}</h5>
        <p class="card-text"><span v-html="course.description"></span><br> Tag: {{course.requiredTag}}</p>

      </div>
    </div>
      </div>
    </div>
  <div class="container">
    <h3 class="text-center">Aggiungi corso</h3>
    <form @submit.prevent="courseAdd">
      {{course}}
    <FormGroupCustom name="name" :error="errors['name']" v-model:value="course.name" label="name" type="text"></FormGroupCustom>
    <editor-text-area name="description"  :error="errors['description']"  label="description" v-model:dataValue="course.description" />
    <FormGroupCustom name="image" :error="errors['image']" @change="onFileChange" label="image" type="file"></FormGroupCustom>
    <FormGroupCustom name="requiredTag" :error="errors['requiredTag']" v-model:value="course.requiredTag" label="tag" type="number"></FormGroupCustom>
    <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">Invia</button>
    </form>

  </div>
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
      let formData = new FormData();
      formData.append('name',this.course.name)
      formData.append('description',this.course.description)
      formData.append('image',this.course.image, this.course.image.name)
      formData.append('requiredTag',this.course.requiredTag)
      if (this.isValid(this.course)){
        coursesStore(formData).then(res =>{
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
    },
    onFileChange(event){
           this.course.image = event.target.files[0]
    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
