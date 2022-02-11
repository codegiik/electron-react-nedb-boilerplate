const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel, func) {
      const validChannels = ['read-library', 'store-library'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['read-library', 'store-library'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    async invoke(channel, ...args) {
      const validChannels = ['read-library', 'store-library'];
      if (validChannels.includes(channel))
        return ipcRenderer.invoke(channel, ...args);

      return {
        error: 'channel is not valid',
      };
    },
  },
});
