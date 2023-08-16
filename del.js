(function() {
	'use strict';
Lampa.Platform.tv();
  if (!Lampa.Storage.get('delUpdated')) {
     var updatedPlugins = pluginsArray.filter(function(obj) {return obj.url !== 'http://lampa32.ru/jackett.js'});
     Lampa.Storage.set('plugins', updatedPlugins);
     Lampa.Storage.set('delUpdated', true); location.reload()
  }
})();
