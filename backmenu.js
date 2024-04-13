(function () {
    'use strict';
    Lampa.Platform.tv();

function start() {

var stay = 0
var server_protocol = location.protocol === "https:" ? 'https://' : 'http://'

function showServerInput() {
	/*  stay = 1;
      Lampa.Input.edit({
          title: "Укажите Сервер",
          value: '',
          free: true,
      }, function (value) {
        // здесь редирект;
	window.location.href = server_protocol + value;
        if (value == '') return;
      })*/
	var inputValue = ''; // Переменная для хранения введенного значения

    // Создание диалогового окна
    var dialog = document.createElement('div');
    dialog.classList.add('dialog');

    // Создание поля ввода
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите значение');
    dialog.appendChild(input);

    // Создание кнопки "Ок"
    var okButton = document.createElement('button');
    okButton.textContent = 'Ок';
    okButton.addEventListener('click', function() {
        inputValue = input.value;
        // Выполнение действий с введенным значением
        // Например, редирект или другая обработка
        console.log('Введенное значение:', inputValue);
        // Закрытие диалогового окна
        dialog.remove();
    });
    dialog.appendChild(okButton);

    // Создание кнопки "Отмена"
    var cancelButton = document.createElement('button');
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', function() {
        // Закрытие диалогового окна без выполнения действий
        console.log('Действие отменено');
        dialog.remove();
    });
    dialog.appendChild(cancelButton);

    // Добавление диалогового окна на страницу
    document.body.appendChild(dialog);
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
      if (a.title == 'Сменить адрес') showServerInput();
	    
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
