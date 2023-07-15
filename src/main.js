import { createApp } from 'vue';
import { AVPlugin } from 'vue-audio-visual';

import router from './router/index.js';
import localforage from 'localforage';
import App from './App.vue';

const app = createApp(App);

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'audiostreamer',
  description: 'IDK lol',
});

app.use(router);
app.use(AVPlugin);
app.mount('#app');