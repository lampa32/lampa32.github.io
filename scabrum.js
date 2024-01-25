(function () {
    'use strict';
  Lampa.Platform.tv();
  Lampa.Settings.main().render().find('[data-component="plugins"]').unbind('hover:enter').on('hover:enter', function () {
        Lampa.Extensions.show();
        setTimeout(function (){
           var plugArray = Lampa.Storage.get('plugins');
           var delplugin = plugArray.filter(function(obj) {return obj.url !== 'https://scabrum.github.io/plugins/addon.js'});
           Lampa.Storage.set('plugins', delplugin); 
          //$('.extensions__item-url', Lampa.Extensions.render()).map(function (i, e){
            //if(e.textContent == 'https://scabrum.github.io/plugins/addon.js') $(e).html('💎').append('<span class="extensions__item-premium">VIP buy at @modssmy_bot</span>');
          });
        }, 500);
      });
})();
