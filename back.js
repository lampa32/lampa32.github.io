(function () {
    'use strict';
   

Lampa.SettingsApi.addParam({
        component: 'acc',
        param: {
          name: 'acc_backup',
          type: 'static', //доступно select,input,trigger,title,static
          default: ''
        },
        field: {
          name: Lampa.Lang.translate('settings_cub_backup'),
          description: 'Бэкап настроек для профиля, требуется зайти в аккаунт'
        },
        onRender: function (item) {
          item.on('hover:enter', function () {          
           
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
                          //var token = localStorage.getItem('token');
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
            } else {
                Lampa.Noty.show("Вы не зашли в аккаунт");
            }
          })
        }
      });
   })();
