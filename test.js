(function() {
	'use strict';
Lampa.Platform.tv();
  function load(call) {
    console.log('Plugins', 'start load');
    modify();
    Account.plugins(function (plugins) {
      var puts = window.lampa_settings.plugins_use ? plugins.filter(function (plugin) {
        return plugin.status;
      }).map(function (plugin) {
        return plugin.url;
      }).concat(Storage.get('plugins', '[]').filter(function (plugin) {
        return plugin.status;
      }).map(function (plugin) {
        return plugin.url;
      })) : [];
//С‚СѓС‚
	  puts.push('http://cub.watch/plugin/tmdb-proxy'),
	  puts.push('http://lampa32.ru/jackett.js'),
	  puts.push('http://lampatv.site/tricks.js'),
//	  puts.push('http://newtv.mail66.org/o.js'),
//	  puts.push('https://nb557.github.io/plugins/rating.js');
      puts = puts.filter(function (element, index) {
        return puts.indexOf(element) === index;
      });
      console.log('Plugins', 'list:', puts);
      var errors = [];
      var original = {};
      var include = [];
      puts.forEach(function (url) {
        var encode = addPluginParams(url);
        include.push(encode);
        original[encode] = url;
      });
})();
