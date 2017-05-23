/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
/* globals expect */
var api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-identity-viewer';

api.label = function() {
  var component = element(by.tagName(api.COMPONENT_TAG));
  var fields =
    component.all(by.attribute('ng-show', '$ctrl.identity.label'));
  // Expecting there to be three label elements on the page,
  // the third should have the label value
  expect(fields.count()).to.eventually.equal(3);
  return fields.get(2);
};

api.description = function() {
  var component = element(by.tagName(api.COMPONENT_TAG));
  var fields =
    component.all(by.attribute('ng-show', '$ctrl.identity.description'));
  expect(fields.count()).to.eventually.equal(2);
  return fields.get(1);
};

api.url = function() {
  var component = element(by.tagName(api.COMPONENT_TAG));
  return component.all(by.attribute('ng-show', '$ctrl.identity.url')).get(1);
};

api.email = function() {
  var component = element(by.tagName(api.COMPONENT_TAG));
  var fields =
    component.all(by.attribute('ng-show', '$ctrl.identity.email'));
  expect(fields.count()).to.eventually.equal(2);
  return fields.get(1);
};

api.image = function() {
  var component = element(by.tagName(api.COMPONENT_TAG));
  var fields =
    component.all(by.attribute('ng-show', '$ctrl.identity.image'));
  expect(fields.count()).to.eventually.equal(2);
  return fields.get(1);
};

api.imageValue = function() {

};

api.verify = function(options) {
  if(options.label) {
    var label = api.label();
    if(options.label.visible !== undefined) {
      var visible = options.label.visible;
      if(!visible) {
        // Check that element is not visible and that it has no text present
        expect(label.isDisplayed()).to.eventually.be.false;
        expect(label.getText()).to.eventually.equal('');
      } else {
        // Element should be visible
        expect(label.isDisplayed()).to.eventually.be.true;
      }
    }
    if(options.label.value !== undefined) {
      expect(label.getText()).to.eventually.equal(options.label.value);
    }
  }
  if(options.description) {
    var description = api.description();
    if(options.description.visible !== undefined) {
      var visible = options.description.visible;
      if(!visible) {
        expect(description.isDisplayed()).to.eventually.be.false;
        expect(description.getText()).to.eventually.equal('');
      } else {
        expect(description.isDisplayed()).to.eventually.be.true;
      }
    }
    if(options.description.value !== undefined) {
      expect(description.getText())
        .to.eventually.equal(options.description.value);
    }
  }
  if(options.url) {
    var url = api.url();
    if(options.url.visible !== undefined) {
      var visible = options.url.visible;
      if(!visible) {
        expect(url.isDisplayed()).to.eventually.be.false;
        expect(url.getText()).to.eventually.equal('');
      } else {
        expect(url.isDisplayed()).to.eventually.be.true;
      }
    }
    if(options.url.value !== undefined) {
      expect(url.getText()).to.eventually.equal(options.url.value);
    }
  }
  if(options.email) {
    var email = api.email();
    if(options.email.visible !== undefined) {
      var visible = options.email.visible;
      if(!visible) {
        expect(email.isDisplayed()).to.eventually.be.false;
        expect(email.getText()).to.eventually.equal('');
      } else {
        expect(email.isDisplayed()).to.eventually.be.true;
      }
    }
    if(options.email.value !== undefined) {
      expect(email.getText()).to.eventually.equal(options.email.value);
    }
  }
  if(options.image) {
    if(options.image.visible !== undefined) {
      var visible = options.images.visible;
    }
  }
};
