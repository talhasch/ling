(() => {
    'use strict';

    const {ipcRenderer} = require('electron');

    ipcRenderer.on('loaded', (event) => {
        setTimeout(() => {
            document.body.style.visibility = 'visible';
        }, 300);
    });
})();