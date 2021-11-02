<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
     <h3 class="text-center">Importa Utenti</h3>
        <h2 class="text-start">Istruzioni:</h2>
        <p class="text-start">Per importare correttamente gli utenti nella piattaforma preparare un file csv con le seguenti colonne (tutti i campi sono richiesti)</p>
        <div class="col-3">
          <ol class="list-group list-group-numbered text-start">
            <li class="list-group-item">Nome</li>
            <li class="list-group-item">Cognome</li>
            <li class="list-group-item">Email</li>
          </ol>
        </div>
      </div>
    </div>
</div>
<div class="container">
  <!--user add-->
  <div class="text-start">
    <form @submit.prevent="importUser">
      <FormGroupCustom name="file" :error="errors['file']" @change="onFileChange" label="file" type="file"></FormGroupCustom>
     <button class="btn btn-primary w-25 mt-3 mb-3 "  type="submit">IMPORTA UTENTI</button>
    </form>
  </div>
  <!--user add-->
  <go-back  class="text-start" />
</div>
</template>

<script>



import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import GoBack from "../../../components/shared/design/GoBack";



export default {
  name: 'ImportUser',
  components: {GoBack, FormGroupCustom},
  data(){
    return {
      user: {},
      validazione: [
        {
          name: 'file',
          validation: {
            type: validationTypeName.required,}
        },
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    importUser(){
      if (this.isValid(this.user)) {
       console.log('ciao')
      }
    },
    onFileChange(event){
      this.user.file = event.target.files[0]
    },
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
