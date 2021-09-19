<template>
  <div>
    <div class="row"><input type="text"
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
    <tr v-for="element of filterData" @click="goToUser(element.id)">
      <td v-for="ele of fields">
        {{element[ele.field]}}</td>
    </tr>
    </tbody>
  </table></div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      search: ''
    }
  },
  name: 'CustomTable',
  props: {
    data: {type: Array, default: () => []},
    fields: {type: Array, default: () => []},
    filterProperties: {type: Array, default: () =>[]}
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

    }


  },
  computed: {
    filterData(){

      return this.data.filter(ele => {
        return this.controlElement(ele);

      })
    }
  },
}
</script>

<style scoped lang="scss">
</style>
