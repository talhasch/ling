var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'Ling-darwin-x64', 'Ling.app', 'Contents', 'MacOS', 'Ling');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'Ling-linux-x64', 'Ling');
      default:
        throw 'Unsupported platform';
    }
  }
};
