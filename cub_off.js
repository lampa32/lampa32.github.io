(function() {
    'use strict';

    var initMarker = 0;

    function modssAd() {
		Lampa.Controller.listener.follow('toggle', function(e) {
			  if (e.name == 'select') {
				setTimeout(function() {
				  if($('.selectbox .selectbox-item__icon svg').length && Lampa.Activity.active().component == 'full') $('div.selectbox__body > div > div > div > div:contains("@modssmy_bot")').css('display', 'none');
				  if (Lampa.Activity.active().component === 'modss_online') $('.selectbox-item--icon').remove()
				}, 30);
			  }
			});
     }
	
    // шаблонный метод очистки
	function cleanCub(){
        setTimeout(function() {
		       // скрываем все строки с замочками 
			$('.selectbox-item__lock').parent().css('display', 'none');
			// скрываем строку Статус
			if (document.querySelector("div > span > div > span")) {
			/* универсальный метод - сначал проверяем:
				если элемент сушествует, 
				проверяем его текст - если шильдик группы без цензуры - выходим из функции */
				if (document.querySelector("div > span > div > span").innerText == '@lampa_plugins_uncensored') {
				      return
				/* в остальных случаях, проверяем:
					если мы в НЕ в Расширениях - скрываем строку СТАТУС - без замочков она лишняя */
				}
			}
			else {
				setTimeout(function() {	
					if (!$('.extensions__body').length) $('div > span:contains("Статус")').parent().remove() //$('.settings-param-title').last().css('display', 'none'); 
				}, 10)
			}
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
            if (e.name == 'account') {
                setTimeout(function() {
                    // удаляем строки Синхронизация 
					$('.settings--account-premium').remove()
                    // и строку /CUB Premium/ над ними
					$('div > span:contains("CUB Premium")').remove()
                }, 0);
            }
	    if (e.name == 'add_plugin') {
                setTimeout(function() {
                    // убираем артефакты после входа в Расширения, надпись "Редактировать" / "Ещё" / "История" / "Статус"
			        if (document.querySelector("div > span > div > span")) {
					if (document.querySelector("div > span > div > span").innerText == '@lampa_plugins_uncensored') {
						$('div > span:contains("Еще")').parent().remove()
						$('div > span:contains("Редактировать")').parent().remove()
						$('div > span:contains("История")').parent().remove()
						$('div > span:contains("Статус")').parent().remove()
					}
				}
                }, 0);
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
                      $('.button--subscribe').remove();
                    }, 0);
		   /* $('.full-person--loaded').on('hover:enter', function() {
			setTimeout(function() {
			    $('.button--subscribe').remove();
			}, 200);
		    });*/
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
		if (Lampa.Activity.active().component ='actor') {
			//if ($('.button--subscribe'))
			    setTimeout(function() {
				$('.button--subscribe').remove()
			    }, 200)
		}
                // запускаем функцию сокрытия рекламы hideIT()
                setTimeout(function() {
                    hideIT();
                }, 200)
            }
        });
        
    }
    
	if (window.appready) {cub_off(); hideIT(); modssAd();}
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
                // удаляем раздел Лента с главного меню
                $("[data-action=feed]").eq(0).remove();
                // удаляем раздел Подписки с главного меню
                $("[data-action=subscribes]").eq(0).remove();
		// удаляем раздел Актёры с главного меню
		$("[data-action=myperson]").eq(0).remove();
            }
        });
    }

})();
