(function () {
    'use strict';
    Lampa.Platform.tv();

Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      $('.view--torrent').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $firstChild = $parent.children().first();

        if (!$torrentButton.is($firstChild)) {
          $torrentButton.prependTo($parent);
        }
      });
    }, 100);
  }
});
  /*Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
       setTimeout(function() {
          $('.view--torrent').first().prependTo($('.view--torrent').first().parent());
       },10);
     }
  })*/
   /* let isButtonMoved = false;

Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      if (!isButtonMoved) {
        $('.view--torrent').first().prependTo($('.view--torrent').first().parent());
        //if ($('.view--torrent').length > 1) $('.view--torrent').slice(1).remove();
        isButtonMoved = true;
      }
    }, 10);
  } else if (e.type == 'complite') {
    isButtonMoved = false;
  }
});*/
   /* Lampa.Controller.listener.follow('toggle', function(e) {
			  if (e.name == 'select') {
                    if (Lampa.Activity.active().component == 'full') {
                      setTimeout(function() {
                        $('.view--torrent').first().prependTo($('.view--torrent').first().parent());
                      }, 10)
                    }
              }
    });*/
                
                    
  
})();
