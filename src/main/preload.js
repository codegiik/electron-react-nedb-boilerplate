const { contextBridge, ipcRenderer } = require('electron');

const VALID_CHANNELS = ['read-library', 'store-library', 'delete-library'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel, func) {
      if (VALID_CHANNELS.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
      throw new Error('Invoked channel is not valid');
    },
    once(channel, func) {
      if (VALID_CHANNELS.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
      throw new Error('Invoked channel is not valid');
    },
    async invoke(channel, ...args) {
      if (VALID_CHANNELS.includes(channel))
        return ipcRenderer.invoke(channel, ...args);

      throw new Error('Invoked channel is not valid');
    },
  },
});
