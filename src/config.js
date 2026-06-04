const { readFileSync, existsSync } = require('fs');

const filename = `${process.env.HOME}/.onkel/config.json`

function loadConfig() {
  if (existsSync(filename)) {
    return JSON.parse(readFileSync(filename).toString());
  }
  return {};
}

const DEFAULT_CONFIG = {
  locale: 'en'
}

function getConfig() {
  return Object.assign({}, DEFAULT_CONFIG, loadConfig());
}
module.exports = { getConfig };
