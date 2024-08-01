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

      /*Lampa.SettingsApi.addParam({
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
  onChange: async (value) => {
    try {
      const response = await fetch('http://212.113.103.137:3000/checkToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: value })
      });
      const { userId } = await response.json();
      if (userId) {
          console.log('Токен действителен');
        // Токен действителен, сохраняем его
        localStorage.setItem('token', value);
      } else {
          console.log('Токен недействителен');
        // Токен недействителен, очищаем его
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.log('Ошибка проверки токена:', error);
    }
  }
});*/

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
    xhr.open('POST', 'http://212.113.103.137:3000/checkToken', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log('Ответ сервера:', response);
        if (response.userId) {
          console.log('Токен действителен');
          localStorage.setItem('token', value);
        } else {
          console.log('Токен недействителен');
          localStorage.removeItem('token');
        }
      }
    };
    xhr.send(JSON.stringify({ token: value }));
  }
});

})();
