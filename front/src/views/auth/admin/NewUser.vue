<template>
  <div>
    <h3>Aggiungi Utente</h3>
</div>
<div class="container">
  <!--user add-->
  <div>
    <form @submit.prevent="addUser">
    <FormGroupCustom :error="errors['name']" v-model:value="user.name" label="name" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['surname']" v-model:value="user.surname" label="surname" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['email']" v-model:value="user.email" label="email" type="text"></FormGroupCustom>
    <FormGroupCustom :error="errors['infusionsoftId']" v-model:value="user.contactId" label="infusionsoft Id" type="number"></FormGroupCustom>
    <button class="btn btn-primary w-100 mt-3 mb-3 "  type="submit">INSERISCI UTENTE</button>
    </form>
  </div>
  <!--user add-->
</div>
</template>

<script>



import FormGroupCustom from "../../../components/shared/form/FormGroupCustom";
import {validationMixin} from "../../../mixins/validationMixin";
import {validationTypeName} from "../../../utils/validationType";
import {userAdd} from "../../../services/userService";



export default {
  name: 'NewUser',
  components: {FormGroupCustom},
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
