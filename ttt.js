(function () {
    'use strict';
Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      Lampa.Activity.active().activity.render().find('.button--play').before($('.view--torrent'));
    }, 10);
  }
});
 })();
