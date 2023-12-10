(function () {
    'use strict';
	
    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            if(!Lampa.Storage.get('full','false')) start();
			
            window.lampa_settings.torrents_use = true;
            window.lampa_settings.demo = false;
            window.lampa_settings.read_only = false;
        }
    },100);

	function start(){
        Lampa.Storage.set('full','true');
        Lampa.Storage.set('jackett_url', 'jacred.xyz');
	Lampa.Storage.set('parse_in_search', true);
        var plugins = Lampa.Plugins.get();
		
        var plugins_add = [
            {
                "url": "https://scabrum.github.io/plugins/addon.js",
                "status": 1,
                "name": "Альтернативный Магазин",
                "author": "@scabrum"
            },
            {
                "url": "https://scabrum.github.io/plugins/jackett.js",
                "status": 1,
                "name": "Переключение Парсеров",
                "author": "@scabrum"
            },
            {
                "url": "https://nb557.github.io/plugins/online_mod.js",
                "status": 1,
                "name": "Online Mod",
                "author": "@t_anton"
            },
            {
                "url": "http://cub.red/plugin/tracks",
                "status": 1,
                "name": "Tracks",
                "author": "@lampa"
            },
            {
                "url": "http://cub.red/plugin/radio",
                "status": 1,
                "name": "Радио",
                "author": "@lampa"
             },
	     {
                "url": "http://79.137.205.41/start.js",
                "status": 1,
                "name": "Start On",
                "author": "@scabrum"
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
    setTimeout(function(){
	Lampa.Noty.show("Приложение будет перезапущено ...");
    },3000);
    if (!Lampa.Storage.get('full_del')) {
      setTimeout(function(){
         var plugArray = Lampa.Storage.get('plugins');
         var delplugin = plugArray.filter(function(obj) {return obj.url !== 'https://lampa32.github.io/full.js'});
         Lampa.Storage.set('plugins', delplugin);
         Lampa.Storage.set('full_del', true); //location.reload()
      },6000);
    }
    //var ads = '<div style="line-height: 1.4;">Надоело смотреть в плохом качестве?<br>Хочешь смотреть в FHD и 4K? Переходи в телеграм бот <span style="color: #24b4f9">@modssmy_bot</span> для подключения VIP</div>'

	Lampa.SettingsApi.addParam({
					component: 'add_plugin',
					param: {
						name: 'add_ads',
      		                        	type: 'static',
						default: true
                        		},
					field: {
                                name: '<div style="padding: 1.5em 2em; padding-top: 0;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="line-height: 1.4;">Надоело смотреть в плохом качестве?<br>Хочешь смотреть в FHD и 4K? Переходи в телеграм бот <span style="color: #24b4f9">@modssmy_bot</span> для подключения VIP</div>', '</div>', '</div>'
                        },
		});
})();
