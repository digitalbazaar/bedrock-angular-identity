/*!
 * Identity module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define(['angular', './identity-service'], function(angular, identityService) {

'use strict';

var module = angular.module('bedrock.identity', []);

module.service(identityService);

return module.name;

});
