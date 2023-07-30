<script setup>
import { ref } from 'vue';
import { useSettingStore } from '../stores/SettingStore';
const settingStore = useSettingStore();

// Send a message to the content script
const toggleRuler = ref(() => {
  // Toggle the ruler.active property
  settingStore.settings.ruler.active = !settingStore.settings.ruler.active;

  // Send a message to the content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'toggleRuler',
      enabled: settingStore.settings.ruler.active
    });
  });
});
</script>

<template>
  <button @click="toggleRuler">
    {{ settingStore.settings.ruler.active ? 'Disable Ruler' : 'Enable Ruler' }}
  </button>
</template>

<style lang="scss" scoped></style>
