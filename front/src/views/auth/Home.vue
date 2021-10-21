<template>
  <div class="container-fluid">
  <div class="home">
    <h1>Homepage</h1>
    <admin-courses v-if="user && user.isAdmin" />
    <div v-else>



      <UserCourses />



    </div>
  </div>
  </div>
</template>

<script>


import {http} from "../../utils/http";
import AdminCourses from "./admin/AdminCourses";
import AdminUser from "./admin/AdminUser";
import UserCourses from "./user/UserCourses";

export default {
  name: 'Home',
  components: {UserCourses, AdminCourses},
  mounted() {
    http.get('/auth').then(res =>{
      this.$store.dispatch('setUser', res)
    })
  },
  computed:{
    user(){
      return this.$store.getters.getUser
    }
  }
}
</script>
