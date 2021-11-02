<template>
  <div class="container">
    <div class="row">
      <h3>Id utente database: {{user._id}}</h3>
      <icon-button @clickEvent="editUser" label="Modifica Utente" icon="bi bi-pencil-square"/>


    </div>
    <div class="row">
        <div v-if="showEditUser==false">
          <ul class="list-group text-start ms-2 list-group-flush">
            <li class="list-group-item">Nome: {{user.name}}</li>
            <li class="list-group-item">Cognome: {{user.surname}}</li>
            <li class="list-group-item">Email: {{user.email}}</li>
            <li class="list-group-item">Admin: {{user.isAdmin}}</li>
            <li class="list-group-item">Infusionsoft Tag: {{user.tags}}</li>
            <li class="list-group-item">Infusionsoft Id: {{user.infusionsoftId}}</li>
            <li class="list-group-item">Secret User Key: {{user.userKey}}</li>
          </ul>
        </div>

    </div>
    <div class="row">
      <go-back class="mt-3 ms-3 mb-3 text-start" />
    </div>
  <div class="text-end" v-if="showEditUser==false">
    <!--user delete-->
    <button class="btn btn-danger mt-3 mb-3 w-25 " type="submit" @click="deleteUser">ELIMINA UTENTE</button>
  </div>

  <!--user edit-->

  <div v-if="showEditUser" class="container">
    <form @submit.prevent="editUserAction">
    <FormGroupCustom :error="errors['name']" v-model:value="editUserUpdate.name" label="name" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['surname']" v-model:value="editUserUpdate.surname" label="surname" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['email']" v-model:value="editUserUpdate.email" label="email" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['infusionsoftId']" v-model:value="editUserUpdate.infusionsoftId" label="infusionsoft id" type="number"></FormGroupCustom>
    <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">AGGIORNA UTENTE</button>
    </form>
  </div>
  <!--user delete-->
  </div>
</template>

<script>



import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import {userDel, userShow, userUpdate} from "../../../services/userService";
import IconButton from "../../../components/shared/design/iconButton";
import GoBack from "../../../components/shared/design/GoBack";



export default {
  name: 'SingleUser',
  components: {GoBack, IconButton, FormGroupCustom},
  data(){
    return {
      user: {},
      editUserUpdate:{},
      showEditUser: false,
      validazione: [
        {
          name: 'name',
          validation: {
            type: validationTypeName.required,}
        },
        {
          name: 'surname',
          validation:
              {type: validationTypeName.required}
        },
        {
          name: 'email',
          validation:
              {type: validationTypeName.required}
        },
        {
          name: 'email',
          validation:
              {type: validationTypeName.email}
        },
        {
          name: 'infusionsoftId',
          validation:
              {type: validationTypeName.required}
        }
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    deleteUser(){
      if(confirm('Vuoi rimuovere questo utente?')){
      userDel(this.user._id).then(res =>{
        this.$router.push({
          name: 'AdminUser',
        })
      })
      }
    },
    editUser(){
      this.showEditUser =  true;
    },
    editUserAction(){
      if (this.isValid(this.editUserUpdate)) {
        userUpdate(this.editUserUpdate._id, this.editUserUpdate).then(res =>{
          this.showEditUser = false;
          this.user = {...this.editUserUpdate}
        })
      }
    }
  },
  mounted() {
    userShow(this.$route.params.id).then(res =>{
      this.user=res
      this.editUserUpdate= {...res}
    })
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
