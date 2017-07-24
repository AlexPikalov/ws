import angular from 'angular';
import 'angular-route';

import './search';
import searchTemplate from './search/search.html';

const mod = angular.module('whois', ['ngRoute', 'whois.search'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/search', {
          controller: 'SearchCtrl as vm',
          template: searchTemplate
        })
        .otherwise({ redirectTo: '/search' });

      $locationProvider.html5Mode(true);
    }
  ]);

export default mod;
