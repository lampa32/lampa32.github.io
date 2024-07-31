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


// Создание аудиоэлементов
var audioUpElement = Audio('https://github.com/spreyo/clicket/raw/main/sounds/click.mp3');
var audioDownElement = Audio('https://github.com/spreyo/clicket/raw/main/sounds/click.mp3');
var audioLeftElement = Audio('https://github.com/spreyo/clicket/raw/main/sounds/click.mp3');
var audioRightElement = Audio('https://github.com/spreyo/clicket/raw/main/sounds/click.mp3');
var audioOkElement = Audio('https://github.com/spreyo/clicket/raw/main/sounds/click.mp3');

// Функция для воспроизведения аудио
function playAudio(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
}

// Обрабатываем события пульта ТВ
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 19: // Кнопка "вверх"
            playAudio(audioUpElement);
            break;
        case 20: // Кнопка "вниз"
            playAudio(audioDownElement);
            break;
        case 21: // Кнопка "влево"
            playAudio(audioLeftElement);
            break;
        case 25: // Кнопка "вправо"
            playAudio(audioRightElement);
            break;
        case 26: // Кнопка "ОК"
            playAudio(audioOkElement);
            break;
    }
});




    

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
