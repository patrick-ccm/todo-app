<script setup lang="ts">
import axios from "axios"
import { computed, onMounted, ref } from "vue"
import { RouterLink,useRouter } from 'vue-router'

const router = useRouter()

type TodoData = {
  isComplete: boolean
  todoName: string
  createdAt: string
  updatedAt: string
  __v: number
  _id: string
}

type TodoResponse = {
  code: number
  data: TodoData[]
}

// type TodoObject = Omit<TodoData, "createdAt" | "updatedAt" | "__v" | "_id">

// const title = ref("")
// const complete = ref(false)
const isCompleteFilter = ref(true)
const allData = ref<TodoData[]>([])
const searchParam = ref("")
const showArrType = ref<"search" | "filter">("search")
const searchArr = computed(() => {
  return allData.value.filter((x) =>
    x.todoName.toLowerCase().includes(searchParam.value.toLowerCase())
  )
})
const filteredArr = computed(() => {
  return allData.value.filter(
    (task) => task.isComplete === isCompleteFilter.value
  )
})
//const showError = ref(false)

const getTodos = async () => {
  try {
    const { data } = await axios.get<TodoResponse>(
      "https://calm-plum-jaguar-tutu.cyclic.app/todos"
    )
    console.log(data)
    return data.data
  } catch (error) {
    throw error
  }
}

// const addTodo = async (requestBody: TodoObject) => {
//   if (!requestBody.todoName) {
//     showError.value = true
//     return
//   }
//   try {
//     await axios.post<TodoData>(
//       "https://calm-plum-jaguar-tutu.cyclic.app/todos",
//       {
//         todoName: requestBody.todoName,
//         isComplete: requestBody.isComplete,
//       }
//     )
//     location.reload()
//   } catch (error) {
//     console.error(error)
//   }
// }

const updateTodo = async (id: string, isComplete: boolean) => {
  try {
    await axios.put(`https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`, {
      isComplete: isComplete,
    })
    location.reload()
  } catch (error) {
    console.error(error)
  }
}

const deleteTodo = async (id: string) => {
  try {
    await axios.delete<TodoData>(
      `https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`
    )
    location.reload()
  } catch (error) {
    console.error(error)
  }
}

const sortTodo = (sortType: string) => {
  if (sortType === "asc") {
    allData.value.sort((a, b) => a.todoName.localeCompare(b.todoName))
  } else {
    allData.value.sort((a, b) => b.todoName.localeCompare(a.todoName))
  }
}

const filterComplete = (isComplete: boolean) => {
  isCompleteFilter.value = isComplete
  showArrType.value = "filter"
}

const searchTodo = () => {
  showArrType.value = "search"
}

// const taskCreation = (event) => {
//   addTodo({todoName:event.taskName, isComplete:event.completionStatus})
// }
const goToDetails = (id:string) => {
  router.push({path:'/detailsPage', query:{id: id}})
}

onMounted(async () => {
  allData.value = await getTodos()
})
</script>

<template class="todo-app">
  <div>
    <h2>Todo App</h2>
    <label for="search"> Search </label>
    <input id="search" v-model="searchParam" @focus="searchTodo" />
    <div>
      <h2>Filter by Completion</h2>
      <button @click="filterComplete(true)">Complete</button>
      <button @click="filterComplete(false)">Not Completed</button>
    </div>
  </div>
  <table class="zui-table">
    <tr>
      <th>
        <div class="flex-row">
          <h3>Title</h3>
          <div>
            <p @click="sortTodo('asc')">↑</p>
            <p @click="sortTodo('desc')">↓</p>
          </div>
        </div>
      </th>
      <th>Complete?</th>
      <th>Actions</th>
    </tr>
    <tr v-for="item in filteredArr" v-if="showArrType === 'filter'">
      <th>{{ item.todoName }}</th>
      <th>{{ item.isComplete }}</th>
      <th>
        <button @click="goToDetails(item._id)">Update</button>
        <button @click="deleteTodo(item._id)">Delete</button>
      </th>
    </tr>
    <tr v-for="item in searchArr" v-if="showArrType === 'search'">
      <th>{{ item.todoName }}</th>
      <th>{{ item.isComplete }}</th>
      <th>
        <button @click="goToDetails(item._id)">Update</button>
        <button @click="deleteTodo(item._id)">Delete</button>
      </th>
    </tr>
  </table>
  
  <!-- <div>
    <h2>Create new Task</h2>
    <label>Task Title:</label>
    <input v-model="title" />
    <p>Is it Complete?</p>
    <label for="isComplete">Yes</label>
    <input
      type="radio"
      :value="true"
      id="isComplete"
      name="option"
      v-model="complete"
    />
    <label for="isNotComplete">No</label>
    <input
      type="radio"
      :value="false"
      id="isNotComplete"
      name="option"
      v-model="complete"
    />
    <button @click="addTodo({ todoName: title, isComplete: complete })">
      Create
    </button>
    <h3 v-if="showError" class="error">ERROR ENTER A NAME</h3>
  </div> -->
  <RouterLink to="/addTask">Add Task</RouterLink>
  
</template>

<style scoped>
.todo-app {
  font-family: "Roboto Mono", monospace;
}

.todo-app h2,
h3 {
  font-weight: 700;
}
.zui-table {
  border: solid 1px #ddeeee;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
}
.zui-table thead th {
  background-color: #ddefef;
  border: solid 1px #ddeeee;
  color: #336b6b;
  padding: 10px;
  text-align: left;
  text-shadow: 1px 1px 1px #fff;
}
.zui-table tbody td {
  border: solid 1px #ddeeee;
  color: #333;
  padding: 10px;
  text-shadow: 1px 1px 1px #fff;
}

.flex-row {
  display: flex;
  gap: 20px;
}

.flex-row p {
  cursor: pointer;
}

.error {
  color: red;
}
</style>
