(function () {
    'use strict';
    Lampa.Platform.tv();

  Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
       setTimeout(function() {
         $('.view--torrent').appendTo('body');
         // if ($('.view--torrent').length > 1) $('.view--torrent')[1].remove();
       },10);
     }
  })
  
})();
