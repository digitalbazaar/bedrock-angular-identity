/*!
 * Identity Service.
 *
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(
  $http, $rootScope, $routeParams, brRefreshService, brResourceService,
  config) {
  var service = {};

  var identity = config.data.identity;
  service.collection = new brResourceService.Collection({
    url: identity.baseUri
  });
  service.identity = identity.session.identity || null;
  service.state = service.collection.state;

  // add session identities to identity storage and save result references
  if(service.identity) {
    service.collection.addToStorage(service.identity).then(function(identity) {
      service.identity = identity;
    });
  }

  /**
   * Helper to generate identity URLs.
   *
   * @param options the options to use:
   *          identityMethod method to use to generate identity id
   *            'current': use current logged in id
   *            'route': base id on current route
   *            'shortId': base id on shortId param
   *            'id': use passed identity
   *        identityShortId short id to use for 'shortId' method (optional)
   *        id full identity id to use for 'id' method (optional)
   */
  service.generateUrl = function(options) {
    if(options.identityMethod === 'current' && service.identity) {
      return service.identity.id;
    }
    if(options.identityMethod === 'route') {
      return idp.identityBaseUri + '/' + $routeParams.identity;
    }
    if(options.identityMethod === 'shortId' && options.identityShortId) {
      return idp.identityBaseUri + '/' + options.identityShortId;
    }
    if(options.identityMethod === 'id' && options.id) {
      return options.id;
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

return {brIdentityService: factory};

});
