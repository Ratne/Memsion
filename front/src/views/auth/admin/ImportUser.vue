<template>
  <div class="container mt-5">
    <div class="row ">
      <div class="col-12 mt-5">
     <TitleH3 label="Importa Utenti" />
        <title-h2 label="Istruzioni" />
        <p class="text-start">Per importare correttamente gli utenti nella piattaforma esportare gli utenti da infusionsoft
          e preparare un file csv (CON INTESTAZIONE) con le seguenti colonne (Email e Id sono obbligatori) nell'ordine in cui sono qui sotto)</p>
        <button-primary v-if="instructions === false" @buttonClick="instructions = true" label="Mostra Istruzioni" class="mb-3" />
        <div v-if="instructions">
          <img src="/assets/import.gif" alt="import" class="img-fluid mb-5">

        <div class="col-3">
          <TitleH2 class="mt-1 mb-1" label="Colonne CSV" />
          <div class="mb-1 mt-1"><a href="/assets/import.csv">Scarica CSV D'Esempio</a></div>
          <ol class="list-group list-group-numbered text-start">
            <li class="list-group-item">Id</li>
            <li class="list-group-item">First Name</li>
            <li class="list-group-item">Last Name</li>
            <li class="list-group-item">Email</li>
          </ol>
        </div>
          <button-primary v-if="instructions === true" @buttonClick="instructions = false" label="Chiudi Istruzioni" class="mb-3 mt-3" />
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
import TitleH3 from "../../../components/shared/design/TitleH3";
import TitleH2 from "../../../components/shared/design/TitleH2";
import ButtonPrimary from "../../../components/shared/design/ButtonPrimary";



export default {
  name: 'ImportUser',
  components: {ButtonPrimary, TitleH2, TitleH3, GoBack},
  data(){
    return {
      file: '',
      instructions: false
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
