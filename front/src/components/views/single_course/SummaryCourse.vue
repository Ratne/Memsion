<template>
  <div>
    <!--summary course-->
        {{ course.name }} - {{ course.requiredTag }} - <button class="alert-info" @click="$emit('setShowEdit')">Modifica</button>
    <!--summary course-->
  </div>

</template>

<script>



export default {
  name: 'SummaryCourse',
  props: {
    course: {type: Object, default:()=> ({}) }
  }
}
</script>
