/*!
 * Identity Settings UI.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 * @author Alex Lamar
 */
import angular from 'angular';
import forge from 'node-forge';
import _ from 'lodash';

export default {
  bindings: {
    identity: '<brIdentity'
  },
  controller: Ctrl,
  templateUrl: 'bedrock-angular-identity/identity-settings-component.html'
};

/* @ngInject */
function Ctrl($scope, config, brAlertService, brIdentityService) {
  var self = this;
  self.state = brIdentityService.state;
  self.help = {};
  self.emailHash = null;
  self.imagePreview = null;
  self.publicMode = 'most';
  self.public = {};
  self.loading = true;

  self.$onChanges = function(changes) {
    if(changes.identity && changes.identity.currentValue) {
      self.identityChanges = angular.copy(changes.identity.currentValue);
    }
  };
  var _gravatarUrl = function() {
    var url = 'https://secure.gravatar.com/avatar/' + self.emailHash;
    // use G rating
    url += '?r=g';
    if(self.identityChanges.sysGravatarType === 'gravatar') {
      // default to mystery man
      url += '&d=mm';
    } else {
      // force a custom type
      url += '&f=y&d=' + self.identityChanges.sysGravatarType;
    }
    return url;
  };

  self.updateImagePreview = function() {
    switch(self.identityChanges.sysImageType) {
      case 'url':
        self.imagePreview = self.identityChanges.image;
        break;
      case 'gravatar':
        // generate gravatar image
        self.imagePreview = _gravatarUrl();
        // use 80px x 80px for preview
        self.imagePreview += '&s=80';
        break;
    }
  };

  $scope.$watchGroup([
    function() {return self.identityChanges.sysImageType;},
    function() {return self.identityChanges.sysGravatarType;}
  ], function() {
    self.updateImagePreview();
  });

  self.cancel = function() {
    // FIXME: Need to take original copy of passed in identity instead of
    // pulling the identity from the service (could be a different identity).
    self.identityChanges = {};
    angular.extend(self.identityChanges, self.identity);
    self.identityChanges.sysImageType =
      self.identityChanges.sysImageType || 'gravatar';
    self.identityChanges.sysGravatarType =
      self.identityChanges.sysGravatarType || 'gravatar';

    // setup public values
    self.public = {};
    if(self.identityChanges.sysPublic) {
      var sp = self.identityChanges.sysPublic;
      // setup each public field flag
      var _setupPublic = function(property) {
        self.public[property] = sp.indexOf(property) > -1;
      };
      _setupPublic('description');
      _setupPublic('email');
      _setupPublic('image');
      _setupPublic('label');
      _setupPublic('url');
      // setup public mode
      if(_.isEqual(sp, ['description', 'email', 'image', 'label', 'url'])) {
        self.publicMode = 'all';
      } else if(_.isEqual(sp, ['description', 'image', 'label', 'url'])) {
        self.publicMode = 'most';
      } else if(_.isEqual(sp, [])) {
        self.publicMode = 'none';
      } else {
        self.publicMode = 'some';
      }
    }
    // cache email hash for gravatar
    var md = forge.md.md5.create();
    md.update(self.identityChanges.email, 'utf8');
    self.emailHash = md.digest().toHex();

    self.loading = false;
  };

  self.update = function() {
    // setup public fields
    var sysPublic = [];
    var _setupPublic = function(property) {
      switch(self.publicMode) {
        case 'none':
          break;
        case 'some':
          if(self.public[property]) {
            sysPublic.push(property);
          }
          break;
        case 'most':
          if(property !== 'email') {
            sysPublic.push(property);
          }
          break;
        case 'all':
          sysPublic.push(property);
          break;
      }
    };
    _setupPublic('description');
    _setupPublic('email');
    _setupPublic('image');
    _setupPublic('label');
    _setupPublic('url');

    var update = {
      '@context': config.data.contextUrls.identity,
      description: self.identityChanges.description,
      label: self.identityChanges.label,
      sysImageType: self.identityChanges.sysImageType,
      sysPublic: sysPublic,
      url: self.identityChanges.url
    };

    switch(self.identityChanges.sysImageType) {
      case 'url':
        update.image = self.identityChanges.image;
        break;
      case 'gravatar':
        update.image = _gravatarUrl();
        update.sysGravatarType = self.identityChanges.sysGravatarType;
        break;
    }

    self.loading = true;
    brAlertService.clear();
    brIdentityService.collection.update(
      [{op: 'updateIdentity', changes: update}], {
        method: 'patch',
        url: brIdentityService.basePath + '/' + self.identityChanges.sysSlug
      }).catch(function(err) {
        brAlertService.add('error', err);
      }).then(function() {
        self.loading = false;
        $scope.$apply();
      });
  };

  // reset
  self.cancel();
}
