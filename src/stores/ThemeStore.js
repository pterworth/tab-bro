import { defineStore } from 'pinia';

export const useThemeStore = defineStore('ThemeStore', {
  state: () => ({
    theme: {
      auto: {
        id: 1,
        label: 'System Theme',
        description: '',
        value: 'true',
        enabled: true
      },
      light: {
        id: 2,
        label: 'Light',
        description: '',
        value: 'true',
        enabled: false
      },
      dark: {
        id: 3,
        label: 'Dark',
        description: '',
        value: 'true',
        enabled: false
      }
  },
  actions: {
    setTheme(key, value) {
      if (this.theme.hasOwnProperty(key)) {
        this.theme[key].value = value;
        this.theme[key].enabled = value === 'true';
        chrome.storage.sync.set({ [key]: this.theme[key] });
      }
    },
    loadTheme() {
      chrome.storage.sync.get(Object.keys(this.theme), (items) => {
        for (const key in items) {
          if (this.theme.hasOwnProperty(key)) {
            this.theme[key] = items[key];
          }
        }
      });
    }
  }
});
