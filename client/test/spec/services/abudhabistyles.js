'use strict';

describe('Service: abuDhabiStyles', function () {

  // load the service's module
  beforeEach(module('urbinsight'));

  // instantiate service
  var abuDhabiStyles;
  beforeEach(inject(function (_abuDhabiStyles_) {
    abuDhabiStyles = _abuDhabiStyles_;
  }));

  it('should do something', function () {
    expect(!!abuDhabiStyles).toBe(true);
  });

});
