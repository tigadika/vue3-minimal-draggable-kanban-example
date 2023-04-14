import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as HiIcons from "oh-vue-icons/icons/hi";

const Hi = Object.values({ ...HiIcons });
addIcons(...Hi);

const pinia = createPinia()
const app = createApp(App)

app.component("v-icon", OhVueIcon);
app.use(pinia)
app.mount('#app')
