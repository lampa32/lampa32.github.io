(function() {
	'use strict';
Lampa.Platform.tv();
  if (!Lampa.Storage.get('delUpdated')) {
     var pluginsArray = Lampa.Storage.get('plugins');
     var updatedPlugins = pluginsArray.filter(function(obj) {return obj.url !== 'https://scabrum.github.io/plugins/jackett.js'});
     Lampa.Storage.set('plugins', updatedPlugins);
     Lampa.Storage.set('delUpdated', true); location.reload()
  }
})();
