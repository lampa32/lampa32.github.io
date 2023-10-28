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
          $(".view--trailer").each(function(){var div = $(this).parent('div');div.find('.open--menu').insertBefore($(this))});
			$(".full-start__icons > .info__icon",Lampa.Activity.active().activity.render()).css({'background-image':'url("")', 'padding':'0.7em'});
       setTimeout(function(){
        $(".view--online", Lampa.Activity.active().activity.render()).empty().append("<svg viewBox='0 0 847 847' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd'><circle cx='423' cy='423' r='398' fill='#3498db' class='fill-1fc255'></circle><path d='M642 423 467 322 292 221v404l175-101z' fill='#fff7f7' stroke='#fff7f7' stroke-width='42.33' stroke-linejoin='round' class='fill-fff7f7 stroke-fff7f7'></path></svg><span>Начать просмотр</span>"); 
       },10);
      }
   })
})();
