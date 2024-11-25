<template>
  <main>
    <!-- Header -->
    <header>
      <img src="" alt="image logo">
      <h1>{{ taskStore.name }} </h1>
    </header>

    <!-- Task Loop -->
    <div class="task-list">
      <div v-for="task in taskStore.tasks">
        <TaskDetails />
        <p>{{ task.tittle }}</p>
      </div>
    </div>

  </main>
</template>

<script>
  import TaskDetails from './components/TaskDetails.vue';
  import { useTaskStore } from './store/TaskStore';

  export default {
    components:
      { TaskDetails },

    setup () {
      const taskStore = useTaskStore()
      return { taskStore }
    }
  }

</script>
