<template>
  <div class="mt-5 px-md-5 px-2">
    <div class="row">
      <div class="col-12 mt-5">
        <LessonList :lessons="module.lessons" @goToLesson="goToLessonId"/>
      </div>
    </div>
  </div>

  <div class="row px-md-5 px-2">
    <div class="col-12 mt-2 ms-3">
      <icon-button label="Aggiungi Lezione" icon="bi bi-plus-circle" @clickEvent="showAddLesson=true"/>
      <AddLesson v-if="showAddLesson" @addLesson="lessonAdd" @closeModalView="showAddLesson=false"/>
      <go-back class="text-start mt-3 mb-3"/>
    </div>
  </div>


  <div class="row px-md-5 px-2">
    <div class="col-12 text-end">
      <!--module delete-->
      <button class="btn btn-danger mt-3 mb-3 m-4 w-25 " type="submit" @click="deleteModule">ELIMINA MODULO</button>
      <button class="btn btn-primary mt-3 mb-3 m-4 w-25" type="submit" @click="editModule">MODIFICA MODULO</button>
    </div>
  </div>

  <div v-if="showEditModule" class="container">
    <div class="row">
      <div class="col-12">

        <EditModule :label="module.modules.label" @editModule="editModuleAction"
                    @closeModalView="showEditModule=false"></EditModule>
      </div>
    </div>
  </div>
</template>

<script>


import {lessonStore} from "../../../services/lessonService";
import EditorTextArea from "../../../components/shared/form/EditorTextArea";
import SummaryCourse from "../../../components/views/single_course/SummaryCourse";
import EditCourse from "../../../components/views/single_course/EditCourse";
import LessonList from "../../../components/views/single_course/LessonList";
import {setFormDataWithImage} from "../../../utils/requestUtils";
import ModulesList from "../../../components/views/single_course/ModulesList";
import {moduleDelete, moduleEdit, moduleShow} from "../../../services/moduleService";
import ModuleAdd from "../../../components/views/single_course/ModuleAdd";
import AddLesson from "../../../components/views/single_course/AddLesson";
import IconButton from "../../../components/shared/design/iconButton";
import GoBack from "../../../components/shared/design/GoBack";
import EditModule from "../../../components/views/single_course/EditModule";


export default {
  name: 'SingleCourseModule',
  components: {
    EditModule,
    GoBack,
    IconButton,
    AddLesson, ModuleAdd, ModulesList, LessonList, EditCourse, SummaryCourse, EditorTextArea
  },
  data() {
    return {
      module: {},
      showAddLesson: false,
      showEditModule: false,
      courseId: this.$route.params.courseId,
      moduleId: this.$route.params.moduleId
    }
  },
  methods: {


    lessonAdd(data) {
      this.$store.dispatch('resetErrors');
      let formData = setFormDataWithImage({...data.lesson, module: this.moduleId})
      lessonStore(formData, this.courseId).then(res => {
        this.module.lessons.push(res);
        data.callback()
        this.showAddLesson = false;
      })

    },
    goToLessonId(lessonId) {
      this.$router.push({
        name: 'SingleLesson',
        params: {
          courseId: this.courseId,
          lessonId
        }
      })
    },
    deleteModule() {
      if (confirm("Vuoi eliminare il modulo?")) {
        moduleDelete(this.$route.params.courseId, this.$route.params.moduleId).then(res => {
          this.$router.push({
            name: 'SingleCourse',
            params: {
              id: this.$route.params.courseId
            }
          })

        })
      }
    },
    editModule() {
      this.showEditModule = true
    },
    editModuleAction(label) {
      moduleEdit(this.$route.params.courseId, this.$route.params.moduleId, label).then(res => {
        this.module.modules.label = label
        this.showEditModule = false;
      })
    }
  },
  mounted() {
    moduleShow(this.$route.params.courseId, this.$route.params.moduleId).then(res => {
      this.module = res
    })
  },
}
</script>
