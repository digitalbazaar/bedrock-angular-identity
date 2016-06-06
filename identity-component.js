/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brIdentityViewer', {
    bindings: {
      identity: '<brIdentity'
    },
    controller: Ctrl,
    transclude: {
      extras: '?brIdentityExtras'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-angular-identity/identity-component.html')
  });
}

/* @ngInject */
function Ctrl($scope) {
  var self = this;
}

return register;

});
