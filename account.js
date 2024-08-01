(function () {
    'use strict';

     Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'add_acc',
                    name: 'Аккаунт'
				        });
			      }
      });

     // Используем jQuery вместо Axios
var $ = require('jquery');

Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'auth',
    type: 'input',
    values: '',
    placeholder: 'Введите token',
    default: '',
    onchange: function(value) {
      // Используем callback вместо async/await
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/checkToken',
        data: JSON.stringify({ token: value }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response) {
          var userId = response.userId;
          if (userId) {
            // Токен верный, можно сохранить userId в приложении
            saveUserId(userId);
            Lampa.Tools.notify('Успешная авторизация!');
          } else {
            Lampa.Tools.notify('Неверный токен');
          }
        },
        error: function(error) {
          console.error('Ошибка при проверке токена:', error);
          Lampa.Tools.notify('Ошибка при проверке токена');
        }
      });
    }
  },
  field: {
    name: 'Выполнить вход',
    description: ''
  }
});

function saveUserId(userId) {
  // Используем localStorage для сохранения userId
  localStorage.setItem('userId', userId);
}

function getUserId() {
  // Используем localStorage для получения userId
  return localStorage.getItem('userId');
}



})();
