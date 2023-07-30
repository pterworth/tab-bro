import { defineStore } from 'pinia';

export const useSettingStore = defineStore('SettingStore', {
  state: () => ({
    settings: {
      newTab: {
        id: 1,
        label: 'New Tab',
        description: "Wether to include the extension's new tab page.",
        value: 'true',
        checked: true
      },
      newTabBackground: {
        id: 2,
        label: 'New Tab - Background(s)',
        description: '',
        options: [
          {
            default_url: 'https://source.unsplash.com/featured/?nature,water',
            unsplash_url: ''
          }
        ],
        value: 'true',
        checked: true
      },
      todos: {
        id: 3,
        label: 'Todo-List(s)',
        description: '',
        value: 'false',
        checked: false
      },
      timeTracker: {
        id: 4,
        label: 'Time-Tracker',
        description: '',
        value: 'false',
        checked: false
      },
      readingList: {
        id: 5,
        label: 'Reading List Overview',
        description: '',
        value: 'false',
        checked: false
      },
      sessionManager: {
        id: 6,
        label: 'Session Saver',
        description: '',
        value: 'false',
        checked: false
      },
      ruler: {
        id: 7,
        label: 'Ruler',
        description: '',
        value: 'false',
        checked: false,
        active: false
      },
      colorPicker: {
        id: 8,
        label: 'Color Picker',
        description: '',
        value: 'false',
        checked: false
      },
      articles: {
        id: 9,
        label: 'Articles',
        description: '',
        pages: [
          {
            'dev.to': false
          }
        ],
        value: 'false',
        checked: false
      },
      pinterest: {
        id: 10,
        label: 'Pinterest Collections',
        description: '',
        options: [
          {
            collections: []
          }
        ],
        value: 'false',
        checked: false
      },
      clock: {
        id: 11,
        label: 'Clock',
        description: '',
        value: 'true',
        checked: true
      },
      quotes: {
        id: 12,
        label: 'Quotes and Mantras',
        description: '',
        value: 'false',
        checked: false
      },
      screenshots: {
        id: 13,
        label: 'Take Screenshots',
        description: '',
        value: 'false',
        checked: false
      },
      branding: {
        id: 14,
        label: 'Branding Options',
        description: '',
        value: 'false',
        checked: false
      }
    }
  }),
  actions: {
    setSetting(key, value) {
      if (this.settings.hasOwnProperty(key)) {
        this.settings[key].value = value;
        this.settings[key].checked = value === 'true';
        chrome.storage.sync.set({ [key]: this.settings[key] });
      }
    },
    loadSettings() {
      chrome.storage.sync.get(Object.keys(this.settings), (items) => {
        for (const key in items) {
          if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = items[key];
          }
        }
      });
    }
  }
});
