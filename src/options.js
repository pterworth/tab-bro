import './theme-check.js';
import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Options from './components/Options.vue';

const pinia = createPinia();

createApp(Options).use(pinia).mount('#options');
