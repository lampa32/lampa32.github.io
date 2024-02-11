(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Storage.set('keyboard_type', 'integrate');
    Lampa.Storage.set('start_page', 'main');
    Lampa.Storage.set('source', 'cub');
   // Lampa.Storage.set('protocol', 'http');
   // Lampa.Storage.set('parser_use', 'true');
   // Lampa.Storage.set('jackett_url', '');
   // Lampa.Storage.set('jackett_key', '');
   // Lampa.Storage.set('parse_lang', 'lg');
   // Lampa.Storage.set('parse_in_search', 'false');
   // Lampa.Storage.set('torrserver_use_link', 'one');
   // Lampa.Storage.set('torrserver_url', '');
   // Lampa.Storage.set('jackett_interview', 'all');
   // Lampa.Storage.set('tmdb_proxy_image', 'http://cors.lampa32.ru/prox/');
   // Lampa.Storage.set('tmdb_proxy_api', 'http://cors.lampa32.ru/prox/');
   // Lampa.Storage.set('proxy_tmdb','true');
    
    window.lampa_settings.torrents_use = true;
    window.lampa_settings.demo = false;
    window.lampa_settings.read_only = false;
    window.lampa_settings.plugins_use = false;
    window.lampa_settings.account_use = false;
    
   /* var dcma_timer = setInterval(function(){
	  if(window.lampa_settings.dcma){
		clearInterval(dcma_timer)
		window.lampa_settings.dcma = false
	  }
    },1000)*/


/*Lampa.Settings.listener.follow('open', function (e) {
 if (e.name == 'main') {
   setTimeout(function() {
    $('div[data-component="tmdb"]').remove();
   }, 5)
 }
});    
    setTimeout(function(){
      $('.open--premium').remove();
      //$('.open--notice').remove();
     }, 1000);    
    Lampa.Listener.follow('app', function (e) {
     if (e.type == 'ready') {
             setTimeout(function(){
                 $("[data-action=anime]").eq(0).remove();
                 $("[data-action=mytorrents]").eq(0).remove();
                 $("[data-action=about]").eq(0).remove();
                 $("[data-action=console]").eq(0).remove();
                 $("[data-action=subscribes]").eq(0).remove();
              },10);
     }
  });
     Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
       setTimeout(function(){
	      $('.button--subscribe').remove();
          $(".view--online", Lampa.Activity.active().activity.render()).empty().append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>Онлайн');
       },10);
      }
     })*/
       
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
    
    Lampa.Utils.putScriptAsync(['http://tv.lampa32.ru/online.js','https://lampa32.github.io/torrserver.js',/*'https://lampa32.github.io/snow.js',*/'https://lampa32.github.io/jackett.js','https://lampa32.github.io/start.js','https://lampa32.github.io/addon.js','https://lampa32.github.io/mult.js','https://lampa32.github.io/tv2.js','https://cub.red/plugin/collections'], function () {});

   /* var plugArray = Lampa.Storage.get('plugins');
    var delplugin = plugArray.filter(function(obj) {return obj.url !== 'http://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', delplugin);

    var pluginArray = Lampa.Storage.get('plugins');
    var deleteplugin = pluginArray.filter(function(obj) {return obj.url !== 'https://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', deleteplugin);*/
	
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

var initMarker = 0;
	
      function hideIT(){

                document.addEventListener('DOMSubtreeModified', function removeAD(event){
		  var cardElements = document.getElementsByClassName('card');
		  if(cardElements.length > 0){
			if (initMarker == 0) {
			  initMarker = 1 // Флаг
			  setTimeout(function(){
 				  $('.selectbox-item__lock').parent().css('display', 'none');
				  $('.settings-param-title').last().css('display', 'none');
			  }, 50)
			  setTimeout(function(){
				  initMarker = 0 // Снимаем флаг
			  }, 500)
			}
		  }
		}, false);
		
		var myCardInterval = setInterval(function(){
			if (document.querySelector('.card') !== null) {
				$('.card').on('hover:long', function () {
						setTimeout(function(){	
							$('.selectbox-item__lock').parent().css('display', 'none');
							$('.settings-param-title').last().css('display', 'none');
						},50)
				})
				clearInterval(myCardInterval);
			 }
		}, 100);
		var myTextBoxInterval = setInterval(function(){
			if (document.querySelector('.card__textbox') !== null) {
				$('.card__textbox').parent().parent().remove();
				clearInterval(myTextBoxInterval);
			}
		}, 100);
	}
	
function cub_off() {

	 setTimeout(function(){
              $('.open--feed').remove();
              $('.open--premium').remove();
	      $('.open--notice').remove();
          }, 1000);

	  Lampa.Settings.listener.follow('open', function (e) {
             if (e.name == 'account') {
	        setTimeout(function(){
		    $('.settings--account-premium').remove()
		    $('div > span:contains("CUB Premium")').remove()
		},0);
             }
          });
	
	  Lampa.Listener.follow('full', function(e) {
                if (e.type == 'complite') {
		  $('.button--book').on('hover:enter', function(){
		    setTimeout(function(){	
			$('.selectbox-item__lock').parent().css('display', 'none');
			$('.settings-param-title').last().css('display', 'none');
		    },0)
		  });	  
                   setTimeout(function(){
			$('.button--subscribe').remove();
		   },0);
                }
          })   
  
          Lampa.Storage.listener.follow('change', function (event) {
               if (event.name == 'activity') {
	              if (Lampa.Activity.active().component === 'bookmarks') {
					$('.register:nth-child(4)').hide();
					$('.register:nth-child(5)').hide();
					$('.register:nth-child(6)').hide();
					$('.register:nth-child(7)').hide();
					$('.register:nth-child(8)').hide();
		       }
		       setTimeout(function(){
			hideIT();
		       }, 200)
                }
          });

}	
if(window.appready) cub_off();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				cub_off(); hideIT();
				$("[data-action=feed]").eq(0).remove();
                                $("[data-action=subscribes]").eq(0).remove();
				
			}
		});
	}
})();
