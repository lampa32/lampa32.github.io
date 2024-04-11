(function () {
    'use strict';
    Lampa.Platform.tv();

  Lampa.Storage.set('card_interfice_type', 'old');

Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
               if ($('.view--torrent').length <= 1) {
                 setTimeout(function(){
             //    $('.view--online').insertBefore($('.view--torrent'));
                   $('.view--torrent').insertAfter($('.view--trailer'));
               //  $(".view--online", Lampa.Activity.active().activity.render()).empty().append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>Онлайн');
                   Lampa.Controller.toggle('full_start');
                  },10)
                }
            }
})
})();
