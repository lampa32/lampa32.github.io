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
    // Вставляем элементы перед кнопкой "Воспроизвести"
    $('.view--online, .view--online_mod, .view--torrent').insertBefore($('.button--play'));

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
        var $secondChild = $parent.children().eq(1);

        if (!$onmodButton.is($secondChild)) {
          $onmodButton.insertBefore($secondChild);
        }
      });

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
