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
  component: 'adLampa.SettingsApi.addParam({
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
  onSave: async (value) => {
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
        // Токен действителен, сохраняем его
        localStorage.setItem('token', value);
      } else {
        // Токен недействителен, очищаем его
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
    }
  }
});

})();
