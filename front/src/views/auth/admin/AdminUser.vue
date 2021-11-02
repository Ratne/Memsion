<template>
  <div class="home">
    <div class="container">
      <div class="row ">
        <div class="col-12 text-end mb-3 mt-3">
          <icon-button label="Aggiungi Utente" icon="bi bi-plus-circle" @clickEvent="goToNewUser"/>
          <icon-button @clickEvent="importUser" class="ms-4" label="Importa Utenti" icon="bi bi-file-earmark-spreadsheet-fill"/>
        </div>
      </div>
    </div>
    <div class="container">

      <CustomTable :data="filterUser" :fields="fields" :filter-properties="filterProperties" ></CustomTable>
      <div class="row">
        <go-back class="mt-3 ms-3 mb-3 text-start" />
      </div>

  </div>
  </div>
</template>

<script>



import {userList} from "../../../services/userService";
import CustomTable from "../../../components/shared/design/CustomTable";
import IconButton from "../../../components/shared/design/iconButton";
import GoBack from "../../../components/shared/design/GoBack";

export default {
  name: 'AdminUser',
  components: {GoBack, IconButton, CustomTable},
  data(){
    return {
      users: [],
      fields : [
          {label: 'id', field:'id'},
          {label: 'Nome', field:'name'},
          {label: 'Cognome', field: 'surname'},
          {label: 'email', field:'email'},
        {label: 'Id Infusionsoft', field:'infusionsoftId'}
          ],
      filterProperties: ['email'],
    }
  },

  mounted() {
    userList().then(res =>{
      this.users=res


    })
  },
  computed: {
    filterUser(){
      return this.users.map(ele =>{
        return {...ele}
      })
    }
  },
  methods: {
    goToNewUser(){
      this.$router.push({
        name: 'NewUser',
      })
    },
    importUser(){
      this.$router.push({
        name: 'ImportUser'
      })
    }
  }


}
</script>
