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
      <p>Total Tasks = {{ taskStore.totalCount }} </p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
      </div>
      <div v-if="filter === 'favs'" class="task-list">
        <p>Fav Tasks = {{ taskStore.favCount }} </p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>

  </main>
</template>

<script>
  import { ref } from 'vue'
  import TaskDetails from './components/TaskDetails.vue';
  import TaskForm from './components/TaskForm.vue';
  import { useTaskStore } from './store/TaskStore';

  export default {
    components: {TaskDetails, TaskForm },

    setup () {
      const filter = ref('all')
      const taskStore = useTaskStore()

      //Run Store getTask
      taskStore.getTasks()

      return { taskStore, filter }
    }

  }

</script>
