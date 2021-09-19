<template>
  <div class="home">
    <h1>Homepage</h1>
    <admin-courses />
  </div>
</template>

<script>


import {http} from "../../utils/http";
import AdminCourses from "./AdminCourses";
import AdminUser from "./AdminUser";

export default {
  name: 'Home',
  components: {AdminCourses},
  mounted() {
    http.get('/auth').then(res =>{
      console.log(res)
    })
  }
}
</script>
