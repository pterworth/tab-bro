<script setup>
import { onMounted, reactive } from 'vue';
import CheckboxGroup from './forms/CheckboxGroup.vue';
import { useSettingStore } from '../stores/SettingStore';

const settingStore = useSettingStore();

// Create a reactive state for your settings
const settings = reactive(settingStore.settings);

onMounted(() => {
  settingStore.loadSettings();

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed. Old value was "${oldValue}", new value is "${newValue}".`
      );
      // Update your settings based on the changes
      if (settings.hasOwnProperty(key)) {
        settings[key] = newValue;
      }
    }
  });
});
</script>

<template>
  <div class="settings flex flex-wrap dark:text-white">
    <CheckboxGroup :settings="settings" title="Settings" />
  </div>
</template>

<style lang="scss" scoped></style>
