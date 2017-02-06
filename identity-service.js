/*!
 * Identity Service.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([], function() {

'use strict';

function register(module) {
  module.service('brIdentityService', factory);
}

/* @ngInject */
function factory($routeParams, brResourceService, config) {
  var service = {};
  service.basePath = config.data['identity-http'].baseUri;

  service.collection = new brResourceService.Collection({
    url: config.data['identity-http'].baseUri
  });
  service.state = service.collection.state;

  /**
   * Helper to generate identity URLs.
   *
   * @param options the options to use:
   *          identityMethod method to use to generate identity id
   *            'current': use current logged in id
   *            'route': base id on current route
   *            'shortId': base id on shortId param
   *            'id': use passed identity
   *            'none': no identity
   *          identityShortId short id to use for 'shortId' method (optional)
   *          id full identity id to use for 'id' method (optional)
   */
  service.generateUrl = function(options) {
    if(options.identityMethod === 'current' && service.identity) {
      return service.identity.id;
    }
    if(options.identityMethod === 'route') {
      return config.identityBaseUri + '/' + $routeParams.identity;
    }
    if(options.identityMethod === 'shortId' && options.identityShortId) {
      return config.identityBaseUri + '/' + options.identityShortId;
    }
    if(options.identityMethod === 'id' && options.id) {
      return options.id;
    }
    if(options.identityMethod === 'none') {
      return null;
    }
    throw Error('Identity URL generation error.');
  };

  return service;
}

return register;

});
