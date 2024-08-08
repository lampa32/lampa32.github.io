(function () {
  'use strict';

  Lampa.SettingsApi.addParam({
    component: 'acc',
    param: {
      name: 'acc_sync',
      type: 'trigger',
      default: ''
    },
    field: {
      name: 'Синхронизация данных',
      description: ''
    },
    onChange: function (value) {
      if (value === 'true') {
        const token = localStorage.getItem('token');
        if (token) {
          syncManager.startSync(token);
        } else {
          Lampa.Noty.show('Вы не зашли в аккаунт');
          if (Lampa.Storage.field('acc_sync')) {
            Lampa.Storage.set('acc_sync', false);
            Lampa.Settings.update();
          }
        }
      }
    }
  });

  const interestingKeys = ['torrents_view', 'plugins', 'favorite', 'file_view'];
  const syncManager = {
    timer: null,
    needsSync: false,

    handleStorageChange(event) {
      const key = event.name;
      if (interestingKeys.includes(key)) {
        console.log(`Изменен ключ в локальном хранилище: ${key}`);
        this.needsSync = true;

        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          if (this.needsSync) {
            const token = localStorage.getItem('token');
            if (token) {
              this.startSync(token);
            }
            this.needsSync = false;
          }
        }, 2000);
      }
    },

    startSync(token) {
      console.log('Запуск синхронизации...');
      this.sendDataToServer(token)
        .then(() => {
          console.log('Синхронизация успешно завершена');
          this.needsSync = false;
        })
        .catch((error) => {
          console.error('Ошибка синхронизации:', error);
          this.needsSync = true; // Оставляем флаг, чтобы попробовать снова
        });
    },

    sendDataToServer(token) {
      const syncData = this.getSyncedData();
      return fetch(`http://212.113.103.137:3003/lampa/sync?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(syncData)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка при синхронизации: ${response.status} - ${response.statusText}`);
        }
      })
      .then(result => {
        if (result.success) {
          this.updateLocalStorage(result.data);
        } else {
          throw new Error('Синхронизация не удалась');
        }
      });
    },

    getSyncedData() {
      return {
        torrents_view: Lampa.Storage.get('torrents_view', '[]'),
        plugins: Lampa.Storage.get('plugins', '[]'),
        favorite: Lampa.Storage.get('favorite', '{}'),
        file_view: Lampa.Storage.get('file_view', '{}')
      };
    },

    updateLocalStorage(data) {
      if (data) {
        if (typeof data.torrents_view !== 'undefined') {
          Lampa.Storage.set('torrents_view', data.torrents_view);
        }
        if (typeof data.plugins !== 'undefined') {
          Lampa.Storage.set('plugins', data.plugins);
        }
        if (typeof data.favorite !== 'undefined') {
          Lampa.Storage.set('favorite', data.favorite);
        }
        if (typeof data.file_view !== 'undefined') {
          Lampa.Storage.set('file_view', data.file_view);
        }
      } else {
        console.error('Ошибка: Данные для синхронизации отсутствуют');
      }
    },

    loadDataFromServer(token) {
      return fetch(`http://212.113.103.137:3003/lampa/sync?token=${encodeURIComponent(token)}`)
        .then(response => {
          if (response.ok) {

            return response.json();
          } else {
            throw new Error(`Ошибка при загрузке данных: ${response.status} - ${response.statusText}`);
          }
        })
        .then(result => {
          if (result.success && result.data) {
            return result.data;
          } else {
            throw new Error('Синхронизация не удалась');
          }
        });
    }
  };

  Lampa.Storage.listener.follow('change', (event) => syncManager.handleStorageChange(event));

  Lampa.Settings.listener.follow('open', function(event) {
    if (event.name === 'acc') {
      const token = localStorage.getItem('token');
      if (token) {
        syncManager.loadDataFromServer(token)
          .then(syncManager.updateLocalStorage)
          .catch((error) => {
            console.error('Ошибка при загрузке данных:', error);
          });
      } else {
        Lampa.Noty.show('Вы не зашли в аккаунт');
      }
    }
  });

  Lampa.Storage.listener.follow('change', function(event) {
    const { name } = event;
    if (name === 'token') {
      const token = localStorage.getItem('token');
      if (token) {
        syncManager.startSync(token);
      }
    } else if (name === 'acc_sync') {
      if (event.value === 'true') {
        const token = localStorage.getItem('token');
        if (token) {
          syncManager.startSync(token);
        } else {
          Lampa.Noty.show('Вы не зашли в аккаунт');
          if (Lampa.Storage.field('acc_sync')) {
            Lampa.Storage.set('acc_sync', false);
            Lampa.Settings.update();
          }
        }
      }
    }
  });
})();
