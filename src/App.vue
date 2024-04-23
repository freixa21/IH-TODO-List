<script setup>

import { useUserStore } from '@/stores/userStore';

const usersStore = useUserStore();

const signOut = () => {
	usersStore.signOut();
}


</script>

<template>
	<header>
		<div class="wrapper">
			<nav class="bg-white py-5 w-100 text-black flex flex-row justify-center">
				<RouterLink to="/"><img src="" alt="TO DO LIST LOGO"></RouterLink>
				<RouterLink to="/">Home</RouterLink>
				<button @click="signOut">Logout</button>
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
