<script setup>
import { onBeforeUnmount, ref } from 'vue';

const useCurrentTime = () => {
  const currentTime = ref(new Date());
  const updateCurrentTime = () => {
    currentTime.value = new Date();
  };
  const updateTimeInterval = setInterval(updateCurrentTime, 1000);
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });
  return {
    currentTime
  };
};

const { currentTime } = useCurrentTime();
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <p class="font-mono text-9xl font-bold text-black dark:text-white">
      {{
        currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      }}
    </p>
    <p class="font-mono text-6xl font-bold text-black dark:text-white">
      {{ currentTime.toLocaleDateString() }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
