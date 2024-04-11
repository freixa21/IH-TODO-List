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


console.log(task);
console.log(taskId);


// const saveTask = async () => {
//   if (editingTask && editedTaskTitle.value.trim()) {
//     await tasksStore.editTask({ id: editingTask, title: editedTaskTitle.value });
//     // Optionally, redirect to task list page after saving
//     router.push({ name: 'TaskList' });
//   }
// };

const saveTask = async () => {

  // console.log(editingTask);
  // console.log(editedTaskTitle.value);

  // if (editedTaskTitle.value) {
  // 	const task = {
  // 		id: editingTask,
  // 		title: editedTaskTitle.value,
  // 	}
  // 	await tasksStore.editTask(task);
  // 	editedTaskTitle.value = ''; 
  // 	tasksStore.fetchTasks();
  // }
}

onMounted (() => {
	tasksStore.fetchEditingTaskDetails(router.currentRoute.value.params.taskId);
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