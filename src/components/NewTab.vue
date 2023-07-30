<script setup>
import { onMounted } from 'vue';
import Clock from './Clock.vue';
import Quotes from './Quotes.vue';
import Settings from './Settings.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import { useSettingStore } from '../stores/SettingStore';

const settingStore = useSettingStore();

onMounted(() => {
  settingStore.loadSettings();
});
</script>

<template>
  <!-- -left-96  -->
  <aside class="absolute overflow-y-auto pr-16 transition-all hover:left-0">
    <section
      class="flex h-screen w-96 flex-col bg-white/50 px-5 py-8 backdrop-blur-md dark:bg-gray-900/50"
    >
      <div class="flex items-center justify-center pb-8">
        <img
          src="/images/tabbro_icon.svg"
          alt="Tab Bro Logo"
          class="h-12 w-12"
        />
        <h2 class="pl-4 text-2xl text-slate-900 dark:text-white">Tab Bro</h2>
      </div>

      <Settings />
      <ThemeSwitcher />
    </section>
  </aside>

  <main class="flex h-screen min-w-full flex-col items-center justify-center">
    <Clock class="mb-12" v-if="settingStore.settings.clock.checked" />
    <Quotes class="text-center" v-if="settingStore.settings.quotes.checked" />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: rgba(255, 255, 255, 0.5);
  background-image: url('https://source.unsplash.com/featured/?nature,water');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
