var bedrock = global.bedrock;

var api = {};
module.exports = api;

var by = global.by;
var element = global.element;
var should = global.should;
var expect = global.expect;
var protractor = global.protractor;

api.PRIVACY_NO_PUBLIC = 0;
api.PRIVACY_SPECIFIED_PUBLIC = 1;
api.PRIVACY_PUBLIC_EXCEPT_EMAIL = 2;
api.PRIVACY_ALL_PUBLIC = 3;

api.LABEL_MODEL = '$ctrl.identityChanges.label';
api.EMAIL_MODEL = '$ctrl.identityChanges.email';
api.WEBSITE_MODEL = '$ctrl.identityChanges.url';
api.IMAGE_TYPE_MODEL = '$ctrl.identityChanges.sysImageType';
api.IMAGE_URL_MODEL = '$ctrl.identityChanges.image';
api.GRAVATAR_MODEL;
api.DESCRIPTION_MODEL = '$ctrl.identityChanges.description';
api.PRIVACY_MODEL = '$ctrl.publicMode';

api.get = function(slug) {
  bedrock.get('/i/' + slug);
  return api;
};

api.label = function(label) {
  var labelElement = element(by.brModel(api.LABEL_MODEL));
  if(label === undefined) {
    return labelElement;
  }
  labelElement.clear();
  labelElement.sendKeys(label);
};

api.email = function(email) {
  var emailElement = element(by.brModel(api.EMAIL_MODEL));
  if(email === undefined) {
    return emailElement;
  }
  expect(emailElement.isEnabled()).to.eventually.be.false;
};

api.website = function(text) {
  var websiteElement = element(by.brModel(api.WEBSITE_MODEL));
  if(text === undefined) {
    return websiteElement;
  }
  websiteElement.clear();
  websiteElement.sendKeys(text);
};

/* Image Fields */
api.selectedImageType = function(options) {
  if(options === undefined) {
    return element(by.brModel(api.IMAGE_TYPE_MODEL))
      .element(by.className('ng-valid-parse'));
  }
  if(options.gravatar === true) {
    // select gravatar
    element(by.attribute('value', 'gravatar')).click();
  }
  if(options.url === true) {
    // select image
    element(by.attribute('value', 'url')).click();
  }
};

api.imageUrl = function(url) {
  var imageElement = element(by.brModel(api.IMAGE_URL_MODEL));
  if(url === undefined) {
    return imageElement;
  }
  imageElement.clear();
  imageElement.sendKeys(url);
};

api.description = function(description) {
  var descriptionElement =
    element(by.brModel(api.DESCRIPTION_MODEL));
  if(description === undefined) {
    return descriptionElement;
  }
  descriptionElement.sendKeys(description);
};

api.privacyOption = function(index) {
  // Not sure how to mitigate grabbing by a magic number here
  var privacyElements =
    element.all(by.tagName('br-radio-group')).get(2);
  if(index === undefined) {
    return privacyElements;
  }
  privacyElements.all(by.tagName('input')).get(index).click();
};

api.submit = function() {
  element(by.tagName('br-identity-settings')).
    element(by.attribute('ng-click', '$ctrl.update()')).click();
};

api.checkFields = function() {
  var elements = [];
  elements.push(element(by.brModel(api.LABEL_MODEL)));
  elements.push(element(by.brModel(api.WEBSITE_MODEL)));
  elements.push(element(by.brModel(api.EMAIL_MODEL)));
  elements.push(element(by.brModel(api.IMAGE_TYPE_MODEL)));
  elements.push(element(by.brModel(api.DESCRIPTION_MODEL)));
  elements.push(element(by.brModel(api.PRIVACY_MODEL)));
  elements.push(element(by.attribute('ng-click', '$ctrl.update()')));
  elements.push(element(by.attribute('ng-click', '$ctrl.cancel()')));
  for(var i in elements) {
    elements[i].isPresent().should.eventually.be.true;
  }
};
