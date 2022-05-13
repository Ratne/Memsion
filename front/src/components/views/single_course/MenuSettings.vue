<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 mt-5">
        <TitleH1 label="Menu" />
<div class="d-flex flex-wrap">
        <div class="mt-2 bgGrayLight p-3 me-3 menuClass" v-for="m in menu">
          <div>Label: {{ m.label }}</div>
          <div class="text-truncate"> Url: {{ m.url }}</div>

          <icon-button label="Elimina" @clickEvent="deleteVoice(m._id)" icon="bi bi-trash2"/>
<!--          <icon-button label="Modifica" @clickEvent="editVoice(m._id)" icon="bi bi-trash2"/>-->

        </div>
</div>
        <div class="mt-3">
          <icon-button label="Aggiungi" @clickEvent="showAddVoice" icon="bi bi-plus-circle"/>
        </div>

        <menu-add @addMenu="addVoice" v-if="showAdd"/>
      </div>
    </div>
  </div>
</template>

<script>
import {courseDeleteMenu, coursesAddVoiceMenu, coursesShowMenu} from "../../../services/coursesService";
import MenuAdd from "./MenuAdd";
import IconButton from "../../shared/design/iconButton";
import GoBack from "../../shared/design/GoBack";
import TitleH1 from "../../shared/design/TitleH1";

export default {
  name: "MenuSettings",
  components: {TitleH1, GoBack, IconButton, MenuAdd},
  data() {
    return {
      courseId: this.$route.params.id,
      menu: [],
      showAdd: false
    }
  },
  methods: {
    deleteVoice(idMenu) {
      if (confirm("Vuoi eliminare la voce del menu?")) {
        courseDeleteMenu(this.courseId, idMenu).then(res => {
          this.menu = this.menu.filter(ele => ele._id !== idMenu)
        })
      }
    },
    showAddVoice() {
      this.showAdd = true
    },
    addVoice(data) {
      coursesAddVoiceMenu(this.courseId, data.menu).then(res => {
        this.menu.push(res.menu)
        data.callback && data.callback()
        this.showAdd = false
      })
    }
  },
  mounted() {
    coursesShowMenu(this.courseId).then(res => {
      this.menu = res.menu
    })
  }
}
</script>

<style lang="scss" scoped>
.menuClass{
  width: 300px;

}
</style>
