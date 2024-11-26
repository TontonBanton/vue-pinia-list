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

    async addTask(task) {
      this.tasks.push(task)

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })
      if (res.error) {
        console.log(res.error)
      }
    },

    async deleteTask(id){
      this.tasks = this.tasks.filter(filterTasks =>{
        return filterTasks.id !== id                              // return task/s not equal to id
      })

      const res = await fetch('http://localhost:3000/tasks/' + id , {
        method: 'DELETE',
      })
      if (res.error) {
        console.log(res.error)
      }
    },

    async toggleFav(id){
      const task = this.tasks.find(task => task.id === id)        // get task from tasks w/ the id
      task.isFav = !task.isFav                                    // change isFave property of the task


      const res = await fetch('http://localhost:3000/tasks/' + id , {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav}),
        headers: {'Content-Type': 'application/json'}
      })
      if (res.error) {
        console.log(res.error)
      }
    }
  }

})