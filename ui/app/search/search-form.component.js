import mod from './search.module';
import formTpl from './search-form.component.html';
import { SearchFormCtrl } from './search-form.ctrl';

mod.component('searchForm', {
  bindings: {
    domain: '<',
    onSubmit: '&'
  },
  template: formTpl,
  controller: SearchFormCtrl,
});
