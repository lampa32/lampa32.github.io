(function () {
    'use strict';

    var botElement = $('<div class="myBot" style="line-height: 1;color: #ffffff;font-family: &quot;SegoeUI&quot;, sans-serif;font-size: 10.6px;box-sizing: border-box;outline: none;user-select: none;display: flex;-webkit-box-align: start;align-items: flex-start;position: relative;background-color: rgba(255, 255, 255, 0.1);border-radius: 0.3em;margin: 1.5em 2em;">' +
    '<div class="ad-server__text">' +
    'Нужный тебе текст' +
    '</div><div class="ad-server__label">' + 
    'https://bot.us' +
    '</div><img src="http://193.233.134.21/bot/bot.png" class="ad-server__qr"></div>')
    
    
    Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'acc',
                    name: 'Аккаунт'
                });
            }
            if (e.name == 'acc') {
		    $('div[data-name="acc_auth"]').before(botElement);
		//$('div > span:contains("Авторизация")').before(botElement);
		   if (localStorage.getItem('token') !== null) {
	                $('div[data-name="acc_auth"]').hide();
			   var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(4)")
                           Lampa.Controller.focus(M)
                           Lampa.Controller.toggle('settings_component')
                  } else {
			$('div > span:contains("Аккаунт")').hide();
			$('.settings-param > div:contains("Выйти")').hide();
		  }
	    }
      });

      Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_title_auth',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Авторизация',
				description: ''
                                },
			    });

    
    Lampa.SettingsApi.addParam({
  component: 'acc',
  param: {
    name: 'acc_auth',
    type: 'input',
    values: '',
    placeholder: 'Введите token',
    default: ''
  },
  field: {
    name: 'Выполнить вход',
    description: ''
  },
  onChange: function(value) {    
    console.log('Введенный токен:', value);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://212.113.103.137:3001/checkToken', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log('Ответ сервера:', response);
        if (response.userId) {
          console.log('Токен действителен');
          localStorage.setItem('token', value);
	  Lampa.Noty.show("Токен действителен");
	  //clo();
	  $('div[data-name="acc_auth"]').hide();
	  Lampa.Settings.update();
	  var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(4)")
          Lampa.Controller.focus(M)
          Lampa.Controller.toggle('settings_component')		
        } else {
          console.log('Токен недействителен');
          localStorage.removeItem('token');
	  Lampa.Noty.show("Токен недействителен");
        }
      }
    };
    xhr.send(JSON.stringify({ token: value }));
  }
  
});
                    // function clo() {  
	             // var token = localStorage.getItem('token');
                     //  if (token) {
                          Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_status',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                               // name: 'Вы авторизированы. Ваш токен: ' + token + ' ',
				name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.3em;height:1.3em;padding-right:.1em"><!-- icon666.com - MILLIONS vector ICONS FREE --><svg viewBox="0 0 512 512.00593" xmlns="http://www.w3.org/2000/svg"><path d="m432.003906 144.007812h-19.199218c-15.144532-74.570312-80.710938-128.164062-156.800782-128.164062-76.09375 0-141.660156 53.59375-156.800781 128.164062h-19.199219c-35.304687.105469-63.894531 28.695313-64 64v16c.105469 35.300782 28.695313 63.894532 64 64h102.703125c-14.664062-33.53125-4.707031-72.738281 24.179688-95.207031 28.890625-22.46875 69.34375-22.46875 98.230469 0 28.890624 22.46875 38.847656 61.675781 24.183593 95.207031h102.703125c35.300782-.105468 63.894532-28.699218 64-64v-16c-.105468-35.304687-28.699218-63.894531-64-64zm0 0" fill="#57a4ff"/><path d="m384.003906 496.007812v-32c0-70.695312-57.308594-128-128-128-70.695312 0-128 57.304688-128 128v32zm0 0" fill="#ff3f62"/><path d="m336.003906 256.007812c0 44.179688-35.816406 80-80 80s-80-35.820312-80-80c0-44.183593 35.816406-80 80-80s80 35.816407 80 80zm0 0" fill="#ff3f62"/><path d="m432.003906 128.007812h-6.640625c-21.480469-75.738281-90.636719-128.007812-169.359375-128.007812-78.726562 0-147.878906 52.269531-169.359375 128.007812h-6.640625c-44.164062.046876-79.9531248 35.835938-79.99999975 80v16c.04687495 44.160157 35.83593775 79.949219 79.99999975 80h92.984375c6.390625 10.988282 14.882813 20.609376 25 28.308594-52.195312 23.015625-85.90625 74.648438-85.984375 131.691406v32c0 8.835938 7.164063 16 16 16h256c8.835938 0 16-7.164062 16-16v-32c-.082031-57.042968-33.792968-108.675781-85.984375-131.691406 10.113281-7.699218 18.609375-17.320312 25-28.308594h92.984375c44.160156-.050781 79.949219-35.839843 80-80v-16c-.050781-44.164062-35.839844-79.953124-80-80zm-64 336v16h-224v-16c0-61.859374 50.144532-112 112-112 61.855469 0 112 50.140626 112 112zm-170.632812-182.402343c-.199219-.414063-.328125-.871094-.550782-1.28125-.273437-.636719-.480468-1.308594-.722656-1.957031-.496094-1.3125-.976562-2.625-1.375-3.953126-.246094-.800781-.433594-1.65625-.640625-2.480468-.296875-1.144532-.605469-2.289063-.847656-3.441406-.238281-1.148438-.375-2.398438-.542969-3.574219-.121094-.847657-.28125-1.695313-.367187-2.550781-.203125-2.082032-.320313-4.183594-.320313-6.320313.007813-23.648437 13.050782-45.363281 33.921875-56.476563 20.871094-11.109374 46.171875-9.808593 65.792969 3.386719 19.621094 13.195313 30.367188 36.136719 27.949219 59.65625 0 .183594-.066407.34375-.082031.527344-.222657 2-.511719 4-.925782 5.945313l-.082031.304687c-.429687 2.03125-.964844 4.039063-1.597656 6.023437 0 .113282-.082031.207032-.113281.3125-.636719 1.941407-1.359376 3.863282-2.175782 5.765626-10.117187 23.386718-33.148437 38.535156-58.628906 38.558593-25.476562.023438-48.539062-15.078125-58.699219-38.445312zm282.632812-57.597657c-.027344 26.496094-21.503906 47.972657-48 48h-81.335937c.222656-1.335937.34375-2.699218.503906-4.050781.128906-.976562.285156-1.933593.367187-2.917969.28125-2.992187.464844-6 .464844-9.03125 0-53.019531-42.980468-96-96-96-53.019531 0-96 42.980469-96 96 0 3.03125.175782 6.039063.464844 9.03125.078125.984376.238281 1.941407.359375 2.917969.167969 1.351563.285156 2.714844.511719 4.050781h-81.335938c-26.5-.027343-47.972656-21.503906-48-48v-16c.027344-26.5 21.5-47.976562 48-48h19.199219c7.605469 0 14.160156-5.351562 15.679687-12.800781 13.644532-67.097656 72.644532-115.304687 141.113282-115.304687 68.464844 0 127.46875 48.207031 141.109375 115.304687 1.523437 7.457031 8.085937 12.808594 15.699219 12.800781h19.199218c26.496094.023438 47.972656 21.5 48 48zm0 0" fill="#5a2479"/></svg></div><div style="font-size:1.1em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;color: white;"><div style="line-height: 0.3;">Аккаунт подключен</div></div></div></div></div>',
					//'<div class="settings-folder" style="padding:0!important"><div style="width:1.3em;height:1.3em;padding-right:.1em"></div><div style="font-size:1.0em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;color: white;"><div style="line-height: 0.3;">Аккаунт подключен</div></div></div></div></div>',
                                
				description: ''
                                },
			    });

			   Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_exit',
                                type: 'static', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Выйти из аккаунта',
                                description: ''
                                },
				onRender: function(item) {
                                     item.on('hover:enter', function () {
                                         localStorage.removeItem('token');
					 item.hide(); 
					 $('div[data-name="acc_auth"]').show();
					 $('div > span:contains("Аккаунт")').hide();
					var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(2)")
                                        Lampa.Controller.focus(M)
                                        Lampa.Controller.toggle('settings_component')	
					
				     })
                               }
			    });
			
		        // }
		    // }
	//clo()

	Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_title_auth',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Синхронизация',
				description: ''
                                },
			    });
})();
