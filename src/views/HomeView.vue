<script setup>

import { useTasksStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
const taskTitle = ref('');

const usersStore = useUserStore();
const currentUser = usersStore.user.id;

const shootConfetti = () => {
	const myConfetti = window.confetti.create(document.getElementById('body'), {
		resize: true,
		useWorker: true,
	});
	myConfetti();
};


const _addTask = async () => {
	const task = {
		user_id: currentUser,
		title: taskTitle.value,
		is_complete: false,
	}
	// Crea la task
	await tasksStore.createNewTask(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks(currentUser);
}


const _deleteTask = async (taskId) => {
	const task = {
		id: taskId,
		user_id: currentUser,
	}
	// Borra la task
	await tasksStore.deleteSelectedTask(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks(currentUser);
}

const _markAsCompleted = async (taskId) => {
	const task = {
		id: taskId,
		user_id: currentUser,
	}
	// Marcar como completada
	await tasksStore.markAsCompleted(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks(currentUser);
	shootConfetti();
}

const _markAsIncompleted = async (taskId) => {

	const task = {
		id: taskId,
		user_id: currentUser,
	}
	// Borra la task
	await tasksStore.markAsIncompleted(task);
	// Refresca las tasks despues de crearla
	tasksStore.fetchTasks(currentUser);
}

const _editTask = (taskId) => {
	router.push({ name: 'TaskEdit', params: { taskId } });
};

const remainingLiCount = computed(() => {
	return Math.max(15 - tasks.value.length, 0);
});

onMounted(() => {

	console.log(currentUser);

	if (currentUser === undefined) {
		console.log("redirecting...");
		router.push('/signin');
	}

	tasksStore.fetchTasks(currentUser);
})

</script>

<template>
	<main class="flex flex-row items-center">
		<div class="min-h-[85vh] w-full flex flex-row justify-center">
			<div class="paper max-w-[600px] h-full w-full py-11 pr-2 pl-5 m-5">
				<div class="lines">
					<div class="my-10">
						<strong>TO DO LIST</strong>
						<ul class="w-full">
							<li class="flex flex-row min-h-[30px] mt-[5px]"></li>
							<li v-for="task in tasks" :key="task.id" class="flex flex-row min-h-[30px]">
								<button v-if="!task.is_complete" @click="_markAsCompleted(task.id)"
									class="mr-5 w-[24px] h-[24px] pt-1 confetti-button"><img
										src="@/assets/images/unchecked.png" alt=""></button>
								<button v-else @click="_markAsIncompleted(task.id)"
									class="mr-5 w-[24px] h-[24px] pt-1"><img src="@/assets/images/checked.png"
										alt=""></button>
								<div class="flex flex-row w-full pr-[75px]">
									<div>
										<span v-if="!task.is_complete" class="text-2xl"
											style="line-height: 1.209; font-size: 1.499rem;">{{
								task.title }}</span>
										<span v-else
											class="inline-block decoration-inherit relative text-2xl line-through"
											style="line-height: 1.209; font-size: 1.499rem;">{{ task.title }}</span>
									</div>
									<div class="absolute right-5 pt-[3px]">
										<button @click="_deleteTask(task.id)"><img src="@/assets/images/delete.png"
												alt="" class="w-[24px] h-[24px]"></button>
										<button @click="_editTask(task.id)"><img src="@/assets/images/edit.png" alt=""
												class="w-[24px] h-[24px]"></button>
									</div>
								</div>
							</li>
							<li class="flex flex-row min-h-[30px] "></li>
							<li>
								<div class="flex flex-row w-full items-center">
									<input type="text" v-model="taskTitle"
										class="h-[28px] pt-[0px] mt-[5px] w-full mx-2 border-b-2 border-black focus:outline-none bg-transparent"
										placeholder="Add new task...">
									<button @click="_addTask"><img src="@/assets/images/add.svg" alt=""
											class="bg-white border-2 border-black rounded-md"></button>
								</div>

							</li>
							<li class="flex flex-row min-h-[30px] "></li>
							<li v-for="index in remainingLiCount" :key="index" class="flex flex-row min-h-[30px] ">
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