<template>
<div class="container mt-5">
  <div class="row">
    <div class="col-12 mt-5">
      <h1>Menu</h1>

    <div class="mt-1" v-for="m in menu">
     Label: {{m.label}}
      Url: {{m.url}}
      <icon-button label="Elimina" @clickEvent="deleteVoice(m._id)" icon="bi bi-trash2"/>

    </div>

    <div class="container mt-3">
      <icon-button label="Aggiungi" @clickEvent="showAddVoice" icon="bi bi-plus-circle"/>
    </div>
      <div class="row text-start">
        <go-back />
      </div>

    <menu-add @addMenu="addVoice" v-if="showAdd" />
    </div>
  </div>
</div>
</template>

<script>
import {courseDeleteMenu, coursesAddVoiceMenu, coursesShowMenu} from "../../../services/coursesService";
import MenuAdd from "./MenuAdd";
import IconButton from "../../shared/design/iconButton";
import GoBack from "../../shared/design/GoBack";

export default {
  name: "MenuSettings",
  components: {GoBack, IconButton, MenuAdd},
  data(){
    return {
      courseId: this.$route.params.id,
      menu: [],
      showAdd: false
    }
  },
  methods:{
    deleteVoice(idMenu){
      if(confirm("Vuoi eliminare la voce del menu?")) {
        courseDeleteMenu(this.courseId, idMenu).then(res => {
          this.menu = this.menu.filter(ele => ele._id !== idMenu)
        })
      }
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
