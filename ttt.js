(function () {
    'use strict';
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      var container = Lampa.Activity.active().activity.render();
      container.find('.view--torrent').not(':first').remove(); // Удаление дубликатов
      var firstTorrent = container.find('.view--torrent').first(); // Получение первого элемента
      firstTorrent.clone().insertBefore(container.find('.button--play')); // Клонирование и вставка перед .button--play
    }, 10);
  }
});
 })();
