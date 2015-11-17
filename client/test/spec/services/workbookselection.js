'use strict';

describe('Service: workbookSelection', function () {

  // load the service's module
  beforeEach(module('urbinsight'));

  // instantiate service
  var workbookSelection;
  beforeEach(inject(function (_workbookSelection_) {
    workbookSelection = _workbookSelection_;
  }));

  it('should do something', function () {
    expect(!!workbookSelection).toBe(true);
  });

});
