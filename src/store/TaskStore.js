import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [ ],
    isLoading: false,
    name: "StateName"
  }),

  getters: {
    favs() {
      return this.tasks.filter(task => task.isFav)      //get isFav is true in state tasks
    },
    favCount() {
      return this.tasks.reduce((count, task) => {
        return task.isFav ? count + 1 : count
      }, 0)
    },
    totalCount() {                        // METHOD SYNTAX
      return this.tasks.length;
    }

    // totalCount: (state) => {           // ARROW SYNTAX
    //   return state.tasks.length
    // }
  },

  actions: {
    async getTasks() {
      this.isLoading = true
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json()
        this.tasks = data
      this.isLoading = false
    },

    addTask(task) {
      this.tasks.push(task)
    },
    deleteTask(id){
      this.tasks = this.tasks.filter(filterTasks =>{
        return filterTasks.id !== id                              // return task/s not equal to id
      })
    },
    toggleFav(id){
      const task = this.tasks.find(task => task.id === id)        // get task from tasks w/ the id
      task.isFav = !task.isFav                                    // change isFave property of the task
    }
  }

})