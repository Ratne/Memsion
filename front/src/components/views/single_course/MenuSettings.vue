<template>
<div class="container">
  <div class="row">
<h1>Menu</h1>

    <div class="mt-1" v-for="m in menu">
     Label: {{m.label}}
      Url: {{m.url}}
      <button class="btn btn-danger" @click="deleteVoice(m._id)">ELIMINA</button>
    </div>

    <div class="container mt-3">
      <button class="btn btn-primary" @click="showAddVoice">AGGIUNGI</button>
    </div>

    <menu-add @addMenu="addVoice" v-if="showAdd" />

  </div>
</div>
</template>

<script>
import {courseDeleteMenu, coursesAddVoiceMenu, coursesShowMenu} from "../../../services/coursesService";
import MenuAdd from "./MenuAdd";

export default {
  name: "MenuSettings",
  components: {MenuAdd},
  data(){
    return {
      courseId: this.$route.params.id,
      menu: [],
      showAdd: false
    }
  },
  methods:{
    deleteVoice(idMenu){
      courseDeleteMenu(this.courseId, idMenu).then(res =>{
        this.menu = this.menu.filter(ele => ele._id !== idMenu)
      })
    },
    showAddVoice(){
      this.showAdd = true
    },
    addVoice(data){
      coursesAddVoiceMenu(this.courseId, data.menu).then(res =>{
        this.menu.push(res.menu)
        data.callback && data.callback()
        this.showAdd = false
      })
    }
  },
  mounted() {
    coursesShowMenu(this.courseId).then(res =>{
      this.menu = res.menu
    })
  }
}
</script>

<style scoped>

</style>