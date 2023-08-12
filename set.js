(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Storage.set('source', 'tmdb');
   // Lampa.Storage.set('parser_use', 'true');
   // Lampa.Storage.set('jackett_url', '');
   // Lampa.Storage.set('jackett_key', '');
   // Lampa.Storage.set('parse_lang', 'lg');
   // Lampa.Storage.set('parse_in_search', 'false');
   // Lampa.Storage.set('torrserver_use_link', 'one');
   // Lampa.Storage.set('torrserver_url', '');
   // Lampa.Storage.set('jackett_interview', 'all');
   // Lampa.Storage.set('tmdb_proxy_image', 'http://imagetmdb.com');
   // Lampa.Storage.set('tmdb_proxy_api', 'http://cors.lampa32.ru/proxy/');
    window.lampa_settings.torrents_use = true;

    var script = document.createElement ('script');
script.src = 'http://freebie.tom.ru/filmix.js';
document.getElementsByTagName ('head')[0].appendChild (script);
    var script = document.createElement ('script');
script.src = 'https://lampa32.github.io/torrserver.js';
document.getElementsByTagName ('head')[0].appendChild (script);
     var script = document.createElement ('script');
script.src = 'https://lampa32.github.io/jackett.js';
document.getElementsByTagName ('head')[0].appendChild (script);
     var script = document.createElement ('script');
script.src = 'https://lampa32.github.io/plugins/addon.js';
document.getElementsByTagName ('head')[0].appendChild (script);
     var pluginsArray = Lampa.Storage.get('plugins');
	// Добавляем новый элемент к списку  
pluginsArray.push({"author": "AndreyURL54", "url": "https://andreyurl54.github.io/diesel5/tricks.js", "name": "Приятные мелочи", "status": 1});
pluginsArray.push({"author": "mods", "url": "http://lampa.stream/modss", "name": "mods", "status": 1});
	// Внедряем изменённый список в лампу
Lampa.Storage.set('plugins', pluginsArray);
Lampa.Settings.update();
})();
