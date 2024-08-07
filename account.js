(function () {
    'use strict';

function start_plugin_account() {
	
    var botElement = $('<div class="myBot" style="line-height: 1;color: #ffffff;font-family: &quot;SegoeUI&quot;, sans-serif;font-size: 10.6px;box-sizing: border-box;outline: none;user-select: none;display: flex;-webkit-box-align: start;align-items: flex-start;position: relative;background-color: rgba(255, 255, 255, 0.1);border-radius: 0.3em;margin: 1.5em 2em;">' +
    '<div class="ad-server__text">' +
    'Нужный тебе текст' +
    '</div><div class="ad-server__label">' + 
    'https://bot.us' +
    //'</div><img src="http://193.233.134.21/bot/bot.png" class="ad-server__qr"></div>')
    '</div><img src="http://79.137.204.8/qr.png" class="ad-server__qr"></div>')
    Lampa.SettingsApi.addComponent({
            component: 'acc',
            name: 'Аккаунт'
            //icon: icon_server_redirect
   });
    
	Lampa.Settings.listener.follow('open', function (e) {
            /*if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'acc',
                    name: 'Аккаунт'
                });
            }*/
            if (e.name == 'acc') {
		    $('div[data-name="acc_auth"]').before(botElement);
		//$('div > span:contains("Авторизация")').before(botElement);
		   if (localStorage.getItem('token') !== null) {
	                $('div[data-name="acc_auth"]').hide();
			   var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(4)")
                           Lampa.Controller.focus(M)
                           Lampa.Controller.toggle('settings_component')
                  } else {
			$('div > span:contains("Аккаунт")').hide();
			$('.settings-param > div:contains("Выйти")').hide();
		  }
	    }
      });

      Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_title_auth',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Авторизация',
				description: ''
                                },
			    });

    
    Lampa.SettingsApi.addParam({
  component: 'acc',
  param: {
    name: 'acc_auth',
    type: 'input',
    values: '',
    placeholder: 'Введите token',
    default: ''
  },
  field: {
    name: 'Выполнить вход',
    description: ''
  },
  onChange: function(value) {    
    console.log('Введенный токен:', value);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://212.113.103.137:3001/checkToken', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log('Ответ сервера:', response);
        if (response.userId) {
          console.log('Токен действителен');
          localStorage.setItem('token', value);
	  Lampa.Noty.show("Токен действителен");
	  //clo();
	  $('div[data-name="acc_auth"]').hide();
	  Lampa.Settings.update();
	  var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(4)")
          Lampa.Controller.focus(M)
          Lampa.Controller.toggle('settings_component')		
        } else {
          console.log('Токен недействителен');
          localStorage.removeItem('token');
	  Lampa.Noty.show("Токен недействителен");
        }
      }
    };
    xhr.send(JSON.stringify({ token: value }));
  }
  
});
                    // function clo() {  
	             // var token = localStorage.getItem('token');
                     //  if (token) {
                          Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_status',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                               // name: 'Вы авторизированы. Ваш токен: ' + token + ' ',
				name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.3em;height:1.3em;padding-right:.1em"><!-- icon666.com - MILLIONS vector ICONS FREE --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#1E0478;" d="M334.975,0c95.414,0,173.046,77.632,173.046,173.046c0,95.426-77.632,173.046-173.046,173.046 c-21.224,0-41.843-3.771-61.415-11.224l-40.128,40.128c-2.358,2.358-5.574,3.695-8.916,3.695h-27.139v27.126 c0,6.974-5.65,12.611-12.611,12.611h-12.359v12.359c0,6.974-5.65,12.611-12.611,12.611h-30.833v30.884 c0,3.342-1.337,6.558-3.708,8.916l-25.146,25.108C97.753,510.676,94.55,512,91.208,512H16.59c-6.961,0-12.611-5.65-12.611-12.611 v-90.546c0-3.342,1.337-6.558,3.695-8.916l165.467-165.479c-7.44-19.572-11.211-40.191-11.211-61.402 C161.929,77.632,239.549,0,334.975,0z M482.8,173.046c0-81.504-66.32-147.824-147.824-147.824 c-81.516,0-147.824,66.32-147.824,147.824c0,20.644,4.162,40.607,12.371,59.334c2.131,4.843,0.958,10.303-2.522,13.872 c-0.038,0.038-0.063,0.076-0.101,0.113L29.2,414.064v22.788l138.089-138.089c4.439-4.426,11.615-4.426,16.054,0 c4.426,4.439,4.426,11.615,0,16.054L29.2,468.959v17.819h56.787l17.756-17.731v-38.261c0-6.961,5.65-12.611,12.611-12.611h30.833 v-12.359c0-6.961,5.65-12.611,12.611-12.611h12.359V366.08c0-6.974,5.65-12.611,12.611-12.611h34.528l42.347-42.36 c0.038-0.038,0.076-0.063,0.113-0.101c3.581-3.481,9.029-4.653,13.872-2.522c18.74,8.222,38.703,12.384,59.347,12.384 C416.479,320.87,482.8,254.562,482.8,173.046z"/><path style="fill:#9B8CCC;" d="M334.975,25.222c81.504,0,147.824,66.32,147.824,147.824c0,81.516-66.32,147.824-147.824,147.824 c-20.644,0-40.607-4.162-59.347-12.384c-4.843-2.131-10.29-0.958-13.872,2.522c-0.038,0.038-0.076,0.063-0.113,0.101l-42.347,42.36 h-34.528c-6.961,0-12.611,5.637-12.611,12.611v27.126h-12.359c-6.961,0-12.611,5.65-12.611,12.611v12.359h-30.833 c-6.961,0-12.611,5.65-12.611,12.611v38.261l-17.756,17.731H29.2v-17.819l154.142-154.142c4.426-4.439,4.426-11.615,0-16.054 c-4.439-4.426-11.615-4.426-16.054,0L29.2,436.852v-22.788l167.699-167.699c0.038-0.038,0.063-0.076,0.101-0.113 c3.481-3.569,4.653-9.029,2.522-13.872c-8.21-18.727-12.371-38.69-12.371-59.334C187.151,91.542,253.459,25.222,334.975,25.222z M434.866,120.383c0-26.041-21.186-47.24-47.228-47.24c-26.054,0-47.24,21.199-47.24,47.24s21.186,47.24,47.24,47.24 C413.68,167.623,434.866,146.424,434.866,120.383z"/><path style="fill:#1E0478;" d="M387.638,73.143c26.041,0,47.228,21.199,47.228,47.24s-21.186,47.24-47.228,47.24 c-26.054,0-47.24-21.199-47.24-47.24S361.584,73.143,387.638,73.143z M409.644,120.383c0-12.144-9.874-22.019-22.006-22.019 c-12.144,0-22.018,9.874-22.018,22.019s9.874,22.019,22.018,22.019C399.77,142.402,409.644,132.527,409.644,120.383z"/><path style="fill:#FFFFFF;" d="M387.638,98.365c12.132,0,22.006,9.874,22.006,22.019s-9.874,22.019-22.006,22.019 c-12.144,0-22.019-9.874-22.019-22.019S375.494,98.365,387.638,98.365z"/></svg></div><div style="font-size:1.1em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;color: white;"><div style="line-height: 0.3;">Аккаунт подключен</div></div></div></div></div>',
					//'<div class="settings-folder" style="padding:0!important"><div style="width:1.3em;height:1.3em;padding-right:.1em"></div><div style="font-size:1.0em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;color: white;"><div style="line-height: 0.3;">Аккаунт подключен</div></div></div></div></div>',
                                
				description: ''
                                },
			    });

			   Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_exit',
                                type: 'static', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Выйти из аккаунта',
                                description: ''
                                },
				onRender: function(item) {
                                     item.on('hover:enter', function () {
                                         localStorage.removeItem('token');
					 //item.hide(); 
					 $('div[data-name="acc_exit"]').remove();
					 $('div[data-name="acc_auth"]').show();
					 $('div > span:contains("Аккаунт")').hide();
					var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(2)")
                                        Lampa.Controller.focus(M)
                                        Lampa.Controller.toggle('settings_component')	
					Lampa.Storage.set('acc_timecode', false);
					Lampa.Settings.update();
				     })
                               }
			    });
			
		        // }
		    // }
	//clo()

	Lampa.SettingsApi.addParam({
                                component: 'acc',
                                param: {
                                name: 'acc_title_auth',
                                type: 'title', //доступно select,input,trigger,title,static
                                
                                },
                                field: {
                                name: 'Синхронизация',
				description: ''
                                },
			    });

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

}
if (window.appready) start_plugin_account();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') {
                start_plugin_account();
            }
        });
    }

})();
