<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const user = ref('')
const password = ref('')

const signIn = async () => {
	try {
		await userStore.signIn(user.value, password.value)
		router.push('/')
	} catch(err) {
		console.error(err)
	}
}

</script>

<template>
	<main class="min-h-[85vh] flex flex-col items-center justify-center">
		<div class="paper max-w-[450px] w-full">
			<div class="flex flex-col lines p-10">
				<div class="mb-5">
					<h1 class="text-5xl">TO DO LIST</h1>
					<p class="text-center mt-2">You must be logged in to start using the application.</p>
				</div>
				<div class="flex flex-col items-center w-full">
					<div class="flex flex-col w-full mb-2">
						<label for="email" class="text-xl">Email:</label>
						<input type="text" name="email" id="email" class="text-xl border-2 border-black" v-model="user" />
					</div>
					<div class="flex flex-col w-full mb-4">
						<label for="password" class="text-xl">Password:</label>
						<input type="password" id="password" class="text-xl border-2 border-black" v-model="password" />
					</div>
				</div>
				<div class="w-full mb-2">
					<button @click="signIn" class="px-3 py-1 bg-black text-white">Sign In</button>
				</div>
				<div>
					<p>Not registered yet?<RouterLink to="/signup" class="underline">Sign up here</RouterLink>.</p>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped></style>