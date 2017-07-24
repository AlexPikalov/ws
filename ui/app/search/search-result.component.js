import mod from './search.module.js';
import resultTpl from './search-result.component.html';

mod.component('searchResult', {
  bindings: {
    domainDetails: '<'
  },
  template: resultTpl
});
