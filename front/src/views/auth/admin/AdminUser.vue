<template>
  <div class="home">
    <div class="container">
      <div class="row ">
        <div class="col">
        <button class="btn btn-primary text-white float-end mb-2" @click="goToNewUser">AGGIUNGI UTENTE</button>
        </div>
      </div>
    </div>
    <div class="container">

      <CustomTable :data="filterUser" :fields="fields" :filter-properties="filterProperties" ></CustomTable>


  </div>
  </div>
</template>

<script>



import {userList} from "../../../services/userService";
import CustomTable from "../../../components/shared/design/CustomTable";

export default {
  name: 'AdminUser',
  components: {CustomTable},
  data(){
    return {
      users: [],
      fields : [
          {label: 'id', field:'id'},
          {label: 'Nome', field:'name'},
          {label: 'Cognome', field: 'surname'},
          {label: 'email', field:'email'},
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
    }
  }


}
</script>
