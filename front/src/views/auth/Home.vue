<template>
  <div class="container-fluid pb-5">
  <div class="home">
    <h1 v-if="user && !user.isAdmin">Homepage</h1>
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
  computed:{
    user(){
      return this.$store.getters.getUser
    }
  }
}
</script>

