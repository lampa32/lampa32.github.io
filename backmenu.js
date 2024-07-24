(function () {
    'use strict';

    
function main(){

     var trigger_on = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/></svg>'
     var trigger_off = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#F44336"/></svg>'
     
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
                                               description: 'Нажмите для выбора',
                                               type: 'toggle',
                                               icon: {
                                                     on: trigger_on,
                                                     off: trigger_off
                                               },
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
        title: 'Закрыть приложение'
      });
   }
 
  if(localStorage.getItem('reboot') !== '1') {
      menu.push({
        title: 'Перезагрузить'
      });
  }
        
  if(localStorage.getItem('youtube') !== '1') {
       menu.push({
            title: 'YouTube'
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
          
          if (a.title == 'Выход') closeApp();
          if (a.title == 'Перезагрузить') location.reload();
          if (a.title == 'YouTube') window.location.href = 'https://youtube.com/tv';
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
