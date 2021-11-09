<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
     <h3 class="text-center">Importa Utenti</h3>
        <h2 class="text-start">Istruzioni:</h2>
        <p class="text-start">Per importare correttamente gli utenti nella piattaforma esportare gli utenti da infusionsoft
          e preparare un file csv (SENZA HEADER) con le seguenti colonne (tutti i campi sono richiesti nell'ordine in cui sono qui sotto)</p>
        <div class="col-3">
          <ol class="list-group list-group-numbered text-start">
            <li class="list-group-item">Nome</li>
            <li class="list-group-item">Cognome</li>
            <li class="list-group-item">Email</li>
            <li class="list-group-item">Infusionsoft id</li>
          </ol>
        </div>
      </div>
    </div>
</div>
<div class="container">

  <!--import user-->
  <div class="text-start">
    <form @submit.prevent="importUser">
      <input class="form-control mt-3" type="file" required name="file" @change="onFileChange" label="file">
     <button class="btn btn-primary w-25 mt-3 mb-3 "  type="submit">IMPORTA UTENTI</button>
    </form>
  </div>
  <!--import user-->
  <go-back  class="text-start" />
</div>
</template>

<script>



import GoBack from "../../../components/shared/design/GoBack";
import {importUser} from "../../../services/userService";



export default {
  name: 'ImportUser',
  components: {GoBack},
  data(){
    return {
      file: '',
    }
  },
  methods:{
    importUser(){
        let formData = new FormData();
        formData.append('import', this.file);
        importUser(formData, ).then(res =>{
          this.file= ''
        })

    },
    onFileChange(event){
      this.file = event.target.files[0];
    },
  },
}
</script>
