<template>

  <div class="row">
    <div class="col-4">
     {{label}}
    </div>
    <div class="col-8">
      {{value !== undefined && value.toFixed(2)}}
    </div>

  </div>
</template>




<script>

export default {
  name: 'PresentRow',
  props: ['value', 'label'], //se non ho bisogno di tipizzare


}
</script>
