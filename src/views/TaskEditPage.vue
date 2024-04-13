<script setup>
import { useTasksStore } from '@/stores/tasksStore';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const tasksStore = useTasksStore();
const { task } = storeToRefs(tasksStore);
const router = useRouter();
const taskId = router.currentRoute.value.params.taskId;
const editedTaskTitle = ref('');


const saveTask = async () => {
  const task = {
    id: taskId,
    title: editedTaskTitle.value,
  }
  await tasksStore.editTask(task);
  router.push("/")
}

onMounted(async () => {
  await tasksStore.fetchEditingTaskDetails(router.currentRoute.value.params.taskId);
  editedTaskTitle.value = task.value.title
})

</script>


<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Edit Task</h2>
    <form @submit.prevent="saveTask">
      <label for="taskTitle">Task Title:</label>
      <input id="taskTitle" type="text" v-model="editedTaskTitle">
      <button type="submit">Save</button>
    </form>
  </div>
</template>