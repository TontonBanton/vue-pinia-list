<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="taskStore.deleteTask(task.id)" class="material-icons">delete</i>
      <i @click="taskStore.toggleFav(task.id)"
         class="material-icons"
        :class= "{ isActive: task.isFav }">   <!--apply isActive css (red color) if isFav value is true -->
        favorite
      </i>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/TaskStore';

  export default {
    props: ['task'],

    setup (){
      const taskStore = useTaskStore()
      return { taskStore }
    }
  }
</script>