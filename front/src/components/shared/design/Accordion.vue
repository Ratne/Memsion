<template>
   <div class="accordion-item">
      <h2 class="accordion-header" :id="id">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+idCollapsed" aria-expanded="true" :aria-controls="idCollapsed">
         {{title}}
        </button>
      </h2>
      <div  :id="idCollapsed" class="accordion-collapse collapse" :aria-labelledby="id">
        <div class="accordion-body">
        <slot></slot>
        </div>
      </div>
    </div>
</template>





<script>
export default {
  name: "Accordion",
  props: {
    title: {type: String},
    index: {}
  },

  computed:{
    id(){
      return 'heading-'+this.index
    },
    idCollapsed(){
      return 'collapsed-'+this.index
    },

  },
}
</script>

<style lang="scss" scoped>
.accordion-item{
  margin-bottom: 12px;
  border: none;
  background-color: #54c4bf1f;
  border-radius:20px;
.accordion-button{
    border-radius:20px;
    background-color: #3bbeb945;
    color: #1e6866
  }
.accordion-body{
    text-align: start;
  }

}


</style>