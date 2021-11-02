<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
          <h3 class="mt-3">Configurazioni aggiuntive</h3>
      </div>
    </div>
</div>

  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3 class="text-start">Sincronizzazione Utenti</h3>
        <p class="text-start">Se hai importato dei nuovi utenti o hai abilitato l'autologin dalle email <strong>dovrai sincronizzare</strong>
        correttamente gli utenti nel database della tua applicazione con il tuo Keap max pro / Infusionsoft.<br>
        <b>Cosa fa esattamente la procedura?</b></p>
        <div class="col-6 text-start mb-3">
          <ol class="list-group list-group-numbered">
            <li class="list-group-item">Legge tutti gli utenti presenti nel database della tua applicazione</li>
            <li class="list-group-item">L'applicazione si connette a infusionsoft e cerca ogni utente attraverso l'email</li>
            <li class="list-group-item">Per ogni email trovata in Keap max pro / Infusionsoft viene salvato nel db l'utente di keap max pro e viene salvato in Keap (nei campi che hai impostato qui sotto) le chiavi segrete per ogni utente</li>
          </ol>

        </div>
      </div>
      <button :disabled="disabled" @click="syncUser" class="btn btn-primary w-25 mt-3 mb-3">Sincronizza</button>
    </div>
  </div>
<div class="container">
  <h3 class="text-start">Istruzioni:</h3>
  <p class="text-start">Recati in Keap max pro / infusionsoft , admin / settings e Set up custom fields for: Contact , clicca GO, <br>
    ora clicca "Add a section Header" (facoltativo) così da inserire una sezione dedicata solo a Memsion, ora clicca add a custom field<br>
    Inserisci un nome come ad esempio "CustomMemsionId" di tipo text e fai salva, ripeti la procedura inserendo un altro campo chiamato ad esempio
    "MemsionUserKey" sempre di tipo text e fai salva. <br>
    Fatto questo in fondo alla pagina clicca su "View the field database names (for the API)" e prendi il nome contenuto nel database
    e copialo nei campi qui sotto. <br><b>Importante:</b> ricordati che devi inserire "_" (underscore) prima del nome come da istruzioni</p>

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
  customerUpdate,
  customIdUpdate,
  customKeyGet,
} from "../../../services/userService";




export default {
  name: 'Config',
  components: {FormGroupCustom},
  data(){
    return {
      user: {},
      disabled: false
    }
  },
  methods:{

    saveUserId(){
      customIdUpdate(this.user).then(res =>{
      })
    },
    syncUser(){
      customerUpdate().then(res =>{
      this.disabled = true
      })
    }
  },

  mounted() {
    customKeyGet().then(res =>{
      console.log(res)
      this.user.customKey=res.customKey
      this.user.customId=res.customId
    })
  }
}

</script>

