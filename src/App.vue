<script setup>

import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const usersStore = useUserStore();
const router = useRouter(); 
const route = useRoute();

const _routeName = computed(() => route.name)

const signOut = async () => {
	try {
		await usersStore.signOut();
		router.push('/signin');
	} catch (error) {
		console.error(error);
	}
}

console.log(_routeName)
</script>

<template>
	<header>
		<div class="wrapper">
			<nav class="bg-white py-5 w-100 text-black flex flex-row justify-center">
				<RouterLink to="/"><img src="" alt="TO DO LIST LOGO"></RouterLink>
				<RouterLink v-show="_routeName !== 'signin' && _routeName !== 'signup'" to="/">Home</RouterLink>
				<button v-show="_routeName !== 'signin' && _routeName !== 'signup'" @click="signOut">Logout</button>
			</nav>
		</div>
	</header>
	<RouterView />
</template>

<style scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
}
</style>
