import mod from './search.module';

mod.controller('SearchCtrl', SearchCtrl);

/**
 * Search component controller
 * @param {*} $routeParams
 * @param {*} $route
 * @param {*} search 
 */
function SearchCtrl($routeParams, $route, search, searchConfig) {
  this.$route = $route;
  this.searchConfig = searchConfig;
  this.domain = $routeParams.domain;
  this.searchService = search;
  this.inProgress = false;
  this.domainDetails = null;
  this.error = null;

  if (this.domain && this.isDomainValid()) {
    this.doSearch();
  }
}

SearchCtrl.$inject = ['$routeParams', '$route', 'search', 'searchConfig'];

/**
 * Checks whether the domain is valid or not.
 */
SearchCtrl.prototype.isDomainValid = function () {
  return this.searchConfig.domainRegexp.test(this.domain);
};

/**
 * Updates router query parameters with newly selected domain
 */
SearchCtrl.prototype.search = function (domain) {
  const id = 'req-' + Math.ceil(Math.random() * 10000);
  this.$route.updateParams({ domain: domain, id: id });
};

/**
 * Call search service to get details about the domain.
 */
SearchCtrl.prototype.doSearch = function () {
  this.inProgress = true;
  this.domainDetails = null;
  this.error = null;
  
  return this.searchService.search(this.domain)
    .then((details) => {
      this.domainDetails = details;
      this.inProgress = false;
    })
    .catch((err) => {
      this.error = err;
      this.inProgress = false;
    });
};
