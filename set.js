(function () {
    'use strict';
    Lampa.Platform.tv();
   // Lampa.Storage.set('source', 'tmdb');
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
    Lampa.Storage.set('keyboard_type', 'integrate');1
    window.lampa_settings.torrents_use = true;
    window.lampa_settings.demo = false;
    window.lampa_settings.read_only = false;
    window.lampa_settings.plugins_use = false;
    window.lampa_settings.account_use = false;

Lampa.Settings.listener.follow('open', function (e) {
 if (e.name == 'main') {
   setTimeout(function() {
    $('div[data-component="tmdb"]').remove();
   }, 5)
 }
});    
       
    /* var script = document.createElement ('script');
script.src = 'http://tv.lampa32.ru/online.js';
document.getElementsByTagName ('head')[0].appendChild (script);
    var script = document.createElement ('script');
script.src = 'https://lampa32.github.io/torrserver.js';
document.getElementsByTagName ('head')[0].appendChild (script);
     var script = document.createElement ('script');
script.src = 'https://lampa32.github.io/jackett.js';
document.getElementsByTagName ('head')[0].appendChild (script);
     var script = document.createElement ('script');
script.src = 'http://cub.red/plugin/tmdb-proxy';
document.getElementsByTagName ('head')[0].appendChild (script);
     var script = document.createElement ('script');
script.src = 'https://lampa32.github.io/addon.js';
document.getElementsByTagName ('head')[0].appendChild (script);   */
    
    Lampa.Utils.putScriptAsync(['http://tv.lampa32.ru/online.js','https://lampa32.github.io/torrserver.js','https://lampa32.github.io/jackett.js','http://cub.red/plugin/tmdb-proxy','https://lampa32.github.io/addon.js','https://lampa32.github.io/mult.js'], function () {});
     
    (function(m, e, t, r, i, k, a) {
               m[i] = m[i] || function() {
                       (m[i].a = m[i].a || []).push(arguments)
               };
               m[i].l = 1 * new Date();
               for(var j = 0; j < document.scripts.length; j++) {
                       if(document.scripts[j].src === r) {
                               return;
                       }
               }
               k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
        })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(94674961, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
        });
        var METRIKA = '<noscript><div><img src="https://mc.yandex.ru/watch/94674961" style="position:absolute; left:-9999px;" alt="" /></div></noscript>';
        $('body').append(METRIKA);
})();
