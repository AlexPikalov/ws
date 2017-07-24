describe('Search controller constructor function', function () {
  let $controller;
  let $q;

  beforeEach(angular.mock.module('whois.search'));

  beforeEach(inject(function (_$controller_, _$q_) {
    $controller = _$controller_;
    $q = _$q_;
  }));

  it('should init all required properties', function () {
    const $route = {};
    const $routeParams = { domain: 'site.com' };
    const search = {};
    const searchConfig = { domainRegexp: /^\w+$/ };

    const ctrl = $controller('SearchCtrl', {
      $route: $route,
      $routeParams: $routeParams,
      search: search,
      searchConfig: searchConfig
    });

    expect(ctrl.$route).toBe($route);
    expect(ctrl.domain).toBe($routeParams.domain);
    expect(ctrl.searchConfig).toBe(searchConfig);
    expect(ctrl.searchService).toBe(search);
    expect(ctrl.inProgress).toBeFalsy();
    expect(ctrl.domainDetails).toBeNull();
    expect(ctrl.error).toBeNull();
  });

  it('should NOT do search if there is NO domain provided', function () {
    const $route = {};
    const $routeParams = {};
    const search = { search: jasmine.createSpy('search') };
    const searchConfig = { domainRegexp: /^\w+$/ };

    const ctrl = $controller('SearchCtrl', {
      $route: $route,
      $routeParams: $routeParams,
      search: search,
      searchConfig: searchConfig
    });

    expect(search.search).not.toHaveBeenCalled();
  });

  it('should NOT do search if there is domain provided, but it is invalid', function () {
    const $route = {};
    const $routeParams = { domain: '12123213123 123' };
    const search = { search: jasmine.createSpy('search') };
    const searchConfig = { domainRegexp: /^\w+$/ };

    const ctrl = $controller('SearchCtrl', {
      $route: $route,
      $routeParams: $routeParams,
      search: search,
      searchConfig: searchConfig
    });

    expect(search.search).not.toHaveBeenCalled();
  });

  it('should do search if there is domain provided and it is invalid', function () {
    const $route = {};
    const $routeParams = { domain: 'qwe' }; // passes fake domain regexp then valid
    const search = { search: jasmine.createSpy('search').and.returnValue($q.resolve({})) };
    const searchConfig = { domainRegexp: /^\w+$/ };

    const ctrl = $controller('SearchCtrl', {
      $route: $route,
      $routeParams: $routeParams,
      search: search,
      searchConfig: searchConfig
    });

    expect(search.search).toHaveBeenCalledWith($routeParams.domain);
  });
});

describe('Search controller', function () {
  'use strict';
  let $q;
  let $timeout;
  let ctrl;
  let $route;
  let $routeParams;
  let search;
  let searchConfig;

  beforeEach(angular.mock.module('whois.search'));

  beforeEach(inject(function ($controller, _$q_, _$timeout_) {
    $q = _$q_;
    $timeout = _$timeout_;
    $route = {};
    $routeParams = { domain: 'domain' };
    search = { search: jasmine.createSpy('search').and.returnValue($q.resolve({})) };
    searchConfig = { domainRegexp: /^\w+$/ };

    // instantiate controller
    ctrl = $controller('SearchCtrl', {
      $route: $route,
      $routeParams: $routeParams,
      search: search,
      searchConfig: searchConfig
    });
  }));

  describe('isDomainValid method', function () {
    it('should return true if domain is valid in terms of regular expression provided by config', function () {
      ctrl.domain = 'aaa';
      expect(ctrl.isDomainValid()).toBeTruthy();
    });

    it('should return false if domain is invalid in terms of regular expression provided by config', function () {
      ctrl.domain = '12 sdf3';
      expect(ctrl.isDomainValid()).toBeFalsy();
    });
  });

  describe('search method', function () {
    it('should update url params', function () {
      const domain = 'werwer';
      ctrl.$route = { updateParams: jasmine.createSpy('updateParams') };
      ctrl.search(domain);
      expect(ctrl.$route.updateParams).toHaveBeenCalledWith(jasmine.objectContaining({ domain: domain }));
    });
  });

  describe('doSearch method', function () {
    beforeEach(function () {
      $timeout.flush();
    });

    it('should reset domainDetails and error propertie', function () {
      ctrl.domainDetails = {};
      ctrl.error = {};

      ctrl.doSearch();
      expect(ctrl.inProgress).toBeTruthy();
      expect(ctrl.domainDetails).toBeNull();
      expect(ctrl.error).toBeNull();
    });

    it('should save domain details if request succed', function () {
      const details = { data: 'some details' };
      ctrl.searchService = {
        search: jasmine.createSpy('search').and.returnValue($q.resolve(details))
      };

      ctrl.doSearch();
      $timeout.flush();
      expect(ctrl.domainDetails).toBe(details);
      expect(ctrl.error).toBeNull();
      expect(ctrl.inProgress).toBeFalsy();
    });

    it('should save an error if request failed', function () {
      const err = { message: 'some error' };
      ctrl.searchService.search = jasmine.createSpy('search').and.returnValue($q.reject(err));

      ctrl.doSearch();
      $timeout.flush();
      expect(ctrl.domainDetails).toBeNull();
      expect(ctrl.error).toBe(err);
      expect(ctrl.inProgress).toBeFalsy();
    });
  });
});
