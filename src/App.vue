<template>
  <main>
    <!-- Header -->
    <header>
      <img src="" alt="image logo">
      <h1>{{ taskStore.name }} </h1>
    </header>

    <!-- New Form Component Call-->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- Loading -->
    <div class="loading" v-if="taskStore.isLoading">
      Loading Tasks......
    </div>

    <!-- Filter Buttons -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- Task Loop -->
    <div v-if="filter === 'all'" class="task-list">
      <p>Total Tasks = {{ totalCount }} </p>      <!-- Using Store getters stored to ref as return-->
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div v-if="filter === 'favs'" class="task-list">
      <p>Fav Tasks = {{ favCount }} </p>          <!-- Using Store getters stored to ref as return-->
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- Reset Store State -->
     <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia';
  import TaskDetails from './components/TaskDetails.vue';
  import TaskForm from './components/TaskForm.vue';
  import { useTaskStore } from './store/TaskStore';

  export default {
    components: {TaskDetails, TaskForm },

    setup () {
      const filter = ref('all')
      const taskStore = useTaskStore()

      //Storing States and Getters From Store to ref variables
      const { tasks, isLoading, favs, favCount, totalCount} = storeToRefs(taskStore)

      //Run Store getTask
      taskStore.getTasks()

      return {
        taskStore, filter,
        tasks, isLoading, favs, favCount, totalCount    //Returning stores save to ref
      }
    }

  }

</script>
