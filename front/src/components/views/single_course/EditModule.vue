<template>

  <div class="container text-start">
    <h2 class="mt-5">Modifica Modulo</h2>
    <form @submit.prevent=" editModuleAction">
      <FormGroupCustom :error="errors['label']" v-model:value="editModuleForm.label" label="Nome" type="text"></FormGroupCustom>
      <button class="btn btn-primary mt-3 mb-3 "  type="submit">Modifica Nome Modulo</button>
    </form>
    <div class="text-start mb-4"><icon-button @click="closeModalView" icon="bi bi-x-circle" label="Chiudi" /></div>
  </div>
    <!--edit module-->



</template>

<script>


import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import IconButton from "../../shared/design/iconButton";


export default {
  name: 'EditModule',
  components: {IconButton, FormGroupCustom, EditorTextArea},
  props: {
    label: {type: String}
  },
  data(){

    return {
      editModuleForm: {},
      validazione: [
        {
          name: 'label',
          validation: {
            type: validationTypeName.required,}
        }
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    editModuleAction(){
      if (this.isValid(this.editModuleForm)) {
        this.$emit('editModule', this.editModuleForm)
      }
    },
    closeModalView(){
      this.$emit('closeModalView')
    },
    init(){
      this.editModuleForm = {label: this.label}


    }
  },
  mounted() {
    this.init()
  },
  watch:{
    label(){
      this.init()
    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
