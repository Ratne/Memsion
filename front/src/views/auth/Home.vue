<template>
  <div class="home">
    <h1>Homepage</h1>
    <admin-courses />
  </div>
</template>

<script>
// @ is an alias to /src


import {http} from "../../utils/http";
import AdminCourses from "./AdminCourses";

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
