(function () {
  'use strict';

  var syncManager = {
    startSync: function (token) {
      // Загрузка данных с сервера
      this.loadDataFromServer(token)
        .then(function (data) {
          // Сохранение данных в локальное хранилище
          syncManager.saveDataToStorage(data);
          Lampa.Noty.show('Данные успешно синхронизированы');
        })
        .catch(function (error) {
          Lampa.Noty.show('Ошибка синхронизации: ' + error.message);
        });
    },

    loadDataFromServer: function (token) {
      return fetch(`http://212.113.103.137:3003/lampa/sync?token=${encodeURIComponent(token)}`)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Ошибка загрузки данных с сервера');
          }
        });
    },

    saveDataToStorage: function (data) {
      ['torrents_view', 'plugins', 'favorite', 'file_view'].forEach(function (key) {
        Lampa.Storage.set(key, data[key]);
      });
    },

    sendDataToServer: function (token, data) {
      return fetch(`http://212.113.103.137:3003/lampa/sync?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Ошибка отправки данных на сервер');
          }
        });
    }
  };

  Lampa.SettingsApi.addParam({
    component: 'acc',
    param: {
      
      name: 'acc_sync',
      type: 'trigger',
      default: false
    },
    field: {
      name: 'Синхронизация данных',
      description: ''
    },
    onChange: function (value) {
      if (value === 'true') {
        var token = localStorage.getItem('token');
        if (token) {
          syncManager.startSync(token);
        } else {
          Lampa.Noty.show('Вы не зашли в аккаунт');
          if (Lampa.Storage.field('acc_sync')) {
            Lampa.Storage.set('acc_sync', false);
            Lampa.Settings.update();
          }
        }
      } else {
        // Отправка обновленных данных на сервер
        var token = localStorage.getItem('token');
        if (token) {
          var data = {
            torrents_view: Lampa.Storage.field('torrents_view'),
            plugins: Lampa.Storage.field('plugins'),
            favorite: Lampa.Storage.field('favorite'),
            file_view: Lampa.Storage.field('file_view')
          };
          syncManager.sendDataToServer(token, data);
        }
      }
    }
  });
})();
