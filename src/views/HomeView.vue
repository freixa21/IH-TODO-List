<script setup>

import { useTasksStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);

const taskTitle = ref('');

const _addTask = async () => {
	const task = {
		user_id: '59d670b9-7fe3-41e5-8d63-527d4ca1b504',
		title: taskTitle.value,
		is_complete: false,
	}

	// Crea la task
	await tasksStore.createNewTask(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks();
}

onMounted(() => {
	tasksStore.fetchTasks();
})

</script>

<template>
	<main>
		<h1 class="text-3xl font-bold underline text-yellow-600 border-red-900">Tasks</h1>
	</main>

	<section>
		<span>Total Tasks: {{ tasks.length }}</span>

		<ul>
			<li v-for="task in tasks" :key="tasks.id"> {{ task.title }}</li>
		</ul>

		<div>
			<label>
				Task Title:
				<input type="text" v-model="taskTitle">
			</label>
			<button @click="_addTask">Add task</button>
		</div>
	</section>

</template>

<style scoped></style>