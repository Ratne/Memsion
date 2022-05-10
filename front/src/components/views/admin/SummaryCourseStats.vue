<template>
<template v-for="(user, index) in users">
  <Accordion :title="user.user[0].name +' ' + user.user[0].surname" :index="index">

           <div class="w-100 d-flex" v-for="lesson in user.lessons"><span><i class="bi bi-card-heading me-2"></i> {{lesson.name}} </span> <span class="ms-auto me-4">{{lesson.users.percentage}}%</span></div>

  </Accordion>
</template>
</template>

<script>
import Accordion from "../../shared/design/Accordion";
export default {
  name: "SummaryCourseStats",
  components: {Accordion},
  props:{
    users: {type: Array}
  },
  methods:{
    coursePercentage(course){
        let singlePercentage = 0;
        course.lessons.forEach(lesson => {

          singlePercentage+= lesson.users[0].percentage

        })

       return singlePercentage/course.lessons.length

    }
  }

}
</script>

<style scoped>

</style>
