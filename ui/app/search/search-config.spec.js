describe('Search config', function () {
  'use strict';
  let config;

  beforeEach(angular.mock.module('whois.search'));

  beforeEach(inject(function (searchConfig) {
    config = searchConfig;
  }));

  it('should contain search API URL', function() {
    expect(config.searchApiUrl).toBeTruthy();
  });

  it('should contain domain regular expression', function() {
    expect(config.domainRegexp).toBeTruthy();
  });
});
