<template>
<div class="container mt-5">
  <div class="row">
    <div class="col-12 mt-5">
      <h3>Aggiungi Utente</h3>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-12">
  <!--user add-->
  <div class="text-start">
    <form @submit.prevent="addUser">
    <FormGroupCustom :error="errors['name']" v-model:value="user.name" label="name" type="text"></FormGroupCustom>
    <FormGroupCustom v-model:value="user.surname" label="surname" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['contactId']" v-model:value="user.contactId" label="infusionsoft Id" type="number"></FormGroupCustom>
    <button class="btn btn-primary w-25 mt-3 mb-3 "  type="submit">INSERISCI UTENTE</button>
    </form>
  </div>
  <!--user add-->

  <go-back  class="text-start" />
    </div>
  </div>
</div>
</template>

<script>



import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import {userAdd} from "../../../services/userService";
import GoBack from "../../../components/shared/design/GoBack";



export default {
  name: 'NewUser',
  components: {GoBack, FormGroupCustom},
  data(){
    return {
      user: {},
      validazione: [
        {
          name: 'name',
          validation: {
            type: validationTypeName.required,}
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
          name: 'contactId',
          validation:
              {type: validationTypeName.required}
        },
      ]
    }
  },
  mixins: [validationMixin],
  methods:{
    addUser(){
      if (this.isValid(this.user)) {
        userAdd(this.user).then(res =>{
        this.$router.push({
          name: 'AdminUser'
        })
      })
      }
    }
  },

  computed:{
    allValidations(){
      return [...this.validazione]

    }
  }
}
</script>
