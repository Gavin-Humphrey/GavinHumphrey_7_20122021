import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from "../views/Signup.vue";
import User from "../views/User.vue";
import ListMessages from "../views/ListMessages.vue";
import Message from "../views/Message.vue";
import users from "../views/users.vue";


const routes = [
  { 
    name: 'Signup',
    path: '/', 
    component: Signup,
  },
  { 
    name: 'User',
    path: '/user/', 
    component: User,
  },
  { 
    name: 'users',
    path: '/users/', 
    component: users,
  },
  { 
    name: 'ListMessages',
    path: '/messages', 
    component: ListMessages,
  },
  { 
    name: 'Message',
    path: '/messages/:id', 
    component: Message,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
