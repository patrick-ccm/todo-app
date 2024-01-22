<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import {TodoData, TodoObject, TodoResponse} from '../todo'
import {addTodo, deleteTodo, getTodos} from '../apicalls'
import { useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const currentTodo = ref<TodoData>()

const applyChanges =() => {
  deleteTodo(currentTodo.value?._id as string)
  const data = addTodo({todoName: currentTodo.value?.todoName as string, isComplete: currentTodo.value?.isComplete as boolean})
  console.log(data)
  router.push({ path: "/" })
}

onMounted(async () => {
    console.log(route.query.id)
    currentTodo.value = await getTodos(route.query.id as string) as TodoData
    
})


</script>

<template>
  <h2>Details</h2>
  <div v-if="currentTodo">
    <label for="task-name">Task Name: </label>
    <input id="task-name" v-model="currentTodo.todoName">
    <label for="completion-status">Completion Status: </label>
    <label for="isComplete">True</label>
    <input
      type="radio"
      :value="true"
      id="isComplete"
      name="option"
      v-model="currentTodo.isComplete"
    />
    <label for="isNotComplete">False</label>
    <input
      type="radio"
      :value="false"
      id="isNotComplete"
      name="option"
      v-model="currentTodo.isComplete"
    />
    <button @click="applyChanges">Apply Changes</button>
  </div>
</template>
