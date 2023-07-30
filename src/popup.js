import './theme-check.js';
import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Popup from './components/Popup.vue';

const pinia = createPinia();

createApp(Popup).use(pinia).mount('#popup');
