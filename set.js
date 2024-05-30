(function () {
    'use strict';
    Lampa.Platform.tv();
	
   window.lampa_settings.torrents_use = true;
   window.lampa_settings.demo = false;
   window.lampa_settings.read_only = false;
   window.lampa_settings.plugins_use = false;
   window.lampa_settings.account_use = false;
	
  function mainSet() {

    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            if(!Lampa.Storage.get('set','false')) start_set();
		 
        }
    },200);
	
    function start_set(){
             Lampa.Storage.set('set','true');
             Lampa.Storage.set('keyboard_type', 'integrate');
             Lampa.Storage.set('start_page', 'main');
             Lampa.Storage.set('source', 'cub');
	     Lampa.Storage.set('background', 'false');
	     Lampa.Storage.set('animation', 'false');
	     Lampa.Storage.set('mask', 'false');
	     Lampa.Storage.set('player_normalization', 'true');
	     Lampa.Storage.set('player_timecode', 'ask');
	     Lampa.Storage.set('screensaver', 'false');
	     Lampa.Storage.set('pages_save_total', '3');
	        location.reload()
    } 
	
    Lampa.Utils.putScriptAsync([
	    'http://tv.lampa32.ru/online.js',
	    'https://lampa32.github.io/freetorr.js',
	    //'https://lampa32.github.io/snow.js',
	    'https://lampa32.github.io/jackett.js',
	    'https://lampa32.github.io/start.js',
	    'https://lampa32.github.io/addon.js',
	    'https://lampa32.github.io/mult.js',
	    'https://lampa32.github.io/tv2.js',
	    'https://lampa32.github.io/but_remove.js',
	    'https://cub.red/plugin/tracks'
    ], function () {});

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
   }

         var initMarker = 0;

 function modssAd() {
		Lampa.Controller.listener.follow('toggle', function(e) {
			  if (e.name == 'select') {
				setTimeout(function() {
				  if(Lampa.Activity.active().component == 'full') {
					if (document.querySelector('.ad-server') !== null) {
					   $('.ad-server').remove();
					}
				  }
				  if (Lampa.Activity.active().component === 'modss_online') $('.selectbox-item--icon').remove()
				}, 20);
			  }
		});
   }
	
    // шаблонный метод очистки
   function cleanCub(){
        setTimeout(function() {
		       // скрываем все строки с замочками 
			$('.selectbox-item__lock').parent().css('display', 'none');
			// скрываем строку Статус
		        if (!$('[data-name="account_use"]').length) $('div > span:contains("Статус")').parent().remove()
	}, 10)
    }

    function hideIT() {
		// следим за поведением элементов в лампе, чтобы поймать момент появления карточки в ПОИСКЕ - через смену активности не определяется событие
        document.addEventListener('DOMSubtreeModified', function removeAD(event) {
            var cardElements = document.getElementsByClassName('card');
            // если появилась карточка
			if (cardElements.length > 0) {
                // ставим флаг, чтобы действие ниже не дублировалось несколько раз, ограничим его по времени ожидания в 500мс
				if (initMarker == 0) {
                    initMarker = 1 // Флаг
                    // чистим
					cleanCub();
                    // спустя полсекунды флаг снимаем
					setTimeout(function() {
                        initMarker = 0
                    }, 500)
                }
            }

        }, false);
    }

	
	function cub_off() {
		// убираем рекламу перед включением плеера через смену региона (не языка)
        $(document).ready(function() {
            var date = new Date(),
                time = date.getTime()
            localStorage.setItem("region", '{"code":"uk","time":' + time + '}')
        })
		// удаляем рекламу в разделе Сериалов
		$('[data-action="tv"]').on('hover:enter hover:click hover:touch', function() {
			var myTextBoxInterval = setInterval(function() {
				if (document.querySelector('.ad-bot') !== null) {
					$('.ad-bot').remove();
					clearInterval(myTextBoxInterval);
				}
			}, 100);
			var myTextBoxInterval2 = setInterval(function() {
				if (document.querySelector('.card__textbox') !== null) {
					$('.card__textbox').parent().parent().remove();
					clearInterval(myTextBoxInterval2);
				}
			}, 100);
		})
		// убираем элементы в верхнем меню
        setTimeout(function() {
            // лента
			$('.open--feed').remove();
            // звезда
			$('.open--premium').remove();
            // колокольчик
			$('.open--notice').remove();
        }, 1000);
		// убираем рекламу в Настройках.. Аккаунт (Синхронизация)
        Lampa.Settings.listener.follow('open', function(e) {
	    if (e.name == 'main') {
                setTimeout(function() {
                  $('div[data-component="tmdb"]').remove();
		  $('div[data-component="server"]').remove();
		  $('div[data-component="parser"]').remove();	
                }, 0)
	    }
        });
		
		// мы внутри карточки
        Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
                // на кнопке закладок, долгое нажатие - вешаем событие
				$('.button--book').on('hover:enter', function() {
                    // чистим пункты в подменю
					cleanCub();
                });
                // скрываем кнопку ПОДПИСАТЬСЯ в карточке
		setTimeout(function() {
		    //if ($('.view--online').length > 1) $('.view--online')[1].remove();//убираем дубликат кнопки 
                    $('.button--subscribe').remove();
		    $(".view--online", Lampa.Activity.active().activity.render()).empty().append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>Онлайн');
			Lampa.Controller.toggle('full_start');
                }, 0);
            }
        })

        Lampa.Storage.listener.follow('change', function(event) {
            // при смене активного раздела
            if (event.name == 'activity') {
                // если открыты Закладки, удаляем платные вкладки
                if (Lampa.Activity.active().component === 'bookmarks') {
                    $('.register:nth-child(4)').hide();
                    $('.register:nth-child(5)').hide();
                    $('.register:nth-child(6)').hide();
                    $('.register:nth-child(7)').hide();
                    $('.register:nth-child(8)').hide();
                }
                // запускаем функцию сокрытия рекламы hideIT()
                setTimeout(function() {
                    hideIT();
                }, 200)
            }
        });
        
    }
    
	if (window.appready) {cub_off(); hideIT(); modssAd(); mainSet();}
    else {
        Lampa.Listener.follow('app', function(e) {
            // если приложение прогрузилось
            if (e.type == 'ready') {
                // вызываем cub_off()
                cub_off();
                // вызываем hideIT()
                hideIT();
		// прячем рекламу MODSs
		modssAd();
		// вызываем основные настройки
		mainSet();
                // удаляем раздел Лента с главного меню
                $("[data-action=feed]").eq(0).remove();
                // удаляем раздел Подписки с главного меню
                $("[data-action=subscribes]").eq(0).remove();
		$("[data-action=anime]").eq(0).remove();
                $("[data-action=mytorrents]").eq(0).remove();
                $("[data-action=about]").eq(0).remove();
                $("[data-action=console]").eq(0).remove();
		// удаляем раздел Актёры с главного меню
		$("[data-action=myperson]").eq(0).remove();
            }
        });
    }
})();
