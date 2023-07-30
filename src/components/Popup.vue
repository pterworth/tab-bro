<script setup>
import Settings from './Settings.vue';
import Screenshot from './Screenshot.vue';
import Ruler from './Ruler.vue';
import { useSettingStore } from '../stores/SettingStore';

const settingStore = useSettingStore();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'capturedFullPage') {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let images = request.data.map((dataUrl) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = dataUrl;
      });
    });
    Promise.all(images).then((images) => {
      let totalHeight = images.reduce((sum, img) => sum + img.height, 0);
      canvas.width = images[0].width;
      canvas.height = totalHeight;
      let currentHeight = 0;
      images.forEach((img) => {
        context.drawImage(img, 0, currentHeight);
        currentHeight += img.height;
      });
      let fullPageDataUrl = canvas.toDataURL();

      // Convert data URL to binary
      let binary = atob(fullPageDataUrl.split(',')[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      // Create blob from binary
      let blob = new Blob([new Uint8Array(array)], { type: 'image/png' });

      // Create blob URL
      let url = URL.createObjectURL(blob);

      // Open the URL in a new tab
      window.open(url);
    });
  }
});
</script>

<template>
  <div class="popup flex w-80 flex-wrap p-8 dark:bg-slate-900 dark:text-white">
    <h1 class="pb-12 text-3xl">Popup Settings</h1>
    <Screenshot />
    <Ruler v-if="settingStore.settings.ruler.checked" />
    <Settings />
  </div>
</template>

<style lang="scss" scoped></style>
