(function () {
    'use strict';
    Lampa.Platform.tv();

function start() {

var stay = 0
var server_protocol = location.protocol === "https:" ? 'https://' : 'http://'

function showServerInput() {
	  //stay = 0;
      Lampa.Input.edit({
          title: "Укажите Сервер",
          value: '',
          free: true       
      }, function (value) {
	 if (value !== '') {
	window.location.href = server_protocol + value;
	}
	else {showMeExitMenu();}
      })
}

function closeApp() {
   Lampa.Activity.out();
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
  subtitle:  'Общие',
  isSelectable: false
    });
	
    menu.push({
  title:  'Выход'
    });

    menu.push({
  title:  'Перезагрузить'
    });

    menu.push({
  title:  'YouTube'
    });

    menu.push({
  title:  'Сменить адрес'
    });

    Lampa.Select.show({
    title: 'Выход',
    items: menu,
    onBack: function onBack() {
      //Lampa.Activity.out();
	    stay = 0;
      //Lampa.Controller.toggle(enabled);
    },
    onSelect: function onSelect(a) {
      stay = 0;
      if (a.title == 'Выход') closeApp();
      if (a.title == 'Перезагрузить') location.reload();
      if (a.title == 'YouTube') window.location.href = 'https://youtube.com/tv';
      if (a.title == 'Сменить адрес') showServerInput();    
     // Lampa.Controller.toggle(enabled);
    }
	    onBeforeSelect: function(item) {
            // Предотвращаем выбор подзаголовков
            if (item.subtitle) {
                return false;
            }
            return true;
}
    })
}
  
  Lampa.Controller.listener.follow('toggle', function(e) {
    if(e.name == 'select' && stay !== 1 && document.querySelector("body > div.selectbox > div.selectbox__content.layer--height > div.selectbox__head > div").innerText == Lampa.Lang.translate('title_out')) {
      setTimeout(function() {
        stay = 1
        //window.history.back();
        showMeExitMenu()
      },10);
    };
  })

	
/*     Вместо пункта отмена, добавляем пункт
        Перезагрузить при долгом тапе назад
	
Lampa.Controller.listener.follow('toggle', function(e) {
    if(e.name == 'select') {
      setTimeout(function() {
        if (document.querySelector("body > div.selectbox > div.selectbox__content.layer--height > div.selectbox__head > div").innerText == Lampa.Lang.translate('title_out')) {
          document.querySelector("body > div.selectbox > div.selectbox__content.layer--height > div.selectbox__body.layer--wheight > div > div > div > div:nth-child(2) > div").text('Перезагрузить')
          $('.selectbox-item')[1].on('hover:enter hover:click hover:touch', function() {
            location.reload();
          });
        }
      }, 100);
    }
  });  */
	
	
} 
  
if(window.appready) start();
else Lampa.Listener.follow('app', function(e) {	if(e.type == 'ready') start(); });

})();
