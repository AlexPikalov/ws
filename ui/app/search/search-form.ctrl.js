function _SearchFormCtrl(searchConfig) {
  /**
   * Regexp that matches domains and subdomains in com and net zones.
   */
  this.domainPattern = searchConfig.domainRegexp;
}

_SearchFormCtrl.$inject = ['searchConfig'];

/**
 * Form submit handler. Call onSubmit callback and passes selected domain.
 */
_SearchFormCtrl.prototype.submit = function (event) {
  event.preventDefault();
  this.onSubmit && this.onSubmit({ $domain: this.domain });
};

export const SearchFormCtrl = _SearchFormCtrl;
