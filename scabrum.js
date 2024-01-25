(function () {
    'use strict';
  Lampa.Platform.tv();
  var updateplugins = false;
    var plugins = Lampa.Storage.get('plugins','[]')
    var updatedPlugins = plugins.filter(function(plug) 
    {
       if (plug.url.indexOf('scabrum.github.io') >= 0)
       {
          updateplugins = true;
          return false;
       }
		
       return true;
    });

    if (updateplugins)
	{
       Lampa.Storage.set('plugins', updatedPlugins);
	   
	   var checkResult = updatedPlugins.filter(function(obj) {return obj.url == 'http://skaztv.online/tv.js'});
			if (checkResult=='') {
				updatedPlugins.push({
				"author": '@scabrum',
				"url": 'http://skaztv.online/tv.js',
				"name": 'TV by skaz',
				"status": 1
				});
				Lampa.Storage.set('plugins', updatedPlugins);
			}
	}
		
})();
