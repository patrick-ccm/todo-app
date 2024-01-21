<script setup lang="ts">
import axios from "axios"
import { computed, onMounted, ref } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()

type TodoData = {
  isComplete: boolean
  todoName: string
  createdAt: string
  updatedAt: string
  __v: number
  _id: string
}
const currentTodo = ref<TodoData>({
  isComplete: false,
  todoName: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
  _id: "",
})

const fetchTodo = async (id: string) => {
  const { data } = await axios.get<TodoData>(
    `https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`
  )
  return data
}

onMounted(async () => {
    console.log(route.query.id)
    currentTodo.value = await fetchTodo(route.query.id)
})
</script>

<template>
  <h2>Details</h2>
  <p>TaskName:</p>
  <p>Completion Status:</p>
  <p>{{currentTodo}}</p>
</template>
