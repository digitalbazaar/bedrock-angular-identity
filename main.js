/*!
 * Identity module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([
  'angular',
  './identity-service',
  './identity-component',
  './identity-settings-component'],
  function(angular) {

'use strict';

var module = angular.module('bedrock.identity',
  ['bedrock.alert', 'bedrock.resource']);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

});
