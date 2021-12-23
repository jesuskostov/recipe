import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateIdea from '../views/CreateIdea.vue'
import MyIdeas from '../views/MyIdeas.vue'
import UpdateIdea from '../views/UpdateIdea.vue'
import Recipe from '../views/Recipe.vue'
import Fridge from '../views/Fridge.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Fridge',
    component: Fridge
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create-idea',
    name: 'CreateIdea',
    component: CreateIdea
  },
  {
    path: '/my-ideas',
    name: 'MyIdeas',
    component: MyIdeas
  },
  {
    path: '/update-idea/:id',
    name: 'UpdateIdea',
    component: UpdateIdea
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe
  },
  // {
  //   path: '/fridge',
  //   name: 'Fridge',
  //   component: Fridge
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
