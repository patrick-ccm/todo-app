<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { TodoData } from "../todo"
import { addTodo, deleteTodo, getTodos } from "../apicalls"
import { useRouter } from "vue-router"

const currentTodo = ref<TodoData>()
const route = useRoute()
const router = useRouter()
const todoName= ref<string>('')
const applyChanges = () => {
  addTodo({todoName: currentTodo.value?.todoName as string, isComplete: currentTodo.value?.isComplete as boolean})
  deleteTodo(currentTodo.value?._id as string)
  
  router.push({ path: "/" })
}


onMounted(async () => {
  currentTodo.value = (await getTodos(route.query.id as string)) as TodoData
  todoName.value = currentTodo.value.todoName
  console.log(todoName.value)
})

</script>

<template>
  <h2>Details</h2>
  <div v-if="currentTodo">
    <label for="task-name">Task Name: </label>
    <input id="task-name" v-model="currentTodo.todoName" />
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
    <!-- <p v-if="vuelidate.todoName.$error">
      Error: {{ vuelidate.todoName.$errors[0].$message }}
    </p> -->
  </div>
</template>
