<script setup>
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';
import { useSettingStore } from '../../stores/SettingStore';

const settingStore = useSettingStore();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  settings: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const handleOnChange = (key, event) => {
  settingStore.setSetting(key, event.target.checked ? 'true' : 'false');
  emit('update:modelValue', settingStore[key]);
};
</script>

<template>
  <div class="checkbox-group flex flex-wrap pb-12">
    <h3 class="text-xl">{{ title }}</h3>
    <Checkbox
      class="w-full"
      v-for="(item, key) in settings"
      :key="item.id"
      :id="item.id"
      :label="item.label"
      :value="item.value"
      :checked="item.checked"
      @change="handleOnChange(key, $event)"
    />
  </div>
</template>
