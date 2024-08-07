(function () {
  'use strict';

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
          syncManager.loadDataFromServer(token)
          
        } else {
          console.log('Вы не зашли в аккаунт');
          if (Lampa.Storage.field('acc_sync')) {
            Lampa.Storage.set('acc_sync', false);
            Lampa.Settings.update();
          }
        }
      }
    }
  });

  var interestingKeys = ['torrents_view', 'plugins', 'favorite', 'file_view'];
  var syncManager = {
    timer: null,
    needsSync: false,
    isSyncSuccessful: false,

    handleStorageChange: function (event) {
      var key = event.name;
      if (interestingKeys.indexOf(key) !== -1) {
        console.log('Изменен ключ в локальном хранилище: ' + key);
        this.needsSync = true;

        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
          if (this.needsSync) {
            var token = localStorage.getItem('token');
            if (token) {
              this.startSync(token);
            }
            this.needsSync = false;
          }
        }.bind(this), 2000);
      }
    },

    startSync: function (token) {
      console.log('Запуск синхронизации...');
      this.isSyncSuccessful = false;
      this.sendDataToServer(token)
        .then(function () {
          if (this.isSyncSuccessful) {
            console.log('Синхронизация успешно завершена');
          } else {
            console.log('Ошибка: Данные для синхронизации отсутствуют');
          }
          this.needsSync = false;
        }.bind(this))
        .catch(function (error) {
          console.log('Ошибка синхронизации:', error);
          this.needsSync = true; // Оставляем флаг, чтобы попробовать снова
        }.bind(this));
    },

    sendDataToServer: function (token) {
      var syncData = this.getSyncedData();
      if (Object.keys(syncData).length === 0) {
        this.isSyncSuccessful = false;
        return Promise.reject(console.log('Данные для синхронизации отсутствуют'));
      }
      return this.makeHttpRequest('POST', 'http://212.113.103.137:3003/lampa/sync?token=' + encodeURIComponent(token), syncData)
        .then(function (response) {
          if (response.status === 200) {
            this.isSyncSuccessful = true;
            return JSON.parse(response.responseText);
          } else {
            this.isSyncSuccessful = false;
            console.log('Ошибка при синхронизации: ' + response.status + ' - ' + response.statusText);
          }
        }.bind(this))
        .then(function (result) {
          if (result.success) {
            this.updateLocalStorage(result.data);
          } else {
            this.isSyncSuccessful = false;
            console.log('Синхронизация не удалась');
          }
        }.bind(this));
    },

 updateLocalStorage: function (data) {
  console.log('Обновление локального хранилища:', data);

  // Сначала проверяем, что data не равно undefined
  if (data === undefined) {
    console.log('Ошибка: data имеет тип undefined');
    return;
  }

  // Проверяем, что data является объектом
  if (typeof data === 'object' && data !== null) {
    // Проверяем наличие и тип данных для каждого ключа
    if (Array.isArray(data.torrents_view) && data.torrents_view.length > 0) {
      console.log('Данные для "torrents_view":', data.torrents_view);
      Lampa.Storage.set('torrents_view', data.torrents_view);
    } else {
      console.log('Ошибка: Данные для ключа "torrents_view" некорректны или отсутствуют');
    }

    if (Array.isArray(data.plugins) && data.plugins.length > 0) {
      console.log('Данные для "plugins":', data.plugins);
      Lampa.Storage.set('plugins', data.plugins);
    } else {
      console.log('Ошибка: Данные для ключа "plugins" некорректны или отсутствуют');
    }

    if (Array.isArray(data.favorite) && data.favorite.length > 0) {
      console.log('Данные для "favorite":', data.favorite);
      Lampa.Storage.set('favorite', data.favorite);
    } else if (typeof data.favorite === 'object' && Object.keys(data.favorite).length > 0) {
      console.log('Данные для "favorite":', data.favorite);
      Lampa.Storage.set('favorite', data.favorite);
    } else {
      console.log('Ошибка: Данные для ключа "favorite" некорректны или отсутствуют');
    }

    if (Array.isArray(data.file_view) && data.file_view.length > 0) {
      console.log('Данные для "file_view":', data.file_view);
      Lampa.Storage.set('file_view', data.file_view);
    } else if (typeof data.file_view === 'object' && Object.keys(data.file_view).length > 0) {
      console.log('Данные для "file_view":', data.file_view);
      Lampa.Storage.set('file_view', data.file_view);
    } else {
      console.log('Ошибка: Данные для ключа "file_view" некорректны или отсутствуют');
    }
  } else {
    console.log('Ошибка: Данные для синхронизации некорректны или отсутствуют');
  }
},

    makeHttpRequest: function (method, url, data) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr);
          } else {
            reject(xhr);
          }
        };
        xhr.onerror = function () {
          reject(xhr);
        };
        xhr.send(JSON.stringify(data));
      });
    },

    getSyncedData: function () {
      return {
        torrents_view: Lampa.Storage.get('torrents_view', '[]'),
        plugins: Lampa.Storage.get('plugins', '[]'),
        favorite: Lampa.Storage.get('favorite', '{}'),
        file_view: Lampa.Storage.get('file_view', '{}')
      };
    },

    loadDataFromServer: function (token) {
      return this.makeHttpRequest('GET', 'http://212.113.103.137:3003/lampa/sync?token=' + encodeURIComponent(token))
        .then(function (response) {
          if (response.status === 200) {
            return JSON.parse(response.responseText);
          } else {
            console.log('Ошибка при загрузке данных: ' + response.status + ' - ' + response.statusText);
          }
        })
        .then(function (result) {
          if (result.success && result.data) {
            return result.data;
          } else {
            console.log('Ошибка: Данные для синхронизации отсутствуют');
            return null;
          }
        });
    }
  };

  Lampa.Storage.listener.follow('change', function (event) {
    syncManager.handleStorageChange(event);
  });

  Lampa.Settings.listener.follow('open', function (event) {
    if (event.name === 'acc') {
      var token = localStorage.getItem('token');
      if (token) {
        syncManager.loadDataFromServer(token)
          .then(function (data) {
            if (data) {
              syncManager.updateLocalStorage(data);
            } else {
              console.error('Не удалось загрузить данные для синхронизации');
            }
          })
          .catch(function (error) {
            console.error('Ошибка при загрузке данных:', error);
          });
      } else {
        console.log('Вы не зашли в аккаунт');
      }
    }
  });

  /*Lampa.Storage.listener.follow('change', function (event) {
    var name = event.name;
    if (name === 'token') {
      var token = localStorage.getItem('token');
      if (token) {
        syncManager.startSync(token);
      }
    } else if (name === 'acc_sync') {
      if (event.value === 'true') {
        var token = localStorage.getItem('token');
        if (token) {
          syncManager.startSync(token);
        } else {
          console.log('Вы не зашли в аккаунт');
          
          if (Lampa.Storage.field('acc_sync')) {
            Lampa.Storage.set('acc_sync', false);
            Lampa.Settings.update();
          }
        }
      }
    }
  });*/
})();
