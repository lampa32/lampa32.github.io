(function () {
    'use strict';

    
function main(){

   Lampa.Storage.listener.follow('change', function (e) {});
                Lampa.Settings.listener.follow('open', function (e) {
                   if (e.name == 'more') {
                     Lampa.SettingsApi.addComponent({
                        component: 'back_menu',
                        name: 'BackMenu'
                     });
                  }
                  Lampa.Settings.main().update();
                  Lampa.Settings.main().render().find('[data-component="back_menu"]').addClass('hide');
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
                               onChange: function (value) {
                                   if (value == '1') {
            
                                   }
                                   if (value == '2') {
            
                                   }
                               }
                               
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
     
      menu.push({
        title: 'Выход'
      });

      menu.push({
        title: 'Перезагрузить'
      });
   if(Lampa.Storage.field('youtube') !== '1') {
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
