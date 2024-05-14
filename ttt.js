(function () {
    'use strict';
    Lampa.Platform.tv();

/*Lampa.Listener.follow('full', function(e) {
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
});*/
	Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    

    setTimeout(function() {

      // Вставляем элементы перед кнопкой "Воспроизвести"
    $('.view--online, .view--online_mod, .view--torrent').insertBefore($('.button--play'));
	    
      // Удаляем дубликаты для кнопок .view--online
      if ($('.view--online').length > 1) {
        $('.view--online').slice(1).remove();
      }

      // Упорядочиваем кнопки .view--online
      $('.view--online').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $firstChild = $parent.children().first();

        if (!$torrentButton.is($firstChild)) {
          $torrentButton.prependTo($parent);
        }
      });

      // Удаляем дубликаты для кнопок .view--online_mod
      if ($('.view--online_mod').length > 1) {
        $('.view--online_mod').slice(1).remove();
      }

      // Упорядочиваем кнопки .view--online_mod
      $('.view--online_mod').each(function() {
        var $onmodButton = $(this);
        var $parent = $onmodButton.parent();
        var $secondChild = $parent.children().eq(1);

        if (!$onmodButton.is($secondChild)) {
          $onmodButton.insertBefore($secondChild);
        }
      });

      // Удаляем дубликаты для кнопок .view--torrent
      if ($('.view--torrent').length > 1) {
        $('.view--torrent').slice(1).remove();
      }

      // Упорядочиваем кнопки .view--torrent
      $('.view--torrent').each(function() {
        var $torrentButton = $(this);
        var $parent = $torrentButton.parent();
        var $thirdChild = $parent.children().eq(2);

        if (!$torrentButton.is($thirdChild)) {
          $torrentButton.insertAfter($parent.children().eq(1));
        }
      });
    }, 10);
  }
});
	
})();
