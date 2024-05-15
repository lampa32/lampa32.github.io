(function () {
    'use strict';
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      var container = Lampa.Activity.active().activity.render();
      container.find('.view--torrent').not(':first').remove();
      container.find('.button--play').before($('.view--torrent').clone());
    }, 10);
  }
});
 })();
