(function () {
    'use strict';
	
    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            /*if(!Lampa.Storage.get('full','false'))*/ start();
			
            window.lampa_settings.torrents_use = true;
            window.lampa_settings.demo = false;
            window.lampa_settings.read_only = false;
        }
    },100);

	function start(){
      //  Lampa.Storage.set('full','true');
        
        var plugins = Lampa.Plugins.get();
		
        var plugins_add = [
            {
                "url": "https://lampa32.github.io/torrserver.js",
                "status": 1,
                "name": "Torrserver",
                "author": ""
            },
            {
                "url": "http://tvlampa.fun/oleg6972/online.js",
                "status": 1,
                "name": "РћРЅР»Р°Р№РЅ",
                "author": "tvlampa"
            },
            {
                "url": "http://tvlampa.fun/oleg6972/tv.js",
                "status": 1,
                "name": "TV",
                "author": "tvlampa"
            },
            {
                "url": "http://tvlampa.fun/oleg6972/tracks.js",
                "status": 1,
                "name": "Tracks.js",
                "author": "tvlampa"
            },
            {
                "url": "http://tvlampa.fun/oleg6972/jackett.js",
                "status": 1,
                "name": "Jackett",
                "author": "tvlampa"
             }
        ];

        var plugins_push = []

        plugins_add.forEach(function(plugin){
            if(!plugins.find(function(a){ return a.url == plugin.url})){
                Lampa.Plugins.add(plugin);
                Lampa.Plugins.save();

                plugins_push.push(plugin.url)
            }
        });

        if(plugins_push.length) Lampa.Utils.putScript([plugins_push],function(){},function(){},function(){},true);
        
    }
})();
