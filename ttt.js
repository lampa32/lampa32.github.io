(function () {
    'use strict';
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      var container = Lampa.Activity.active().activity.render();
      
      // Удаление предыдущих клонированных элементов перед .button--play
      container.find('.button--play').prevAll('.view--torrent').remove();
      
      // Получение первого элемента .view--torrent
      var firstTorrent = container.find('.view--torrent').first();
      
      // Клонирование первого элемента .view--torrent и вставка перед .button--play
      var clonedTorrent = firstTorrent.clone().insertBefore(container.find('.button--play'));
      
      // Удаление изначального элемента .view--torrent из списка
      firstTorrent.remove();
      
      // Удаление дубликатов (на всякий случай)
      container.find('.view--torrent').not(clonedTorrent).remove();
    }, 10);
  }
});
 })();
