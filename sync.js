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
      if (value == 'true') {
        var token = localStorage.getItem('token');
        if (token) {
          startSync();
        } else {
          Lampa.Noty.show("Вы не зашли в аккаунт");
          if (Lampa.Storage.field('acc_sync') == true) {
            Lampa.Storage.set('acc_sync', false);
            Lampa.Settings.update();
          }
        }
      }
    }
  });

  function startSync() {
    // Получаем данные для синхронизации
    const syncData = {
      torrents_view: Lampa.Storage.get('torrents_view', '[]'),
      plugins: Lampa.Storage.get('plugins', '[]'),
      favorite: Lampa.Storage.get('favorite', '{}'),
      file_view: Lampa.Storage.get('file_view', '{}'),
      setting_member: Lampa.Storage.get('setting_member', '[]')
    };

    // Отправляем данные на сервер
    $.ajax({
      url: 'http://212.113.103.137:3003/lampa/sync',
      type: 'POST',
      data: JSON.stringify(syncData),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (result) {
        if (result.success) {
          console.log('Синхронизация успешна');
        } else {
          console.log('Синхронизация не удалась');
        }
      },
      error: function () {
        console.log('Синхронизация не удалась');
      }
    });
  }

  if (Lampa.Storage.field('acc_sync')) {
    // Загрузка данных с сервера
    $.ajax({
      url: 'http://212.113.103.137:3003/lampa/sync',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      success: function (result) {
        if (result.success) {
          // Записываем данные из ответа в localStorage
          Lampa.Storage.set('torrents_view', result.data.torrents_view);
          Lampa.Storage.set('plugins', result.data.plugins);
          Lampa.Storage.set('favorite', result.data.favorite);
          Lampa.Storage.set('file_view', result.data.file_view);
          Lampa.Storage.set('setting_member', result.data.setting_member);
        }
      },
      error: function () {
        console.log('Синхронизация не удалась');
      }
    });
  }
})();
