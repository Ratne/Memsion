<template>


    <!--lessons-->
        <div><h1>Elenco lezioni</h1>
          <ul v-if="lessons">
            <li @click="$emit('goToLesson', lesson._id)" v-for="lesson in lessons">Titolo: {{lesson.name}}</li>
          </ul>
          <button @click="$emit('showEditLesson')" class="alert-info">Aggiungi Lezione</button>
        </div>
    <!--lessons-->

</template>

<script>



export default {
  name: 'LessonList',
  props: {
    lessons: {type: Array, default: ()=> [] }
  },

  methods:{
  },

}
</script>
