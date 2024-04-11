<script setup>

import { useTasksStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
const router = useRouter();


const taskTitle = ref('');
const editedTaskId = ref('');

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


const _deleteTask = async (taskId) => {
	const task = {
		id: taskId,
		user_id: '59d670b9-7fe3-41e5-8d63-527d4ca1b504',
	}
	// Borra la task
	await tasksStore.deleteSelectedTask(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks();
}

const _markAsCompleted = async (taskId) => {
	const task = {
		id: taskId,
		user_id: '59d670b9-7fe3-41e5-8d63-527d4ca1b504',
	}
	// Borra la task
	await tasksStore.markAsCompleted(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks();
}

const _markAsIncompleted = async (taskId) => {

	const task = {
		id: taskId,
		user_id: '59d670b9-7fe3-41e5-8d63-527d4ca1b504',
	}
	// Borra la task
	await tasksStore.markAsIncompleted(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks();
}

const _editTask = (taskId) => {
  router.push({ name: 'TaskEdit', params: { taskId } });
};

// const _editTask = async () => {

// 	console.log(editedTaskId.value);
// 	console.log(taskTitle.value);

// 	if (editedTaskId.value) {
// 		const task = {
// 			id: editedTaskId.value,
// 			title: taskTitle.value,
// 		}
// 		await tasksStore.editTask(task);
// 		editedTaskId.value = null;
// 		taskTitle.value = ''; 
// 		tasksStore.fetchTasks();
// 	}
// }

onMounted(() => {
	tasksStore.fetchTasks();
})

</script>

<template>
	<main>
		<h1 class="text-3xl font-bold text-center">TO DO LIST</h1>
	</main>

	<section class="max-w-screen-sm m-auto">
		<!-- <span>Total Tasks: {{ tasks.length }}</span> -->

		<ul class="w-full">
			<li v-for="task in tasks" :key="task.id">
				<div class="bg-slate-100 flex flex-row items-center justify-between my-2">
					<div>
						<span v-if="editedTaskId === task.id">
							<input type="text" v-model="task.title">
						</span>
						<span v-else>{{ task.title }}</span>
					</div>
					<div>
						<button @click="_deleteTask(task.id)"><img src="@/assets/images/delete.svg" alt=""></button>
						<button v-if="!task.is_complete" @click="_markAsCompleted(task.id)">Mark as Completed</button>
						<button v-else @click="_markAsIncompleted(task.id)">Mark as Incomplete</button>
						<button @click="_editTask(task.id)"><img src="@/assets/images/edit.svg" alt=""></button>
					</div>
				</div>
			</li>
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