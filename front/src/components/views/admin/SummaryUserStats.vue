<template>
<template v-for="(course, index) in courses">
  <Accordion :title="course.name" :right-content="coursePercentage(course)" :index="index">

           <div class="w-100 d-flex" v-for="lesson in course.lessons"><span><i class="bi bi-card-heading me-2"></i> {{lesson.name}} </span> <span class="ms-auto me-4">{{lesson.users[0].percentage}}%</span></div>

  </Accordion>
</template>
</template>

<script>
import Accordion from "../../shared/design/Accordion";
export default {
  name: "SummaryUserStats",
  components: {Accordion},
  props:{
    courses: []
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
