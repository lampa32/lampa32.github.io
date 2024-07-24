(function () {
    'use strict';

    
function main(){

    var exit = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div><div style="font-size:1.3em">Закрыть приложение</div></div>'
    var youtube = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49614 7.13176C9.18664 6.9549 8.80639 6.95617 8.49807 7.13509C8.18976 7.31401 8 7.64353 8 8V16C8 16.3565 8.18976 16.686 8.49807 16.8649C8.80639 17.0438 9.18664 17.0451 9.49614 16.8682L16.4961 12.8682C16.8077 12.6902 17 12.3589 17 12C17 11.6411 16.8077 11.3098 16.4961 11.1318L9.49614 7.13176ZM13.9844 12L10 14.2768V9.72318L13.9844 12Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 8.25027 0 6.3754 0.954915 5.06107C1.26331 4.6366 1.6366 4.26331 2.06107 3.95491C3.3754 3 5.25027 3 9 3H15C18.7497 3 20.6246 3 21.9389 3.95491C22.3634 4.26331 22.7367 4.6366 23.0451 5.06107C24 6.3754 24 8.25027 24 12C24 15.7497 24 17.6246 23.0451 18.9389C22.7367 19.3634 22.3634 19.7367 21.9389 20.0451C20.6246 21 18.7497 21 15 21H9C5.25027 21 3.3754 21 2.06107 20.0451C1.6366 19.7367 1.26331 19.3634 0.954915 18.9389C0 17.6246 0 15.7497 0 12ZM9 5H15C16.9194 5 18.1983 5.00275 19.1673 5.10773C20.0989 5.20866 20.504 5.38448 20.7634 5.57295C21.018 5.75799 21.242 5.98196 21.4271 6.23664C21.6155 6.49605 21.7913 6.90113 21.8923 7.83269C21.9973 8.80167 22 10.0806 22 12C22 13.9194 21.9973 15.1983 21.8923 16.1673C21.7913 17.0989 21.6155 17.504 21.4271 17.7634C21.242 18.018 21.018 18.242 20.7634 18.4271C20.504 18.6155 20.0989 18.7913 19.1673 18.8923C18.1983 18.9973 16.9194 19 15 19H9C7.08058 19 5.80167 18.9973 4.83269 18.8923C3.90113 18.7913 3.49605 18.6155 3.23664 18.4271C2.98196 18.242 2.75799 18.018 2.57295 17.7634C2.38448 17.504 2.20866 17.0989 2.10773 16.1673C2.00275 15.1983 2 13.9194 2 12C2 10.0806 2.00275 8.80167 2.10773 7.83269C2.20866 6.90113 2.38448 6.49605 2.57295 6.23664C2.75799 5.98196 2.98196 5.75799 3.23664 5.57295C3.49605 5.38448 3.90113 5.20866 4.83269 5.10773C5.80167 5.00275 7.08058 5 9 5Z" fill="#ffffff"></path> </g></svg></div><div style="font-size:1.3em">YouTube</div></div>'

    
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
