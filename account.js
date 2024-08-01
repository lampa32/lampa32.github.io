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
});

})();
