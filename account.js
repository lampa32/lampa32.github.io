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
                    component: 'add_acc',
                    name: 'Аккаунт'
                });
            }
            if (e.name == 'add_acc') {
		$('div[data-name="auth"]').before(botElement);
		    if (localStorage.getItem('token') !== null) {
	                $('div[data-name="auth"]').hide();
			    
                    }  
	    }
      });


    
    Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'auth',
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
	  $('div[data-name="auth"]').hide();
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

                          Lampa.SettingsApi.addParam({
                                component: 'add_acc',
                                param: {
                                name: 'acc_status',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Вы авторизированы. Ваш токен localStorage.getItem('token')',
                                description: 'Бэкап настроек для профиля, требуется аккаут CUB'
                                },
			    });
	
})();
