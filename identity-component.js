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
    transclude: {
      extras: '?brIdentityAdditionalContent'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-angular-identity/identity-component.html')
  });
}

return register;

});
