import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllTasks, createTask, deleteTask, markTaskAsCompleted, markTaskAsIncompleted, editTaskAPI, fetchTaskDetails} from '@/api/tasksApi'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([]);
  const task = ref([]);

  // Getters
  async function fetchEditingTaskDetails(taskId) {
    try {
      const data = await fetchTaskDetails(taskId)
      task.value = data;

    } catch (error) {
      console.error(error)
    }
  }

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

  async function editTask(task) {
    try {
      await editTaskAPI(task)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    task,
    // Getters
    // Actions
    fetchTasks,
    createNewTask,
    deleteSelectedTask,
    markAsIncompleted,
    markAsCompleted,
    editTask,
    fetchEditingTaskDetails
  }
})
