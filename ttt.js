(function () {
    'use strict';
    Lampa.Platform.tv();

Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      $('.view--online').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $firstChild = $parent.children().first();

        if (!$torrentButton.is($firstChild)) {
          $torrentButton.prependTo($parent);
        }
      });
      $('.view--online_mod').each(function() {
        var $onmodButton = $(this);
        var $parent = $onmodButton.parent();
        var $secondChild = $parent.children().eq(1); // Выбираем второй элемент

        if (!$onmodButton.is($secondChild)) {
          $onmodButton.insertBefore($secondChild); // Вставляем $onmodButton перед вторым элементом
        }
      });
      $('.view--torrent').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $thirdChild = $parent.children().eq(2); // Выбираем третий элемент

        if (!$torrentButton.is($thirdChild)) {
          $torrentButton.insertAfter($parent.children().eq(1)); // Вставляем $torrentButton после второго элемента
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
