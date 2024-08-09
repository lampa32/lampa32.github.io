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

    function processTorrentsView(data) {
  if (Array.isArray(data) && data.length > 0) {
    console.log('Данные для "torrents_view":', data);
    Lampa.Storage.set('torrents_view', data);
  } else {
    console.log('Ошибка: Данные для ключа "torrents_view" некорректны или отсутствуют');
    return false;
  }
  return true;
}

function processPlugins(data) {
  if (Array.isArray(data) && data.length > 0) {
    console.log('Данные для "plugins":', data);
    Lampa.Storage.set('plugins', data);
  } else {
    console.log('Ошибка: Данные для ключа "plugins" некорректны или отсутствуют');
    return false;
  }
  return true;
}

function processFavorite(data) {
  if (typeof data === 'object' && Object.keys(data).length > 0) {
    if (Array.isArray(data.card) && data.card.length > 0 &&
        Array.isArray(data.like) &&
        Array.isArray(data.wath) &&
        Array.isArray(data.book) &&
        Array.isArray(data.history)) {
      console.log('Данные для "favorite":', data);
      Lampa.Storage.set('favorite', data);
    } else {
      console.log('Ошибка: Данные для ключа "favorite" имеют некорректную структуру');
      return false;
    }
  } else {
    console.log('Ошибка: Данные для ключа "favorite" некорректны или отсутствуют');
    return false;
  }
  return true;
}

function processFileView(data) {
  if (typeof data === 'object' && Object.keys(data).length > 0) {
    let isFileViewValid = true;
    for (let key in data) {
      if (typeof data[key] !== 'object' || Object.keys(data[key]).length === 0) {
        isFileViewValid = false;
        console.log(`Ошибка: Данные для ключа "file_view.${key}" некорректны`);
        break;
      }
    }
    if (isFileViewValid) {
      console.log('Данные для "file_view":', data);
      Lampa.Storage.set('file_view', data);
    } else {
      console.log('Ошибка: Данные для ключа "file_view" имеют некорректную структуру');
      return false;
    }
  } else {
    console.log('Ошибка: Данные для ключа "file_view" некорректны или отсутствуют');
    return false;
  }
  return true;
}
  updateLocalStorage: function (data) {
  console.log('Обновление локального хранилища:', data);
  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    let isDataValid = true;
    if (!processTorrentsView(data.torrents_view)) {
      isDataValid = false;
    }
    if (!processPlugins(data.plugins)) {
      isDataValid = false;
    }
    if (!processFavorite(data.favorite)) {
      isDataValid = false;
    }
    if (!processFileView(data.file_view)) {
      isDataValid = false;
    }
    if (isDataValid) {
      console.log('Локальное хранилище успешно обновлено');
    } else {
      console.log('Ошибка: Данные для синхронизации некорректны или отсутствуют');
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
             console.log('Данные, полученные с сервера:', data);
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
        Lampa.Noty.show('Вы не зашли в аккаунт');
      }
    }
  });

  Lampa.Storage.listener.follow('change', function (event) {
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
