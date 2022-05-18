<template>
  <template v-for="(user, index) in users">
    <Accordion v-if="user.user[0]" :title="user.user[0].name +' ' + user.user[0].surname" :right-content="coursePercentage(user)" :index="index">

      <div class="w-100 d-flex" v-for="lesson in user.lessons"><span><i
          class="bi bi-card-heading me-2"></i> {{ lesson.name }} </span> <span
          class="ms-auto me-4">{{ lesson.users.percentage }}%</span></div>

    </Accordion>

  </template>
</template>

<script>
import Accordion from "../../shared/design/Accordion";

export default {
  name: "SummaryCourseStats",
  components: {Accordion},
  props: {
    users: {type: Array}
  },
  methods: {
    coursePercentage(user){
      let singlePercentage = 0;
      user.lessons.forEach(lesson => {


        singlePercentage+= +lesson.users.percentage

      })
      return (singlePercentage/user.size).toFixed(2)

    }

  },


}
</script>

<style scoped>

</style>
