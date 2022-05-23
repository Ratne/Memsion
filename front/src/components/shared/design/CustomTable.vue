<template>
  <div>
    <div class="row">
      <input class="form-control" type="text"
                            placeholder="Cerca utente"
                            v-model="search" /></div>
    <div class="row">
  <table class="table">

    <thead>
    <tr>
      <td v-for="ele of fields">
        {{ele.label}}
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="element of paginateData" @click="goToUser(element.id)">
      <td v-for="ele of fields">
        {{element[ele.field]}}</td>
    </tr>
    </tbody>
  </table>

    <Pagination :page="page" :pages="pages" @changePage="changePage" />

    </div>
  </div>

</template>

<script>
import Pagination from "./Pagination";
export default {
  components: {Pagination},
  data (){
    return {
      search: '',
      elementForPage:50,
      page: 1
    }
  },
  name: 'CustomTable',
  props: {
    data: {type: Array, default: () => []},
    fields: {type: Array, default: () => []},
    filterProperties: {type: Array, default: () =>[]},

  },
  methods: {
    compareSearch(value){
      return value.toLowerCase().trim().indexOf(this.search.toLowerCase().trim()) !==-1
    },
    controlElement(user){
      return this.filterProperties.reduce((acc, ele)=>{
        if (this.compareSearch(user[ele])) {
          acc = true
        }
        return acc;
      }, false)
    },
    goToUser(id){

      this.$router.push({
        name: 'SingleUser',
        params: {
          id
        }
      })

    },
    changePage(page){
      this.page = page
    }


  },
  computed: {
    filterData(){

      return this.data.filter(ele => {
        return this.controlElement(ele);

      })
    },
    offset(){
      return (this.page - 1)*this.elementForPage
    },
    paginateData(){
      return this.filterData.filter((ele, index)=> index >= this.offset && index < (this.offset + this.elementForPage))
    },
    numberLenght(){
      return this.filterData.length
    },
    pages(){
      return Math.ceil(this.numberLenght/this.elementForPage) || 1
    }

  },
}
</script>

<style scoped lang="scss">
</style>
