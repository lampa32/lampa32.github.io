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
          startSync(token);
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

  let timer;

  function startSync(token) {
    // Получаем данные для синхронизации
    const syncData = getSyncedData();

    // Отправляем данные на сервер
    sendDataToServer(token, syncData)
      .then(() => {
        console.log('Синхронизация успешна');
        updateLocalStorage(syncData);
      })
      .catch(() => {
        console.log('Синхронизация не удалась');
      });
  }

  function getSyncedData() {
    return {
      torrents_view: Lampa.Storage.get('torrents_view', '[]'),
      plugins: Lampa.Storage.get('plugins', '[]'),
      favorite: Lampa.Storage.get('favorite', '{}'),
      file_view: Lampa.Storage.get('file_view', '{}')
    };
  }

  function sendDataToServer(token, data) {
    return fetch(`http://212.113.103.137:3003/lampa/sync?token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (!result.success) {
        throw new Error('Синхронизация не удалась');
      }
    });
  }

  function loadDataFromServer(token) {
    return fetch(`http://212.113.103.137:3003/lampa/sync?token=${encodeURIComponent(token)}`)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          return result.data;
        } else {
          throw new Error('Синхронизация не удалась');
        }
      });
  }

  function updateLocalStorage(data) {
    Lampa.Storage.set('torrents_view', data.torrents_view);
    Lampa.Storage.set('plugins', data.plugins);
    Lampa.Storage.set('favorite', data.favorite);
    Lampa.Storage.set('file_view', data.file_view);
  }

  // Регистрируем события для отслеживания изменений
 const interestingKeys = ['torrents_view', 'plugins', 'favorite', 'file_view'];

Lampa.Storage.listener.follow('change', function(event) {
  const key = event.name;
  if (interestingKeys.includes(key)) {
    console.log(`Изменен ключ в локальном хранилище: ${key}`);

    let timer = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      const token = localStorage.getItem('token');
      if (token) {
        startSync(token);
      }
    }, 500);
  }
});



  Lampa.Settings.listener.follow('open', function(event) {
    if (event.name === 'acc') {
      const token = localStorage.getItem('token');
      if (token) {
        loadDataFromServer(token)
          .then(updateLocalStorage)
          .catch(() => {
            console.log('Синхронизация не удалась');
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
        startSync(token);
      }
    } else if (name === 'acc_sync') {
      if (event.value === 'true') {
        const token = localStorage.getItem('token');

        if (token) {
          startSync(token);
        }
      } else {
        clearTimeout(timer);
      }
    }
  });

  // Загрузка данных с сервера при открытии настроек
  if (Lampa.Storage.field('acc_sync')) {
    const token = localStorage.getItem('token');
    if (!token) {
      Lampa.Noty.show('Вы не зашли в аккаунт');
      return;
    }

    loadDataFromServer(token)
      .then(updateLocalStorage)
      .catch(() => {
        console.log('Синхронизация не удалась');
      });
  }
})();
