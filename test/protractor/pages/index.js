/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

var pages = global.bedrock.pages || {};

pages['bedrock-angular-identity'] = {};
pages['bedrock-angular-identity'].identity = require('./identity');
pages['bedrock-angular-identity'].settings = require('./settings');

module.exports = global.bedrock.pages = pages;
