<template>
  <div class="container">
     <h2>Modifica Corso</h2>
     <form @submit.prevent="editCourseAction">
       <FormGroupCustom :error="errors['name']" v-model:value="editCourse.name" label="name" type="text"></FormGroupCustom>
       <editor-text-area :error="errors['description']" v-model:dataValue="editCourse.description" />
       <FormGroupCustom :error="errors['image']" v-model:value="editCourse.image" label="image" type="text"></FormGroupCustom>
       <FormGroupCustom :error="errors['requiredTag']" v-model:value="editCourse.requiredTag" label="tag" type="number"></FormGroupCustom>
       <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">AGGIORNA CORSO</button>
     </form>
  </div>
</template>

<script>

import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";

export default {
  name: 'EditCourse',
  components: {FormGroupCustom, EditorTextArea},
  data(){
    return {
      editCourse: {},
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
          name: 'requiredTag',
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
  props: {
    course: {type: Object}
  },
  mixins: [validationMixin],

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  },

  methods: {
    editCourseAction(){
      if (this.isValid(this.editCourse)) {
        this.$emit('updateCourse', this.editCourse)
      }
    },
    init(){
      this.editCourse = {...this.course}
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    course(){
      this.init()
    }
  }
}
</script>
