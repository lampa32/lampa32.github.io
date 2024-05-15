(function () {
    'use strict';
 
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      var container = Lampa.Activity.active().activity.render();
      
      // Удаление предыдущих клонированных элементов перед .button--play
      container.find('.button--play').prevAll('.view--torrent, .view--trailer, .view--online').remove();
      
      // Получение первого элемента .view--online
      var firstOnline = container.find('.view--online').first();
      
      // Клонирование первого элемента .view--online и вставка перед .button--play
      var clonedOnline = firstOnline.clone().insertBefore(container.find('.button--play'));
      
      // Удаление изначального элемента .view--online из списка
      firstOnline.remove();
      
      // Получение первого элемента .view--torrent
      var firstTorrent = container.find('.view--torrent').first();
      
      // Клонирование первого элемента .view--torrent и вставка после .view--online
      var clonedTorrent = firstTorrent.clone().insertAfter(clonedOnline);
      
      // Удаление изначального элемента .view--torrent из списка
      firstTorrent.remove();
      
      // Получение первого элемента .view--trailer
      var firstTrailer = container.find('.view--trailer').first();
      
      // Клонирование первого элемента .view--trailer и вставка перед .button--play
      var clonedTrailer = firstTrailer.clone().insertBefore(container.find('.button--play'));
      
      // Удаление изначального элемента .view--trailer из списка
      firstTrailer.remove();
      
      // Удаление дубликатов (на всякий случай)
      container.find('.view--torrent, .view--trailer, .view--online').not(clonedOnline).not(clonedTorrent).not(clonedTrailer).remove();
    }, 10);
  }
});

 })();
