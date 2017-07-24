describe('Search service', function () {
  'use strict';

  let $httpBackend;
  let service;
  let request;
  let url;

  beforeEach(angular.mock.module('whois.search'));

  beforeEach(inject(function (search, searchConfig, _$httpBackend_) {
    service = search;
    $httpBackend = _$httpBackend_;
    url = searchConfig.searchApiUrl;
    request = $httpBackend.when('GET', url)
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('it should return request data on success', function () {
    const domain = 'domain.com';
    const response = { data: 'details' };
    const handler = jasmine.createSpy('handler');
    $httpBackend.expectGET(url + '?domain=' + domain).respond(response);
    service.search(domain).then(handler);
    $httpBackend.flush();
    expect(handler).toHaveBeenCalledWith(response.data);
  });
});
