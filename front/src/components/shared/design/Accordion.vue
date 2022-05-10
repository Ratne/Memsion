<template>
   <div class="accordion-item">
      <h2 class="accordion-header" :id="id">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+idCollapsed" aria-expanded="true" :aria-controls="idCollapsed">
          <div class="w-100 d-flex">{{title}} <span v-if="rightContent" class="badge fs-6 bg-primary text-black ms-auto me-3">{{rightContent}}%</span></div>
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
    index: {},
    rightContent: {type: String}
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
@import "src/sass/variables";
.accordion-item{

  margin-bottom: 12px;
  border: none;
  background-color: $grayLight;
.accordion-button{
    background-color: $gray;
    color: $white
  }
.accordion-body{
    text-align: start;
  }

}


</style>
