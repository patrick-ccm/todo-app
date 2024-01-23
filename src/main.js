import { createApp } from 'vue'
import App from './App.vue'
import TodoTable from './components/TodoTable.vue'
import AddTask from './components/AddTask.vue'
import DetailsPage from './components/DetailsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: TodoTable
      },{
        path: '/addTask',
        name: 'addTask',
        component: AddTask
      },{
        path: '/detailsPage',
        name: 'detailsPage',
        component: DetailsPage
      }
    ]
  })

const app = createApp(App)

app.use(router)

app.mount('#app')