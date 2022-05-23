<template>

  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item">
        <a @click="firstPage" :class="['page-link pointer', page === 1 ? 'disabled' : '']" aria-label="Precedente">
          <span aria-hidden="true"><i class="bi bi-chevron-bar-left"></i></span>
        </a>
      </li>
      <li class="page-item">
        <a @click="prevPage" :class="['page-link pointer', page === 1 ? 'disabled' : '']" aria-label="Precedente">
          <span aria-hidden="true"><i class="bi bi-chevron-left"></i></span>
        </a>
      </li>
      <li  v-for="p in array" @click="changePage(p)" :class="['page-item', page === p ? 'active' : '']"><a class="page-link" href="#">{{p}}</a></li>
<!--      <li class="page-item">-->
<!--        <a class="page-link" aria-label="...">-->
<!--          <span aria-hidden="true"><i class="bi bi-three-dots"></i></span>-->
<!--        </a>-->
<!--      </li>-->
      <li class="page-item">
        <a @click="nextPage" :class="['page-link pointer', page === pages ? 'disabled' : '']" aria-label="Prossimo">
          <span aria-hidden="true"><i class="bi bi-chevron-right"></i></span>
        </a>
      </li>

      <li class="page-item">
        <a @click="lastPage" :class="['page-link pointer', page === pages ? 'disabled' : '']" aria-label="Prossimo">
          <span aria-hidden="true"><i class="bi bi-chevron-bar-right"></i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: {type: Number, default: 1},
    page: {type: Number, default: 1}
  },
  emits:['changePage'],
  computed:{
    array(){
      return Array(this.pages).fill('').map((ele,index) => index+1)
    }
  },
  methods:{
    changePage(page){
      this.$emit('changePage', page)
    },
    prevPage(){
      if (this.page > 1){
        this.$emit('changePage', this.page-1)
      }
    },
    nextPage(){
      if (this.page < this.pages ) {
        this.$emit('changePage', this.page+1)
      }
    },
    firstPage(){
      this.$emit('changePage', 1)
    },
    lastPage(){
      this.$emit('changePage', this.pages)
    }
  },
  watch:{
    pages(){
      if (this.pages < this.page){
        this.$emit('changePage', this.pages)
      }
    },

    }
}
</script>

<style scoped lang="scss">
.pointer{
  cursor: pointer;
}
.page-link {
  &.disabled{
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
