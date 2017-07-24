import mod from './search.module';

mod.service('search', Search);

/**
 * Search service constructor
 * @param {*} $http
 * @param {*} searchConfig 
 */
function Search($http, searchConfig) {
  this.$http = $http;
  this.searchUrl = searchConfig.searchApiUrl;
}

Search.$inject = [ '$http', 'searchConfig' ];

/**
 * It makes GET request to the backend in order to
 * get detailed information about a domain
 */
Search.prototype.search = function (domain) {
  const url = this.searchUrl + '?domain=' + domain;
  return this.$http.get(url)
    .then(function (resp) {
      return resp.data.data;
    });
};
