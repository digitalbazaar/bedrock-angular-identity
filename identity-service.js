/*!
 * Identity Service.
 *
 * Copyright (c) 2012-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

function register(module) {
  module.service('brIdentityService', factory);
}

/* @ngInject */
function factory(
  $rootScope, $routeParams, brSessionService,
  brRefreshService, brResourceService, config) {
  var service = {};
  var config = config.data.identity;
  service.basePath = config.baseUri;

  service.collection = new brResourceService.Collection({
    url: config.baseUri
  });
  service.state = service.collection.state;

  // Gets the currently authenticated identity
  service.get = function() {
    // Grab the identity from the session
    if(!brSessionService.session || !brSessionService.session.identity) {
      return Promise.reject(new Error(
        'No session available')
      );
    }
    var identity = brSessionService.session.identity;
    return service.collection.get(identity.id)
      .then(function(result) {
        service.identity = result;
        return service.identity;
      });
  };

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

  // register for system-wide refreshes
  brRefreshService.register(function() {
    if(service.identity) {
      service.collection.get(service.identity.id);
    }
  });

  // expose service to scope
  $rootScope.app.services.identity = service;

  return service;
}

return register;

});
