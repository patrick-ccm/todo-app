<script setup lang="ts">
import { ref } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from "@vuelidate/validators"
import { useRouter } from "vue-router"
import {addTodo} from '../apicalls'

const router = useRouter()
type FormData = {
  taskName: string
  completionStatus: boolean
}

type TodoObject = Omit<TodoData, "createdAt" | "updatedAt" | "__v" | "_id">
type TodoData = {
  isComplete: boolean
  todoName: string
  createdAt: string
  updatedAt: string
  __v: number
  _id: string
}

const formData = ref<FormData>({
  taskName: "",
  completionStatus: false,
})

const mustBeVue = (value: string) => value.includes("vue")
const alphaNumSpace = helpers.regex(/^[\w\-\s]+$/)

const rules = {
  taskName: {
    mustBeVue: helpers.withMessage("Task name must have vue in it", mustBeVue),
    alphaNumSpace: helpers.withMessage("No symbols", alphaNumSpace),
  },
  completionStatus: { required },
}

const vuelidate = useVuelidate(rules, formData.value)

const createTask = () => {
  vuelidate.value.$touch()
  console.log(formData)
  if (!vuelidate.value.$invalid) {
    addTodo({todoName:formData.value.taskName, isComplete:formData.value.completionStatus})
    router.push({ path: "/" })
  }
}
</script>

<template>
  <div>
    <h2>Create new Task</h2>
    <label>Task Title:</label>
    <input v-model="formData.taskName" />
    <p>Is it Complete?</p>
    <label for="isComplete">Yes</label>
    <input
      type="radio"
      :value="true"
      id="isComplete"
      name="option"
      v-model="formData.completionStatus"
    />
    <label for="isNotComplete">No</label>
    <input
      type="radio"
      :value="false"
      id="isNotComplete"
      name="option"
      v-model="formData.completionStatus"
    />
    <button @click="createTask">Create</button>
    <p v-if="vuelidate.taskName.$error">
      Error: {{ vuelidate.taskName.$errors[0].$message }}
    </p>
  </div>
</template>
