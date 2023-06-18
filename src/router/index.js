import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import NeoHomeView from '../views/NeoHomeView.vue';

const routes = [
  { path: '/:pathMatch(.*)', redirect: 'main' },
  { name: 'main', path: '/main', component: NeoHomeView },
  { name: 'credentials', path: '/credentials', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,  
});

export default router;