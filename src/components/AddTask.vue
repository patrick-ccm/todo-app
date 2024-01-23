<script setup lang="ts">
import { ref } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { useRouter } from "vue-router"
import {addTodo} from '../apicalls'
import { rules } from '../vuelidateRules'

const router = useRouter()
type FormData = {
  todoName: string
  isComplete: boolean
}

const formData = ref<FormData>({
  todoName: "",
  isComplete: false,
})

const vuelidate = useVuelidate(rules, formData.value)

const createTask = () => {
  vuelidate.value.$touch()
  console.log(formData)
  if (!vuelidate.value.$invalid) {
    addTodo({todoName:formData.value.todoName, isComplete:formData.value.isComplete})
    router.push({ path: "/" })
  }
}
</script>

<template>
  <div>
    <h2>Create new Task</h2>
    <label>Task Title:</label>
    <input v-model="formData.todoName" />
    <p>Is it Complete?</p>
    <label for="isComplete">Yes</label>
    <input
      type="radio"
      :value="true"
      id="isComplete"
      name="option"
      v-model="formData.isComplete"
    />
    <label for="isNotComplete">No</label>
    <input
      type="radio"
      :value="false"
      id="isNotComplete"
      name="option"
      v-model="formData.isComplete"
    />
    <button @click="createTask">Create</button>
    <p v-if="vuelidate.todoName.$error">
      Error: {{ vuelidate.todoName.$errors[0].$message }}
    </p>
  </div>
</template>
