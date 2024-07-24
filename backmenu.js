(function () {
    'use strict';

    
function main(){

    var exit = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div><div style="font-size:1.3em">Закрыть приложение</div></div>'
    var reboot = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g style="fill:none;stroke:#ffffff;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;"> <path d="m 50,10 0,35"></path> <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path> </g> <path style="fill:#ffffff;" d="m 2,21 29,-2 2,29"></path> </g></svg></div><div style="font-size:1.3em">Перезагрузить</div></div>'
    var switch_server = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 3.75C10.4142 3.75 10.75 3.41421 10.75 3C10.75 2.58579 10.4142 2.25 10 2.25V3.75ZM14 2.25C13.5858 2.25 13.25 2.58579 13.25 3C13.25 3.41421 13.5858 3.75 14 3.75V2.25ZM13 21.75C13.4142 21.75 13.75 21.4142 13.75 21C13.75 20.5858 13.4142 20.25 13 20.25V21.75ZM3.17157 19.8284L3.7019 19.2981H3.7019L3.17157 19.8284ZM20.8284 4.17157L20.2981 4.7019V4.7019L20.8284 4.17157ZM21.25 13C21.25 13.4142 21.5858 13.75 22 13.75C22.4142 13.75 22.75 13.4142 22.75 13H21.25ZM14 12.75C14.4142 12.75 14.75 12.4142 14.75 12C14.75 11.5858 14.4142 11.25 14 11.25V12.75ZM18 11.25C17.5858 11.25 17.25 11.5858 17.25 12C17.25 12.4142 17.5858 12.75 18 12.75V11.25ZM2.75 13V12H1.25V13H2.75ZM2.75 12V11H1.25V12H2.75ZM13 20.25H10V21.75H13V20.25ZM21.25 11V12H22.75V11H21.25ZM1.25 13C1.25 14.8644 1.24841 16.3382 1.40313 17.489C1.56076 18.6614 1.89288 19.6104 2.64124 20.3588L3.7019 19.2981C3.27869 18.8749 3.02502 18.2952 2.88976 17.2892C2.75159 16.2615 2.75 14.9068 2.75 13H1.25ZM10 20.25C8.09318 20.25 6.73851 20.2484 5.71085 20.1102C4.70476 19.975 4.12511 19.7213 3.7019 19.2981L2.64124 20.3588C3.38961 21.1071 4.33855 21.4392 5.51098 21.5969C6.66182 21.7516 8.13558 21.75 10 21.75V20.25ZM14 3.75C15.9068 3.75 17.2615 3.75159 18.2892 3.88976C19.2952 4.02502 19.8749 4.27869 20.2981 4.7019L21.3588 3.64124C20.6104 2.89288 19.6614 2.56076 18.489 2.40313C17.3382 2.24841 15.8644 2.25 14 2.25V3.75ZM22.75 11C22.75 9.13558 22.7516 7.66182 22.5969 6.51098C22.4392 5.33855 22.1071 4.38961 21.3588 3.64124L20.2981 4.7019C20.7213 5.12511 20.975 5.70476 21.1102 6.71085C21.2484 7.73851 21.25 9.09318 21.25 11H22.75ZM10 2.25C8.13558 2.25 6.66182 2.24841 5.51098 2.40313C4.33856 2.56076 3.38961 2.89288 2.64124 3.64124L3.7019 4.7019C4.12511 4.27869 4.70476 4.02502 5.71085 3.88976C6.73851 3.75159 8.09318 3.75 10 3.75V2.25ZM2.75 11C2.75 9.09318 2.75159 7.73851 2.88976 6.71085C3.02502 5.70476 3.27869 5.12511 3.7019 4.7019L2.64124 3.64124C1.89288 4.38961 1.56076 5.33855 1.40313 6.51098C1.24841 7.66182 1.25 9.13558 1.25 11H2.75ZM21.25 12V13H22.75V12H21.25ZM2 12.75H14V11.25H2V12.75ZM18 12.75H22V11.25H18V12.75Z" fill="#ffffff"></path> <path d="M13.5 7.5L18 7.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 17.5L6 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 8.5L6 6.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 17.5L9 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 8.5L9 6.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5841 17.5H14.8341V17.5L15.5841 17.5ZM15.5841 18L15.0964 18.5698C15.3772 18.8101 15.7911 18.8101 16.0718 18.5698L15.5841 18ZM16.656 18.0698C16.9706 17.8004 17.0074 17.327 16.738 17.0123C16.4687 16.6976 15.9952 16.6609 15.6806 16.9302L16.656 18.0698ZM15.4877 16.9302C15.173 16.6609 14.6996 16.6976 14.4302 17.0123C14.1609 17.327 14.1976 17.8004 14.5123 18.0698L15.4877 16.9302ZM20.3892 16.6352C20.6296 16.9726 21.0979 17.0512 21.4352 16.8108C21.7726 16.5704 21.8512 16.1021 21.6108 15.7648L20.3892 16.6352ZM18.5048 14.25C16.5912 14.25 14.8341 15.5999 14.8341 17.5H16.3341C16.3341 16.6387 17.1923 15.75 18.5048 15.75V14.25ZM14.8341 17.5L14.8341 18L16.3341 18L16.3341 17.5L14.8341 17.5ZM16.0718 18.5698L16.656 18.0698L15.6806 16.9302L15.0964 17.4302L16.0718 18.5698ZM16.0718 17.4302L15.4877 16.9302L14.5123 18.0698L15.0964 18.5698L16.0718 17.4302ZM21.6108 15.7648C20.945 14.8304 19.782 14.25 18.5048 14.25V15.75C19.3411 15.75 20.0295 16.1304 20.3892 16.6352L21.6108 15.7648Z" fill="#ffffff"></path> <path d="M18.4952 21V21.75V21ZM21.4159 18.5H22.1659H21.4159ZM21.4159 18L21.9036 17.4302C21.6228 17.1899 21.2089 17.1899 20.9282 17.4302L21.4159 18ZM20.344 17.9302C20.0294 18.1996 19.9926 18.673 20.262 18.9877C20.5313 19.3024 21.0048 19.3391 21.3194 19.0698L20.344 17.9302ZM21.5123 19.0698C21.827 19.3391 22.3004 19.3024 22.5698 18.9877C22.8391 18.673 22.8024 18.1996 22.4877 17.9302L21.5123 19.0698ZM16.6108 19.3648C16.3704 19.0274 15.9021 18.9488 15.5648 19.1892C15.2274 19.4296 15.1488 19.8979 15.3892 20.2352L16.6108 19.3648ZM18.4952 21.75C20.4088 21.75 22.1659 20.4001 22.1659 18.5H20.6659C20.6659 19.3613 19.8077 20.25 18.4952 20.25V21.75ZM22.1659 18.5V18H20.6659V18.5H22.1659ZM20.9282 17.4302L20.344 17.9302L21.3194 19.0698L21.9036 18.5698L20.9282 17.4302ZM20.9282 18.5698L21.5123 19.0698L22.4877 17.9302L21.9036 17.4302L20.9282 18.5698ZM15.3892 20.2352C16.055 21.1696 17.218 21.75 18.4952 21.75V20.25C17.6589 20.25 16.9705 19.8696 16.6108 19.3648L15.3892 20.2352Z" fill="#ffffff"></path> </g></svg></div><div style="font-size:1.3em">Сменить сервер</div></div>'
    var youtube = '<div class="settings-folder" style="padding:0!important"><div style="width:2.5em;height:2em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="3.2640000000000002"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M43.1124,14.394a5.0056,5.0056,0,0,0-3.5332-3.5332c-2.3145-.8936-24.7326-1.3314-31.2358.0256A5.0059,5.0059,0,0,0,4.81,14.42c-1.0446,4.583-1.1239,14.4914.0256,19.1767A5.006,5.006,0,0,0,8.369,37.13c4.5829,1.0548,26.3712,1.2033,31.2358,0a5.0057,5.0057,0,0,0,3.5332-3.5333C44.2518,28.6037,44.3311,19.31,43.1124,14.394Z"></path><path class="a" d="M30.5669,23.9952,20.1208,18.004V29.9863Z"></path></g></svg></div><div style="font-size:1.3em">YouTube</div></div>'

    
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
                                       type: 'select',
                            values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
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
                                       name: 'switch_server',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
                                       },
                                       field: {
                                               name: 'Сменить сервер',
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
        title: exit
      });
   }
 
 if(localStorage.getItem('reboot') !== '1') {
      menu.push({
        title: reboot
      });
  }
        
  if(localStorage.getItem('switch_server') !== '1') {
      menu.push({
        title: switch_server
      });
  }
        
  if(localStorage.getItem('youtube') !== '1') {
       menu.push({
            title: youtube
      });
   }

      
      Lampa.Select.show({
        title: 'Выход ', // пробел обязателен, чтобы отделить событие от оригинального меню
        items: menu,
        onBack: function onBack() { 
         
         Lampa.Controller.toggle('content');
        },
        onSelect: function onSelect(a) {
          
          if (a.title == exit) closeApp();
          if (a.title == reboot) location.reload();
          if (a.title == switch_server) showServerInput();    
          if (a.title == youtube) window.location.href = 'https://youtube.com/tv';
          
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
