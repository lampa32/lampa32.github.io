(function () {
    'use strict';
    Lampa.Platform.tv();
 
    Lampa.Storage.set('keyboard_type', 'integrate');
    window.lampa_settings.torrents_use = true;
    window.lampa_settings.demo = false;
    window.lampa_settings.read_only = false;
   
    if (!Lampa.Storage.get('tv_install')) {
     var pluginsArray = Lampa.Storage.get('plugins');
    	pluginsArray.push({"url": "https://lampa32.github.io/torrserver.js", "status": 1});
        //pluginsArray.push({"url": "https://lampa32.github.io/tv.js", "status": 1});
       Lampa.Storage.set('plugins', pluginsArray);
       //Lampa.Storage.set('keyboard_type', 'integrate');
       Lampa.Storage.set('tv_install', true); location.reload()
    }

})();
