import { SearchFormCtrl } from './search-form.ctrl';

describe('Search form controller', function () {
  'use strict';
  let ctrl;
  let cfg;

  beforeEach(angular.mock.module('whois.search'));

  beforeEach(function () {
    // fake search config
    cfg = {
      domainRegexp: 'fake',
    };

    ctrl = new SearchFormCtrl(cfg);
  });

  it('should work', function () {
    expect(ctrl).toBeDefined();
  });

  describe('submit method', function () {
    let event;

    beforeEach(function () {
      event = { preventDefault: jasmine.createSpy('preventDefault') };
    });

    it('should work if onSubmit property is NOT a function', function () {
      try {
        ctrl.submit(event);
      } catch (err) {
        fail(err);
      }
    });

    it('should prevent default behaviour of submit event', function () {
      ctrl.submit(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call onSubmit and provide selected domain', function () {
      ctrl.onSubmit = jasmine.createSpy('onSubmit');
      ctrl.domain = 'test.com';
      ctrl.submit(event);
      expect(ctrl.onSubmit).toHaveBeenCalledWith({ $domain: ctrl.domain });
    });
  });
});
