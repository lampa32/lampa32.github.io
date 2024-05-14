(function () {
    'use strict';
    Lampa.Platform.tv();

  Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
       setTimeout(function() {
          $('.view--torrent').first().prependTo($('.view--torrent').first().parent());
         // if ($('.view--torrent').length > 1) $('.view--torrent')[1].remove();
       },10);
     }
  })
  
})();
