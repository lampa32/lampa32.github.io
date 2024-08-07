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
		   if (localStorage.getItem('token') !== null) {
	                $('div[data-name="acc_auth"]').hide();
			   var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(4)")
                           Lampa.Controller.focus(M)
                           Lampa.Controller.toggle('settings_component')
                  } else {
			//$('div > span:contains("Аккаунт")').hide();
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
				name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.3em;height:1.3em;padding-right:.1em"><svg width="256px" height="256px" viewBox="0 0 1024.00 1024.00" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="21.503999999999998"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z" fill="#4A5699"></path><path d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z" fill="#C45FA0"></path><path d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z" fill="#E5594F"></path></g></svg></div><div style="font-size:1.1em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;color: white;"><div style="line-height: 0.3;">Аккаунт подключен</div></div></div></div></div>',
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
})();
