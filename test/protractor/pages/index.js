var pages = global.bedrock.pages || {};

pages.identity = pages.identity || {};
pages.identity.settings = require('./settings');
pages.identity.viewer = require('./identity');

module.exports = global.bedrock.pages = pages;
