import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '../views/AddPost.vue'


Vue.use(VueRouter)

const routes = [

  
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },

    {
    path: '/add-post',
    name: 'add-post',
    component: AddPost,
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
