<template>
  <!--modules-->
  <div class="container">
    <h1 class="mt-3">Elenco Moduli</h1>
    <div class="row">
      <div class="card mb-sm-2 ms-2 mx-2 listAdminCourse" style="width: 20%;" v-for="module in modules" @click="$emit('goToModule', module._id)">
        <div class="card-body">
          <h5 class="card-title">{{module.label}}</h5>
        </div>
      </div>
    </div>
    <button @click="$emit('showModuleAdd')" class="btn btn-primary">Aggiungi Modulo</button>
  </div>
  <!--modules-->
</template>

<script>



export default {
  name: 'ModulesList',
  props: {
    modules: {type: Array, default: ()=> [] }
  },

}
</script>

<style lang="scss" scoped>
@import "src/sass/variables";

  .card{
    cursor: pointer;


    &.listAdminCourse{
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 15px;
      background-color: $bgCard;
      border-radius: 20px;
      border: none;
      color: $colorUserCard;
      box-shadow: $bgShadow;
    }


  }


</style>
