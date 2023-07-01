import { createRouter, createWebHistory } from 'vue-router';
import { mainRouteName, credentialsRouteName } from '../constants/RouteConstants.js';
import LoginView from '../views/LoginView.vue';
import NeoHomeView from '../views/NeoHomeView.vue';

const routes = [
  { path: '/:pathMatch(.*)', redirect: mainRouteName },
  { name: mainRouteName, path: `/${mainRouteName}`, component: NeoHomeView },
  { name: credentialsRouteName, path: `/${credentialsRouteName}`, component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,  
});

export default router;