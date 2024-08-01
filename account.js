(function () {
    'use strict';

    

function checkToken(token, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://212.113.103.137:3000/checkToken', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response.userId);
      } else {
        console.log('Ошибка при проверке токена:', xhr.status, xhr.statusText);
        Lampa.Noty.show('Ошибка при проверке токена');
      }
    }
  };
  xhr.onerror = function() {
    console.log('Ошибка сети при проверке токена');
    Lampa.Noty.show('Ошибка сети при проверке токена');
  };
  xhr.send(JSON.stringify({ token: token }));
}


function saveUserId(userId) {
  // Используем localStorage для сохранения userId
  localStorage.setItem('userId', userId);
}

function getUserId() {
  // Используем localStorage для получения userId
  return localStorage.getItem('userId');
}

 Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'add_acc',
                    name: 'Аккаунт'
		});
	    }
      });
	
Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'auth',
    type: 'input',
    values: '',
    placeholder: 'Введите token',
    default: '',
    onchange: function(value) {
      checkToken(value, function(userId) {
        if (userId) {
          // Токен верный, можно сохранить userId в приложении
          saveUserId(userId);
          Lampa.Noty.show('Успешная авторизация!');
        } else {
          Lampa.Noty.show('Неверный токен');
        }
      });
    }
  },
  field: {
    name: 'Выполнить вход',
    description: ''
  }
});



})();
