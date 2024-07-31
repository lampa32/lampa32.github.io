(function () {
    'use strict';

function sound_move() {
/*    // Создаем элементы аудио
var audioUpElement = document.createElement('audio');
var audioDownElement = document.createElement('audio');
var audioLeftElement = document.createElement('audio');
var audioRightElement = document.createElement('audio');
var audioOkElement = document.createElement('audio');

// Устанавливаем источники звука
audioUpElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioDownElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioLeftElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioRightElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioOkElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';

// Обрабатываем события пульта ТВ
document.onkeydown = function(event) {
  if (event.keyCode === 38) { // Кнопка "вверх"
    audioUpElement.currentTime = 0;
    audioUpElement.play();
    
  } else if (event.keyCode === 40) { // Кнопка "вниз"
    audioDownElement.currentTime = 0;
    audioDownElement.play();
    
  } else if (event.keyCode === 37) { // Кнопка "влево"
    audioLeftElement.currentTime = 0;
    audioLeftElement.play();
    
  } else if (event.keyCode === 39) { // Кнопка "вправо"
    audioRightElement.currentTime = 0;
    audioRightElement.play();

  } else if (event.keyCode === 13) { // Кнопка "ОК"
    audioOkElement.currentTime = 0;
    audioOkElement.play();
    
  }
};*/


// Проверяем, на каком устройстве запущено приложение
function isLGTV() {
    // Здесь вы можете добавить логику для определения, что приложение запущено на LG TV
    // Например, проверка на наличие определенных объектов или функций
    return true; // Заглушка, предполагаем, что приложение запущено на LG TV
}

// Создание аудиоэлементов
var audioUpElement = document.createElement('audio');
var audioDownElement = document.createElement('audio');
var audioLeftElement = document.createElement('audio');
var audioRightElement = document.createElement('audio');
var audioOkElement = document.createElement('audio');

// Устанавливаем источники звука
audioUpElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioDownElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioLeftElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioRightElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';
audioOkElement.src = 'https://github.com/spreyo/clicket/raw/main/sounds/click.mp3';

// Функция для воспроизведения аудио на ПК
function playAudioOnPC(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
}

// Функция для воспроизведения аудио на LG TV
function playAudioOnLGTV(audioElement) {
    // Используем специальные методы для работы с аудио на LG TV
    lgTVAudioManager.setSource(audioElement.src);
    lgTVAudioManager.play();
}

// Обрабатываем события пульта ТВ
document.onkeydown = function(event) {
    if (isLGTV()) {
        // Коды клавиш для телевизора LG
        const keyCodes = {
            up: 19,
            down: 20,
            left: 21,
            right: 22,
            ok: 13
        };

        if (event.keyCode === keyCodes.up) {
            playAudioOnLGTV(audioUpElement);
        } else if (event.keyCode === keyCodes.down) {
            playAudioOnLGTV(audioDownElement);
        } else if (event.keyCode === keyCodes.left) {
            playAudioOnLGTV(audioLeftElement);
        } else if (event.keyCode === keyCodes.right) {
            playAudioOnLGTV(audioRightElement);
        } else if (event.keyCode === keyCodes.ok) {
            playAudioOnLGTV(audioOkElement);
        }
    } else {
        // Коды клавиш для ПК
        const keyCodes = {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            ok: 13
        };

        if (event.keyCode === keyCodes.up) {
            playAudioOnPC(audioUpElement);
        } else if (event.keyCode === keyCodes.down) {
            playAudioOnPC(audioDownElement);
        } else if (event.keyCode === keyCodes.left) {
            playAudioOnPC(audioLeftElement);
        } else if (event.keyCode === keyCodes.right) {
            playAudioOnPC(audioRightElement);
        } else if (event.keyCode === keyCodes.ok) {
            playAudioOnPC(audioOkElement);
        }
    }
};





    

}

if (window.appready)  sound_move();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') {
                sound_move();
            }
        });
    }

})();
