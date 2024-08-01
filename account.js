(function () {
    'use strict';

    

function checkToken(token, callback) {
  console.log('checkToken function called with token:', token);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://212.113.103.137:3000/checkToken', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response.userId);
      } else {
        console.error('Ошибка при проверке токена:', xhr.status, xhr.statusText);
        console.log('Ошибка при проверке токена');
      }
    }
  };
  xhr.onerror = function() {
    console.error('Ошибка сети при проверке токена');
    console.log('Ошибка сети при проверке токена');
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

// Вынесем это в отдельную функцию, не связанную с Lampa
function handleTokenInput(token) {
  checkToken(token, function(userId) {
    if (userId) {
      // Токен верный, можно сохранить userId в приложении
      saveUserId(userId);
      console.log('Успешная авторизация!');
    } else {
      console.log('Неверный токен');
    }
  });
}

// Здесь мы просто вызываем функцию handleTokenInput при вводе токена
document.getElementById('tokenInput').addEventListener('input', function(event) {
  handleTokenInput(event.target.value);
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
