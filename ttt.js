(function () {
    'use strict';
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      // Удаляем все клоны перед вставкой нового
      $('.view--torrent.clone').remove();

      Lampa.Activity.active().activity.render().find('.button--play').before($('.view--torrent').clone());
    }, 10);
  }
});
 })();
