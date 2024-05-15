(function () {
    'use strict';
 
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      var container = Lampa.Activity.active().activity.render();
      
      // Удаление предыдущих клонированных элементов и кнопки .button--play
     // container.find('.button--play').remove();
      container.find('.button--play').prevAll('.view--torrent, .view--trailer, .view--online').remove();
      
      // Получение первого элемента .view--online
      var firstOnline = container.find('.view--online').first();
      
      // Клонирование первого элемента .view--online и вставка в начало
      var clonedOnline = firstOnline.clone().prependTo(container);
      
      // Добавление HTML-кода внутрь клонированного .view--online
      clonedOnline.empty().append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>&nbsp;&nbsp;Онлайн');
      
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
      
      // Клонирование первого элемента .view--trailer и вставка после .view--torrent
      var clonedTrailer = firstTrailer.clone().insertAfter(clonedTorrent);
      
      // Удаление изначального элемента .view--trailer из списка
      firstTrailer.remove();
      
      // Удаление дубликатов (на всякий случай)
      container.find('.view--torrent, .view--trailer, .view--online').not(clonedOnline).not(clonedTorrent).not(clonedTrailer).remove();
    }, 10);
  }
});

 })();
