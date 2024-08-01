(function () {
    'use strict';

    

function checkToken(token, callback) {
  console.log('checkToken function called with token:', token);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/checkToken', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response.userId);
      } else {
        console.error("Ошибка при проверке токена:", xhr.status, xhr.statusText);
        Lampa.Noty.show("Ошибка при проверке токена");
      }
    }
  };
  xhr.onerror = function() {
    console.error("Ошибка сети при проверке токена");
    Lampa.Noty.show("Ошибка сети при проверке токена");
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

Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'auth',
    type: 'input',
    values: '',
    placeholder: 'Введите token',
    default: '',
    onchange: function(value) {
      console.log('onchange function called with value:', value);
      checkToken(value, function(userId) {
        if (userId) {
          // Токен верный, можно сохранить userId в приложении
          saveUserId(userId);
          Lampa.Noty.show("Успешная авторизация!");
        } else {
          Lampa.Noty.show("Неверный токен");
        }
      });
    },
    oninput: function(value) {
      console.log('oninput function called with value:', value);
      checkToken(value, function(userId) {
        if (userId) {
          // Токен верный, можно сохранить userId в приложении
          saveUserId(userId);
          Lampa.Noty.show("Успешная авторизация!");
        } else {
          Lampa.Noty.show("Неверный токен");
        }
      });
    }
  },
  field: {
    name: 'Выполнить вход',
    description: ''
  }
});


 Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'add_acc',
                    name: 'Аккаунт'
		});
	    }
      });
	




})();
