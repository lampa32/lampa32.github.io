(function () {
    'use strict';
    Lampa.Platform.tv();
	
   window.lampa_settings.torrents_use = true;
   window.lampa_settings.demo = false;
   window.lampa_settings.read_only = false;

   Lampa.Utils.putScriptAsync([
	    'http://77.91.122.72:9118/online.js'
	    
    ], function () {});

   document.addEventListener("DOMSubtreeModified", function(event) {
	var divs = document.getElementsByClassName("search__sources");
	var startSource = Lampa.Storage.get('source');
		if (divs.length > 0) {
			if (Lampa.Storage.get('source') == 'cub') {
				var startSource = Lampa.Storage.get('source');
				Lampa.Storage.set('mySource', startSource) // РјРµС‚РєР°
				Lampa.Storage.set('source', 'tmdb');
			}
		} else {
		setTimeout(function(){
			if (localStorage.getItem('mySource')) {Lampa.Storage.set('source', Lampa.Storage.get('mySource'))}
			localStorage.removeItem("mySource");
		}, 1500)
	}
}, false); 

    var plugArray = Lampa.Storage.get('plugins');
    var delplugin = plugArray.filter(function(obj) {return obj.url !== 'http://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', delplugin);

    var pluginArray = Lampa.Storage.get('plugins');
    var deleteplugin = pluginArray.filter(function(obj) {return obj.url !== 'https://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', deleteplugin);

    function account(url){
      var email = Lampa.Storage.get('account_email')
      if(email) url = Lampa.Utils.addUrlComponent(url,'account_email=' + encodeURIComponent(email))
      return url
    }

    Lampa.TMDB.image = function (url) {
      var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'https://imagetmdb.cub.red/' + account(base) : base;
    };

    Lampa.TMDB.api = function (url) {
      var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'https://cors.lampa.stream/' + account(base) : base;
    };

    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'tmdb') {
        e.body.find('[data-parent="proxy"]').remove();
      }
    });

    var dcma_timer = setInterval(function(){
      if(window.lampa_settings.dcma){
            clearInterval(dcma_timer)
            window.lampa_settings.dcma = false
      }
    },1000)

})();
