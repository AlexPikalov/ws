import mod from './search.module';

mod.constant('searchConfig', {
  searchApiUrl: 'http://localhost:3000/domainSearch',
  domainRegexp: /^([a-z0-9-_]+\.)*[a-z0-9-_]+\.(com|net)$/
});
