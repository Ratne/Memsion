<template>
  <!--modules-->
  <div class="row adminSidebar mt-3">
    <div class="col-12">
      <TitleH1 label="Elenco Moduli" />
      <div class="d-flex flex-wrap">
        <div class="card listAdminCourse" v-for="module in modules" @click="$emit('goToModule', module._id)">
          <div class="card-body">
            <h5 class="card-title">{{module.label}}</h5>
          </div>
        </div>
      </div>
    </div>
    <icon-button icon="bi bi-plus-circle" label="Aggiungi Modulo" @clickEvent="$emit('showModuleAdd')" />
  </div>
  <!--modules-->
</template>

<script>



import IconButton from "../../shared/design/iconButton";
import TitleH1 from "../../shared/design/TitleH1";
export default {
  name: 'ModulesList',
  components: {TitleH1, IconButton},
  props: {
    modules: {type: Array, default: ()=> [] }
  },

}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";

  .card{
    cursor: pointer;
    display: flex;
    margin-bottom: 20px;


    &.listAdminCourse{
      width: 200px;
      display: flex;
      padding: 0px 15px;
      background-color: $gray;
      border-radius: 0px;
      border: none;
      color: $white;
      margin-right: 20px;
    }


  }
.adminSidebar{
  padding:20px;
  background-color: $white;
  margin-right: 0px;
}


</style>
