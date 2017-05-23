/*!
 * Identity module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 */
import angular from 'angular';
import IdentityService from './identity-service.js';
import IdentityComponent from './identity-component.js';
import IdentitySettingsComponent from './identity-settings-component.js';

var module = angular.module('bedrock.identity', ['bedrock.alert',
  'bedrock.config', 'bedrock.resource'
]);

module.service('brIdentityService', IdentityService);
module.component('brIdentity', IdentityComponent);
module.component('brIdentitySettings', IdentitySettingsComponent);
