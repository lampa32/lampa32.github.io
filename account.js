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
			$('div > span:contains("Аккаунт")').hide();
			$('.settings-param > div:contains("Выйти")').hide();
		  }
	    }
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
				name: '<div class="settings-folder"><div style="width:1.3em;height:1.3em;padding-right:.1em"></div><div style="font-size:1.0em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;color: white;"><div style="line-height: 0.3;">Аккаунт подключен</div></div></div></div></div>',
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
