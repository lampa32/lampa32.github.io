(function () {
    'use strict';
    Lampa.Platform.tv();

Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      $('.view--filmixpva').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $secondChild = $parent.children().second();

        if (!$torrentButton.is($firstChild)) {
          $torrentButton.prependTo($parent);
        }
      });
      $('.view--online_mod').each(function() {
        var $onmodButton = $(this);
        var $parent = $onmodButton.parent();
        var $secondChild = $parent.children().second();

        if (!$onmodButton.is($secondChild)) {
          $onmodButton.prependTo($parent);
        }
      });
    }, 10);
  }
});
	
/*Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      $('.view--online2').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $modsOnlineButton = $parent.find('.view--modss_online');

        if ($modsOnlineButton.length) {
          $torrentButton.insertBefore($modsOnlineButton);
        } else {
          var $firstChild = $parent.children().first();
          if (!$torrentButton.is($firstChild)) {
            $torrentButton.prependTo($parent);
          }
        }
      });
    }, 10);
  }
});*/
	
/*Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      $('.view--online2').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $firstChild = $parent.children().first();

        if (!$torrentButton.is($firstChild)) {
          $torrentButton.prependTo($parent);
        }
      });
    }, 10);
  }
});*/
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
