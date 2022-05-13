<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 mt-5">
          <TitleH3 label="Configurazioni Aggiuntive" />
      </div>
    </div>
</div>

<div class="container">

  <TitleH3 label="Istruzioni" />
  <p class="text-start">Recati in Keap max pro / infusionsoft , admin / settings e Set up custom fields for: Contact , clicca GO, <br>
    ora clicca "Add a section Header" (facoltativo) così da inserire una sezione dedicata solo a Memsion, ora clicca add a custom field<br>
    Inserisci un nome come ad esempio "CustomMemsionId" di tipo text e fai salva, ripeti la procedura inserendo un altro campo chiamato ad esempio
    "MemsionUserKey" sempre di tipo text e fai salva. <br>
    Fatto questo in fondo alla pagina clicca su "View the field database names (for the API)" e prendi i nomi contenuti nei database name
    e copialo nei campi qui sotto. <br><b>Importante:</b> ricordati che NON devi inserire "_" (underscore) prima del nome come da istruzioni di infusionsoft</p>
  <h3 class="text-start mt-3">Istruzioni autologin:</h3>
  <p class="text-start">Dopo aver completato la procedura qui sotto per effettuare correttamente l'autologin dovrai creare in infusionsoft
  dei link nelle tue email in questo modo: <code>{{urlSito}}/linklezioneOlinkcorso?userapi=~CustomMemsionId~&userkey=~MemsionUserKey~
    </code> ovviamente passati in modo dinamico ~CustomField1~ e ~CustomField2~
  </p>

  <h3 class="text-start">Campo custom id utente</h3>
  <div class="row text-start">
    <form @submit.prevent="saveUserId">
    <FormGroupCustom class="w-25" v-model:value="user.customId" label="CustomMemsionId" type="text"></FormGroupCustom>
    <FormGroupCustom class="w-25" v-model:value="user.customKey" label="MemsionUserKey" type="text"></FormGroupCustom>
    <button class="btn btn-primary w-25 mt-3 mb-3 "  type="submit">SALVA</button>
    </form>
  </div>
</div>

</template>

<script>



import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {
  customIdUpdate,
  customKeyGet,
} from "../../../services/userService";
import TitleH3 from "../../../components/shared/design/TitleH3";




export default {
  name: 'Config',
  components: {TitleH3, FormGroupCustom},
  data(){
    return {
      user: {},
      urlSito: process.env.VUE_APP_URL,
      disabled: false
    }
  },
  methods:{

    saveUserId(){
      customIdUpdate(this.user).then(res =>{
      })
    }
  },

  mounted() {
    customKeyGet().then(res =>{
      this.user.customKey=res.customKey
      this.user.customId=res.customId
    })
  }
}

</script>

