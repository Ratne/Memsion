<template>
  <div class="home pt-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
        <TitleH1 label="Report Utenti"></TitleH1>
          <SummaryCourseStats :users="report.list"></SummaryCourseStats>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {courseReport} from "../../../services/coursesService";
import SummaryCourseStats from "../../../components/views/admin/SummaryCourseStats";
import TitleH1 from "../../../components/shared/design/TitleH1";


export default {
  name: 'ReportCourse',
  components: {
    TitleH1,
    SummaryCourseStats,

  },
  props: {
    lessonTotal: {type: Number}
  },
  data() {
    return {
      report: [],
    }
  },
  mounted() {
    courseReport(this.$route.params.courseId).then(res => {
      this.report = res
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
