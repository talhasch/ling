const electron = require('electron');
const {Menu} = require('electron');
const {shell} = require('electron');
const path = require('path');
const json = require('./package.json');

electron.app.on('ready', () => {

  // create window
  let window = new electron.BrowserWindow({
    title: json.name,
    width: json.settings.width,
    height: json.settings.height,
    minWidth: json.settings.width,
    minHeight: json.settings.height
  });

  window.loadURL('file://' + __dirname + '/index.html');

  window.webContents.on('did-finish-load', function () {
    window.webContents.send('loaded', {});
  });

  window.on('closed', () => {
    window = null;
    electron.app.quit();
  });

  if (json.settings.makeMenu) {
    // setup app menu
    const template = [{
      label: "Application",
      submenu: [
        { label: "About", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Github", click: () => { shell.openExternal('https://github.com/talhasch/ling') } },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: () => { electron.app.quit(); } }
      ]
    }, {
        label: "Edit",
        submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
      }
    ];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
});
