import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllTasks, createTask, deleteTask, markTaskAsCompleted, markTaskAsIncompleted} from '@/api/tasksApi'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions
  async function fetchTasks() {
    try {
      const data = await fetchAllTasks()
      tasks.value = data;
    } catch (error) {
      console.error(error)
    }
  }

async function createNewTask(task) {
    try {
      await createTask(task)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteSelectedTask(task) {
    try {
      await deleteTask(task)
    } catch (error) {
      console.error(error)
    }
  }
  async function markAsCompleted(task) {
    try {
      await markTaskAsCompleted(task)
    } catch (error) {
      console.error(error)
    }
  }
  async function markAsIncompleted(task) {
    try {
      await markTaskAsIncompleted(task)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    // Getters
    // Actions
    fetchTasks,
    createNewTask,
    deleteSelectedTask,
    markAsIncompleted,
    markAsCompleted
  }
})
