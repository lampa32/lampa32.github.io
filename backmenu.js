(function () {
    'use strict';
    Lampa.Platform.tv();

function start() {

function showTextInput() {
    var userInput = prompt("Сменить адрес:");
    if (userInput !== null) {
        // Пользователь ввел текст и нажал "ОК"
        // Здесь вы можете обработать введенный пользователем текст
        console.log("Пользователь ввел: " + userInput);
    } else {
        // Пользователь отменил ввод текста
        console.log("Пользователь отменил ввод текста");
    }
}	

       var stay = 0

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
      stay = 0;
      //Lampa.Controller.toggle(enabled);
    },
    onSelect: function onSelect(a) {
      stay = 0;
      if (a.title == 'Выход') closeApp();
      if (a.title == 'Перезагрузить') location.reload();
      if (a.title == 'YouTube') window.location.href = 'https://youtube.com/tv';
      if (a.title == 'Сменить адрес') showTextInput();
	    
      Lampa.Controller.toggle(enabled);
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
