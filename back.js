(function () {
    'use strict';
    Lampa.Platform.tv();

    if (!Lampa.Lang) {
        var lang_data = {};
        Lampa.Lang = {
          add: function add(data) {
            lang_data = data;
          },
          translate: function translate(key) {
            return lang_data[key] ? lang_data[key].ru : key;
          }
        };
      }

      Lampa.Lang.add({
        online_nolink: {
          ru: 'Не удалось извлечь ссылку',
          uk: 'Неможливо отримати посилання',
          en: 'Failed to fetch link'
        },
        online_waitlink: {
          ru: 'Работаем над извлечением ссылки, подождите...',
          uk: 'Працюємо над отриманням посилання, зачекайте...',
          en: 'Working on extracting the link, please wait...'
        },
        online_balanser: {
          ru: 'Балансер',
          uk: 'Балансер',
          en: 'Balanser'
        },
        helper_online_file: {
          ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
          uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
          en: 'Hold the "OK" key to bring up the context menu'
        },
        online_query_start: {
          ru: 'По запросу',
          uk: 'На запит',
          en: 'On request'
        },
        online_query_end: {
          ru: 'нет результатов',
          uk: 'немає результатів',
          en: 'no results'
        },
        title_online: {
          ru: 'Онлайн',
          uk: 'Онлайн',
          en: 'Online'
        },
        title_filmix: {
          ru: 'Filmix',
          uk: 'Filmix',
          en: 'Filmix',
        },
        title_proxy: {
          ru: 'Прокси',
          uk: 'Проксі',
          en: 'Proxy'
        },
        online_proxy_title: {
          ru: 'Основной прокси',
          uk: 'Основний проксі',
          en: 'Main proxy'
        },
        online_proxy_descr: {
          ru: 'Будет использоваться для всех балансеров',
          uk: 'Використовуватиметься для всіх балансерів',
          en: 'Will be used for all Balansers'
        },
        online_proxy_placeholder: {
          ru: 'Например: http://proxy.com',
          uk: 'Наприклад: http://proxy.com',
          en: 'For example: http://proxy.com'
        },
        filmix_param_add_title: {
          ru: 'Добавить ТОКЕН от Filmix',
          uk: 'Додати ТОКЕН від Filmix',
          en: 'Add TOKEN from Filmix'
        },
        filmix_param_add_descr: {
          ru: 'Добавьте ТОКЕН для подключения подписки',
          uk: 'Додайте ТОКЕН для підключення передплати',
          en: 'Add a TOKEN to connect a subscription'
        },
        filmix_param_placeholder: {
          ru: 'Например: nxjekeb57385b..',
          uk: 'Наприклад: nxjekeb57385b..',
          en: 'For example: nxjekeb57385b..'
        },
        filmix_param_add_device: {
          ru: 'Добавить устройство на Filmix',
          uk: 'Додати пристрій на Filmix',
          en: 'Add Device to Filmix'
        },
        filmix_modal_text: {
          ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
          uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
          en: 'Enter it at https://filmix.ac/consoles in your authorized account!'
        },
        filmix_modal_wait: {
          ru: 'Ожидаем код',
          uk: 'Очікуємо код',
          en: 'Waiting for the code'
        },
        filmix_copy_secuses: {
          ru: 'Код скопирован в буфер обмена',
          uk: 'Код скопійовано в буфер обміну',
          en: 'Code copied to clipboard'
        },
        filmix_copy_fail: {
          ru: 'Ошибка при копировании',
          uk: 'Помилка при копіюванні',
          en: 'Copy error'
        },
        filmix_nodevice: {
          ru: 'Устройство не авторизовано',
          uk: 'Пристрій не авторизований',
          en: 'Device not authorized'
        },
        title_status: {
          ru: 'Статус',
          uk: 'Статус',
          en: 'Status'
        },
        online_voice_subscribe: {
          ru: 'Подписаться на перевод',
          uk: 'Підписатися на переклад',
          en: 'Subscribe to translation'
        },
        online_voice_success: {
          ru: 'Вы успешно подписались',
          uk: 'Ви успішно підписалися',
          en: 'You have successfully subscribed'
        },
        online_voice_error: {
          ru: 'Возникла ошибка',
          uk: 'Виникла помилка',
          en: 'An error has occurred'
        },
      });

Lampa.SettingsApi.addParam({
        component: 'add_acc',
        param: {
          name: 'pva_backup',
          type: 'static', //доступно select,input,trigger,title,static
          default: ''
        },
        field: {
          name: Lampa.Lang.translate('settings_cub_backup'),
          description: 'Бэкап настроек для профиля, требуется аккаут CUB'
        },
        onRender: function (item) {
          item.on('hover:enter', function () {          
            /*var account = Lampa.Storage.get('account', '{}');
            if (account.id && account.profile.id) {*/
            var token = localStorage.getItem('token');
            if (token) {
              Lampa.Select.show({
                title: Lampa.Lang.translate('settings_cub_backup'),
                items: [{
                  title: Lampa.Lang.translate('settings_cub_backup_export'),
                  "export": true,
                  selected: true
                }, {
                  title: Lampa.Lang.translate('settings_cub_backup_import'),
                  "import": true
                }, {
                  title: Lampa.Lang.translate('cancel')
                }],
                onSelect: function onSelect(a) {
                  if (a["export"]) {
                    Lampa.Select.show({
                      title: Lampa.Lang.translate('sure'),
                      items: [{
                        title: Lampa.Lang.translate('confirm'),
                        "export": true,
                        selected: true
                      }, {
                        title: Lampa.Lang.translate('cancel')
                      }],
                      onSelect: function onSelect(a) {
                        if (a["export"]) {
                         // var url = 'http://212.113.103.137:3000/lampa/backup/export' // + '?id=' + encodeURIComponent(account.id) + '&profile=' + encodeURIComponent(account.profile.id) + '&email=' + encodeURIComponent(account.email);
                          var url = 'http://212.113.103.137:3000/lampa/backup/export?token=' + encodeURIComponent(token);
                          var file = new File([JSON.stringify(localStorage)], "backup.json", { type: "text/plain" });
                          var formData = new FormData();
                          formData.append("file", file);
                          $.ajax({
                            url: url,
                            type: 'POST',
                            data: formData,
                            async: true,
                            cache: false,
                            contentType: false,
                            enctype: 'multipart/form-data',
                            processData: false,
                            success: function success(result) {
                              if (result.result) {
                                Lampa.Noty.show(Lampa.Lang.translate('account_export_secuses'));
                              } else Lampa.Noty.show(Lampa.Lang.translate('account_export_fail'));
                            },
                            error: function error() {
                              Lampa.Noty.show(Lampa.Lang.translate('account_export_fail'));
                            }
                          });
                        }
                        Lampa.Controller.toggle('settings_component');
                      },
                      onBack: function onBack() {
                        Lampa.Controller.toggle('settings_component');
                      }
                    });

                  } else if (a["import"]) {
                    //var url = 'http://212.113.103.137:3000/lampa/backup/import'// + '?id=' + encodeURIComponent(account.id) + '&profile=' + encodeURIComponent(account.profile.id) + '&email=' + encodeURIComponent(account.email);
                   var url = 'http://212.113.103.137:3000/lampa/backup/import?token=' + encodeURIComponent(token);
                      $.ajax({
                      url: url,
                      type: 'GET',
                      async: true,
                      cache: false,
                      contentType: false,
                      enctype: 'application/x-www-form-urlencoded',
                      processData: false,
                      // headers: { token: account.token },
                      success: function success(result) {
                        if (result.result) {
                          if (result.data) {
                            var data = Lampa.Arrays.decodeJson(result.data, {});
                            var keys = Lampa.Arrays.getKeys(data);
                            for (var i in data) {
                              localStorage.setItem(i, data[i]);
                            }
                            Lampa.Noty.show(Lampa.Lang.translate('account_import_secuses') + ' - ' + Lampa.Lang.translate('account_imported') + ' (' + keys.length + ') - ' + Lampa.Lang.translate('account_reload_after'));
                            setTimeout(function () {
                              window.location.reload();
                            }, 5000);
                          } else Lampa.Noty.show(Lampa.Lang.translate('nodata'));
                        } else Lampa.Noty.show(Lampa.Lang.translate('account_import_fail'));
                      },
                      error: function error() {
                        Lampa.Noty.show(Lampa.Lang.translate('account_import_fail'));
                      }
                    });
                    Lampa.Controller.toggle('settings_component');
                  } else {
                    Lampa.Controller.toggle('settings_component');
                  }
                },
                onBack: function onBack() {
                  Lampa.Controller.toggle('settings_component');
                }
              });
            }
          })
        }
      });
   })();
