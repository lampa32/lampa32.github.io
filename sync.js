(function () {
  'use strict';
// Определение вспомогательных функций
function makeHttpRequest(method, url, data) {
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
}

function updateLocalStorage(data) {
  Lampa.Storage.set('torrents_view', JSON.stringify(data.torrents_view || []));
  Lampa.Storage.set('plugins', JSON.stringify(data.plugins || []));
  Lampa.Storage.set('favorite', JSON.stringify(data.favorite || {}));
  Lampa.Storage.set('file_view', JSON.stringify(data.file_view || {}));
}

function getLocalVersion() {
  var torrentsView = Lampa.Storage.get('torrents_view', '[]');
  var plugins = Lampa.Storage.get('plugins', '[]');
  var favorite = Lampa.Storage.get('favorite', '{}');
  var fileView = Lampa.Storage.get('file_view', '{}');

  var localVersion = (torrentsView + plugins + favorite + fileView).split('').reduce(function (a, b) {
    return a + b.charCodeAt(0);
  }, 0);
  return localVersion;
}

function sendDataToServer(token, data) {
  if (Object.keys(data).length === 0) {
    this.isSyncSuccessful = false;
    return Promise.reject(new Error('Данные для синхронизации отсутствуют'));
  }

  return makeHttpRequest('POST', 'http://212.113.103.137:3003/lampa/sync?token=' + encodeURIComponent(token), data)
    .then(function (response) {
      if (response.status === 200) {
        this.isSyncSuccessful = true;
        return JSON.parse(response.responseText);
      } else {
        this.isSyncSuccessful = false;
        throw new Error('Ошибка при синхронизации: ' + response.status + ' - ' + response.statusText);
      }
    }.bind(this))
    .then(function (result) {
      if (result.success) {
        updateLocalStorage(result.data);
      } else {
        this.isSyncSuccessful = false;
        throw new Error('Синхронизация не удалась');
      }
    }.bind(this));
}

function loadDataFromServer(token) {
  return makeHttpRequest('GET', 'http://212.113.103.137:3003/lampa/sync?token=' + encodeURIComponent(token))
    .then(function (response) {
      if (response.status === 200) {
        return JSON.parse(response.responseText);
      } else {
        throw new Error('Ошибка при загрузке данных: ' + response.status + ' - ' + response.statusText);
      }
    })
    .then(function (result) {
      if (result.success && result.data) {
        var localVersion = getLocalVersion();
        var serverVersion = result.version;

        if (serverVersion > localVersion) {
          updateLocalStorage(result.data);
          console.log('Данные успешно загружены с сервера (новая версия)');
        } else {
          console.log('Данные на сервере не новее, локальные данные актуальны');
        }

        return result.data;
      } else {
        console.error('Ошибка: Данные для синхронизации отсутствуют');
        return null;
      }
    }.bind(this));
}

function handleStorageChange(event) {
  var key = event.name;
  if (interestingKeys.indexOf(key) !== -1) {
    console.log('Изменен ключ в локальном хранилище: ' + key);
    if (Lampa.Storage.field('acc_sync')) {
      this.needsSync = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function () {
        if (this.needsSync) {
          var token = localStorage.getItem('token');
          
          if (token) {
            var data = this.getSyncedData();
            data.version = getLocalVersion() + 1;
            sendDataToServer(token, data);
          }
          this.needsSync = false;
        }
      }.bind(this), 2000);
    }
  }
}

function getSyncedData() {
  return {
    torrents_view: JSON.parse(Lampa.Storage.get('torrents_view', '[]')),
    plugins: JSON.parse(Lampa.Storage.get('plugins', '[]')),
    favorite: JSON.parse(Lampa.Storage.get('favorite', '{}')),
    file_view: JSON.parse(Lampa.Storage.get('file_view', '{}'))
  };
}

// Использование функций в обработчике настроек
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
        loadDataFromServer(token)
          .then(function (data) {
            if (data) {
              console.log('Данные успешно загружены с сервера');
            } else {
              Lampa.Noty.show('Не удалось загрузить данные с сервера');
            }
          })
          .catch(function (error) {
            console.error('Ошибка загрузки данных с сервера:', error);
            Lampa.Noty.show('Не удалось загрузить данные с сервера');
          });
        handleStorageChange({ name: 'torrents_view' });
        handleStorageChange({ name: 'plugins' });
        handleStorageChange({ name: 'favorite' });
        handleStorageChange({ name: 'file_view' });
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
})()
