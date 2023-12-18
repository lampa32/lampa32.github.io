(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Storage.set('protocol', 'http');
 
  if (Lampa.Storage.get('source') == 'cub') {
    Lampa.Storage.set('source', 'tmdb')
  }

    var pluginArray = Lampa.Storage.get('plugins');
    var delplugin = pluginArray.filter(function(obj) {return obj.url !== 'http://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', delplugin);

    var pluginArray = Lampa.Storage.get('plugins');
    var deleteplugin = pluginArray.filter(function(obj) {return obj.url !== 'https://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', deleteplugin);


    Lampa.TMDB.image = function (url) {
      var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'http://cors.lampa32.ru/proxy/' + Lampa.Utils.addUrlComponent(base) : base;
    };

    Lampa.TMDB.api = function (url) {
      var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'http://cors.lampa32.ru/proxy/' + Lampa.Utils.addUrlComponent(base) : base;
    };

    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'tmdb') {
        e.body.find('[data-parent="proxy"]').remove();
      }
    });

    var dcma_timer = setInterval(function(){
      if(window.lampa_settings.dcma){
            clearInterval(dcma_timer)
            window.lampa_settings.dcma = false
      }
    },1000)

})();
