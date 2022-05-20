<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 mt-5">
        <TitleH1 label="Menu"/>
        <div class="d-flex flex-wrap">
          <div class="mt-2 bgGrayLight p-3 me-3 menuClass" v-for="m in menu">
            <div>Label: {{ m.label }}</div>
            <div class="text-truncate"> Url: {{ m.url }}</div>
            <div class="pt-3">
              <icon-button label="Elimina" @clickEvent="deleteVoice(m._id)" icon="bi bi-trash2"/>
              <icon-button label="Modifica" @clickEvent="editVoice(m)" class="ms-3" icon="bi bi-pencil"/>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <icon-button label="Aggiungi" @clickEvent="showAddVoice" icon="bi bi-plus-circle"/>
        </div>

        <menu-add @addMenu="addVoice" v-if="showAdd"/>

        <div class="container mt-3" v-if="editMenu">

          <TitleH2 label="Modifica Menu"></TitleH2>
          <EditMenu @editMenu="callEditMenu" :editMenu="editMenu"></EditMenu>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
import {
  courseDeleteMenu,
  coursesAddVoiceMenu,
  coursesEditVoiceMenu,
  coursesShowMenu
} from "../../../services/coursesService";
import MenuAdd from "./MenuAdd";
import IconButton from "../../shared/design/iconButton";
import GoBack from "../../shared/design/GoBack";
import TitleH1 from "../../shared/design/TitleH1";
import TitleH2 from "../../shared/design/TitleH2";
import EditMenu from "./editMenu";

export default {
  name: "MenuSettings",
  components: {EditMenu, TitleH2, TitleH1, GoBack, IconButton, MenuAdd},
  data() {
    return {
      courseId: this.$route.params.id,
      menu: [],
      editMenu: false,
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
    callEditMenu(data){
      coursesEditVoiceMenu(this.courseId, data).then(res => {
        this.menu = this.menu.map(ele => ele._id === data.menu._id ? data.menu : ele)
        this.editMenu = undefined
      })

    },
    editVoice(menu) {
      this.editMenu = menu
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
.menuClass {
  width: 300px;

}
</style>
