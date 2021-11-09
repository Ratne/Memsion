<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
          <h3 class="mt-3">Configurazioni aggiuntive</h3>
      </div>
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
  <h3 class="text-start mt-3">Istruzioni autologin:</h3>
  <p class="text-start">Dopo aver completato la procedura qui sotto per effettuare correttamente l'autologin dovrai creare in infusionsoft
  dei link nelle tue email in questo modo: <code>https://iltuositoweb/linklezioneolinkcorso?userapi=~CustomMemsionId~&userkey=~MemsionUserKey~
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
  },

  mounted() {
    customKeyGet().then(res =>{
      this.user.customKey=res.customKey
      this.user.customId=res.customId
    })
  }
}

</script>

