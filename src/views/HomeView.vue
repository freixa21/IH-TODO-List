<script setup>

import { useTasksStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';
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

const remainingLiCount = computed(() => {
	return Math.max(15 - tasks.value.length, 0);
});

onMounted(() => {
	tasksStore.fetchTasks();
})

</script>

<template>
	<main class="flex flex-row items-center">
		<div class="min-h-[85vh] w-full flex flex-row justify-center">
			<div class="paper max-w-[600px] h-full w-full py-11 m-5">
				<div class="lines">
					<div class="my-10">
						<strong>TO DO LIST</strong>
						<ul class="w-full">
							<li class="flex flex-row h-[30px] pt-[8px]"></li>
							<li v-for="task in tasks" :key="task.id" class="flex flex-row h-[30px] pt-[8px] ">
								<button v-if="!task.is_complete" @click="_markAsCompleted(task.id)" class="mr-5 w-[24px] h-[24px]"><img
										src="@/assets/images/unchecked.png" alt=""></button>
								<button v-else @click="_markAsIncompleted(task.id)" class="mr-5 w-[24px] h-[24px]"><img
										src="@/assets/images/checked.png" alt=""></button>
								<div class="flex flex-row">
									<div>
										<span v-if="!task.is_complete" class="text-2xl" style="line-height: 0;">{{
								task.title }}</span>
										<span v-else
											class="inline-block decoration-inherit relative after:w-full after:content-[''] after:block after:w-fill after:h-2/4 after:absolute after:top-[0.1rem] after:left-0 after:border-b-2 after:border-red-600 text-2xl"
											style="line-height: 0;">{{ task.title }}</span>
									</div>
									<div class="absolute right-5">
										<button @click="_deleteTask(task.id)"><img src="@/assets/images/delete.png"
												alt="" class="w-[24px] h-[24px]"></button>
										<button @click="_editTask(task.id)"><img src="@/assets/images/edit.png"
												alt="" class="w-[24px] h-[24px]"></button>
									</div>
								</div>
							</li>
							<li class="flex flex-row h-[30px] pt-[8px]"></li>
							<li><label>
									New task:
									<input type="text" v-model="taskTitle"
										class="h-[28px] pt-[0px] mt-[5px] w-3/4 border-b-2 border-black focus:outline-none">
								</label>
								<button @click="_addTask">Add task</button>
							</li>
							<li class="flex flex-row h-[30px] pt-[8px]"></li>
							<li v-for="index in remainingLiCount" :key="index" class="flex flex-row h-[30px] pt-[8px]">
								<span></span>
							</li>
						</ul>
					</div>
					<div>

					</div>
				</div>

			</div>
		</div>

	</main>
</template>

<style scoped></style>