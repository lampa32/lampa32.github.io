(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Utils.putScriptAsync(['http://lampa32.ru/newtv.js','http://cub.watch/plugin/tmdb-proxy','http://45.67.228.34:9118/online.js','http://lampa32.ru/mult.js','http://cub.red/plugin/radio','https://nemiroff.github.io/lampa/rr.js'], function () {});
  window.lampa_settings.torrents_use = false;
  window.lampa_settings.plugins_use = false;
  window.lampa_settings.account_use = false;
  Lampa.Storage.set('source', 'cub');
  Lampa.Listener.follow('app', function (e) {
     if (e.type == 'ready') {
             setTimeout(function(){
                        $("[data-action=anime]").eq(0).remove();
                        $("[data-action=relise]").eq(0).remove();
                        $("[data-action=mytorrents]").eq(0).remove();
                        $("[data-action=about]").eq(0).remove();
                        $("[data-action=console]").eq(0).remove();
                        $("[data-action=feed]").eq(0).remove();
                        $("[data-action=subscribes]").eq(0).remove();
             },10);
     }
  });
   Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
       setTimeout(function(){
        $(".view--online", Lampa.Activity.active().activity.render()).empty().append("<svg id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 0c-141.61 0-256 114.43-256 256 0 141.61 114.43 256 256 256 141.61 0 256-114.43 256-256 0-141.61-114.43-256-256-256z" fill="#9bfcff"/></g><path d="m512 256c0 141.57-114.39 256-256 256v-512c141.57 0 256 114.39 256 256z" fill="#76e2f8"/><g><path d="m256 60c-108.07 0-196 87.93-196 196s87.93 196 196 196 196-87.93 196-196-87.93-196-196-196z" fill="#f0f7ff"/></g><path d="m452 256c0 108.07-87.93 196-196 196v-392c108.07 0 196 87.93 196 196z" fill="#dfe7f4"/><g><path d="m256 171.4-75-47.73v264.66l75-47.73 132.94-84.6z" fill="#4a696f"/></g><path d="m388.94 256-132.94 84.6v-169.2z" fill="#384949"/></g></svg><span>Начать просмотр</span>"); 
       },10);
      }
   })
})();
