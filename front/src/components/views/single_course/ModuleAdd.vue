<template>
  <div class="container">
    <div class="row text-start">
      <form @submit.prevent="addModule">
        <FormGroupCustom name="label" :error="errors['label']" v-model:value="moduleNew.label" label="name" type="text"></FormGroupCustom>
        <button class="btn btn-primary mt-3 mb-3 "  type="submit">Invia</button>
      </form>
      <icon-button class="bi bi-x-circle" label="Chiudi" @click="closeModal"/>
    </div>
  </div>
</template>

<script>
import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import GoBack from "../../shared/design/GoBack";
import IconButton from "../../shared/design/iconButton";

export default {
  name: "ModuleAdd",
  components: {IconButton, GoBack, FormGroupCustom},
  mixins: [validationMixin],
  data(){
    return {
      moduleNew: {},
      validazione: [
        {
          name: 'label',
          validation: {
            type: validationTypeName.required,}
        },
      ]
    }
  },
  methods: {
    addModule(){
      if (this.isValid(this.moduleNew)){
        this.$emit('addModule', this.moduleNew)
      }
    },
    closeModal(){
      this.$emit('closeModal')
    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>

<style scoped>

</style>