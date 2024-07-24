(function () {
    'use strict';

    
function main(){

    var exit = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div><div style="font-size:1.3em">Закрыть приложение</div></div>'
    var youtube = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="1.536"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M43.1124,14.394a5.0056,5.0056,0,0,0-3.5332-3.5332c-2.3145-.8936-24.7326-1.3314-31.2358.0256A5.0059,5.0059,0,0,0,4.81,14.42c-1.0446,4.583-1.1239,14.4914.0256,19.1767A5.006,5.006,0,0,0,8.369,37.13c4.5829,1.0548,26.3712,1.2033,31.2358,0a5.0057,5.0057,0,0,0,3.5332-3.5333C44.2518,28.6037,44.3311,19.31,43.1124,14.394Z"></path><path class="a" d="M30.5669,23.9952,20.1208,18.004V29.9863Z"></path></g></svg></div><div style="font-size:1.3em">YouTube</div></div>'

    
    Lampa.Storage.listener.follow('change', function (e) {});
                Lampa.Settings.listener.follow('open', function (e) {
                   if (e.name == 'main') {
                     Lampa.SettingsApi.addComponent({
                        component: 'back_menu',
                        name: 'BackMenu'
                     });
                     setTimeout(function() {
                         $('div[data-component="back_menu"]').remove();
                     }, 0)
                  }
       });
                Lampa.SettingsApi.addParam({
                         component: 'more',
                         param: {
                                 name: 'back_menu',
                                 type: 'static',
                                 default: true
                         },
                         field: {
                                 name: 'Меню Выхода'
                         },
                         onRender: function(item) {
                               item.on('hover:enter', function () {
                                  Lampa.Settings.create('back_menu');
                                  Lampa.Controller.enabled().controller.back = function(){
                                  Lampa.Settings.create('more');
                }
                               });
                         }
        });


        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'exit',
                                       type: 'trigger',
                       /*values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },*/
                                       default: true
                                       },
                                       field: {
                                               name: 'Закрыть приложение',
                                               description: 'Нажмите для выбора'
                                       },         
        });
    
        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'reboot',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
                                       },
                                       field: {
                                               name: 'Перезагрузить',
                                               description: 'Нажмите для выбора'
                               },         
        });

        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'youtube',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'YouTube',
                                               description: 'Нажмите для выбора'
                               },         
        });
    
    var server_protocol = location.protocol === "https:" ? 'https://' : 'http://'
   
    function showServerInput() {
      Lampa.Input.edit({
          title: "Укажите Сервер",
          value: '',
          free: true       
      }, function (value) {
          if (value !== '') {
          window.location.href = server_protocol + value;
           }
          else {
            showMeExitMenu();
          }
      })
    }

    function closeApp() {
        if (Lampa.Platform.is('apple_tv')) window.location.assign('exit://exit');
        if (Lampa.Platform.is("tizen")) tizen.application.getCurrentApplication().exit();
        if (Lampa.Platform.is("webos")) window.close();
        if (Lampa.Platform.is("android")) Lampa.Android.exit();
        if (Lampa.Platform.is("orsay")) Lampa.Orsay.exit();
        if (Lampa.Platform.is("nw")) nw.Window.get().close();
        if (Lampa.Platform.is('netcast')) window.NetCastBack();
        if (Lampa.Platform.is('browser')) window.close();
    }

    function showMeExitMenu() {
      var enabled = Lampa.Controller.enabled().name;
      var menu = [];

   if(localStorage.getItem('exit') !== '1') {
      menu.push({
        title: exit//'Закрыть приложение',
      });
   }
 
  if(localStorage.getItem('reboot') !== '1') {
      menu.push({
        title: 'Перезагрузить'
      });
  }
        
  if(localStorage.getItem('youtube') !== '1') {
       menu.push({
            title: youtube
      });
   }

      menu.push({
        title: 'Сменить адрес'
      });
      
      Lampa.Select.show({
        title: 'Выход ', // пробел обязателен, чтобы отделить событие от оригинального меню
        items: menu,
        onBack: function onBack() { 
         
         Lampa.Controller.toggle('content');
        },
        onSelect: function onSelect(a) {
          
          if (a.title == exit) closeApp();
          if (a.title == 'Перезагрузить') location.reload();
          if (a.title == youtube) window.location.href = 'https://youtube.com/tv';
          if (a.title == 'Сменить адрес') showServerInput();    
          
        }
      })
    }
    
    Lampa.Controller.listener.follow('toggle', function(e) {
      if (e.name == 'select' && $('.selectbox__title').text() == Lampa.Lang.translate('title_out')) {
        Lampa.Select.hide();
        setTimeout(function() {
          showMeExitMenu()
        },100);
      };
    })

  } // завершаем main

    if (window.appready) main();
    else {
        Lampa.Listener.follow('app', function(e) {
          if (e.type == 'ready') main();
        });
    }  
})()
