<script setup>

import { useTasksStore } from '@/stores/tasksStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);

onMounted(() => {
	tasksStore.fetchTasks();
})

</script>

<template>
	<main>
		<h1 class="text-3xl font-bold underline text-yellow-600 border-red-900">Home View</h1>
	</main>
</template>

<style scoped>
</style>