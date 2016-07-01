var pages = GLOBAL.bedrock.pages || {};

pages.identity = pages.identity || {};
pages.identity.settings = require('./settings');

module.exports = GLOBAL.bedrock.pages = pages;
