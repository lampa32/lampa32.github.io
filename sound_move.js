(function () {
    'use strict';

    // Создаем элементы аудио
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
};

})();
