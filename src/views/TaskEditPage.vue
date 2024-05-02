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

<!-- <template>
  <div>
    <h2 class="text-xl font-bold mb-4">Edit Task</h2>
    <form @submit.prevent="saveTask">
      <label for="taskTitle">Task Title:</label>
      <input id="taskTitle" type="text" v-model="editedTaskTitle">
      <button type="submit">Save</button>
    </form>
  </div>
</template> -->


<template>
  <main class="flex flex-row items-center">
    <div class="min-h-[1vh] w-full flex flex-row justify-center">
      <div class="paper max-w-[600px] h-full w-full py-0 pr-2 pl-5 m-5">
        <div class="lines">
          <div class="my-4">
            <strong><span class="text-3xl">Editing task:</span></strong>
            <ul class="w-full">
              <li class="flex flex-row h-[30px] pt-[7px]"></li>
              <li class="flex flex-row ">
                <form @submit.prevent="saveTask" class="flex flex-row w-full items-center">
                  <!-- <label for="taskTitle">Task Title:</label> -->
                  <input id="taskTitle" type="text" v-model="editedTaskTitle" class="bg-transparent w-full border-b-2 border-black focus:outline-none focus:ring-0 mr-2">
                  <button type="submit" class="bg-white transition-all p-1 rounded-xl mr-3 shadow-xl hover:scale-110 border-2 border-black"><img src="@/assets/images/save.svg" alt=""></button>
                </form>
              </li>
              <li class="flex flex-row h-[30px] pt-[8px]"></li>
            </ul>
          </div>
          <div>

          </div>
        </div>

      </div>
    </div>
  </main>
</template>