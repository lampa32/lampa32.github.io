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
    window.lampa_settings.demo = false;
	window.lampa_settings.read_only = false;

    var script = document.createElement ('script');
script.src = ('http://freebie.tom.ru/filmix.js','https://lampa32.github.io/torrserver.js','https://lampa32.github.io/jackett.js','https://lampa32.github.io/plugins/addon.js','http://cub.watch/plugin/tmdb-proxy');
document.getElementsByTagName ('head')[0].appendChild (script);
})();
