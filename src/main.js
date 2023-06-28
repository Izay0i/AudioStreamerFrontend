import { createApp } from 'vue';
// import { createPinia } from 'pinia';
import router from './router/index.js';
import localforage from 'localforage';
import App from './App.vue';

// const pinia = createPinia();
const app = createApp(App);

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'audiostreamer',
  description: 'IDK lol',
});

// app.use(pinia);
app.use(router);
app.mount('#app');