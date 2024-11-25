import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({

    tasks: [
      {id: 1, title: "List Task Number 1", isFav: false },
      {id: 2, title: "List Task Number 2", isFav: true }
    ],
    name: "StateName"

  })
})