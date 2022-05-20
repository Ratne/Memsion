<template>
  <div class="mt-5">
    <form class="text-start" @submit.prevent="editMenu">
      <FormGroupCustom name="label" :error="errors['label']" v-model:value="menuNew.label" label="label" type="text"></FormGroupCustom>
      <FormGroupCustom name="url" :error="errors['url']" v-model:value="menuNew.url" label="url" type="text"></FormGroupCustom>
      <button class="btn btn-primary mt-3 mb-3 "  type="submit">Invia</button>
    </form>
  </div>
</template>

<script>
import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";

export default {
  name: "editMenu",
  components: {FormGroupCustom},
  mixins: [validationMixin],
  props: ['editMenu'],
  data(){
    return {
      menuNew: {},
      validazione: [
        {
          name: 'label',
          validation: {
            type: validationTypeName.required,}
        },
        {
          name: 'url',
          validation: {
            type: validationTypeName.required,}
        }
      ]
    }
  },
  methods: {
    editMenu(){
      if (this.isValid(this.menuNew)){
        this.$emit('editMenu', {
          menu:  this.menuNew,
        } )
      }

    }
  },
  computed:{
    allValidations(){
      return [...this.validazione]

    }
  },
  mounted() {
    this.menuNew = {...this.editMenu}
  },
  watch: {
    editMenu(){
      this.menuNew = {...this.editMenu}
    }
  }
}
</script>

<style scoped>

</style>
