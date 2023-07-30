import './theme-check.js';
import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import NewTab from './components/NewTab.vue';

const pinia = createPinia();

createApp(NewTab).use(pinia).mount('#newtab');
