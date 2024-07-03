(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Storage.set('protocol', 'http');
/* 
  if (Lampa.Storage.get('source') == 'cub') {
    Lampa.Storage.set('source', 'tmdb')
  }
*/
 document.addEventListener("DOMSubtreeModified", function(event) {
	var divs = document.getElementsByClassName("search__sources");
	var startSource = Lampa.Storage.get('source');
		if (divs.length > 0) {
			if (Lampa.Storage.get('source') == 'cub') {
				var startSource = Lampa.Storage.get('source');
				Lampa.Storage.set('mySource', startSource) // метка
				Lampa.Storage.set('source', 'tmdb');
			}
		} else {
		setTimeout(function(){
			if (localStorage.getItem('mySource')) {Lampa.Storage.set('source', Lampa.Storage.get('mySource'))}
			localStorage.removeItem("mySource");
		}, 1500)
	}
   }, false); 
    
    var pluginArray = Lampa.Storage.get('plugins');
    var delplugin = pluginArray.filter(function(obj) {return obj.url !== 'http://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', delplugin);

    var pluginArray = Lampa.Storage.get('plugins');
    var deleteplugin = pluginArray.filter(function(obj) {return obj.url !== 'https://cub.red/plugin/tmdb-proxy'});
    Lampa.Storage.set('plugins', deleteplugin);


    Lampa.TMDB.image = function (url) {
      var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'http://cors.lampa.run.place/proxy/' + Lampa.Utils.addUrlComponent(base) : base;
    };

    Lampa.TMDB.api = function (url) {
      var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'http://cors.lampa.run.place/proxy/' + Lampa.Utils.addUrlComponent(base) : base;
    };

    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'tmdb') {
        e.body.find('[data-parent="proxy"]').remove();
      }
    });

      var dcma_timer = setInterval(function(){
	  if(typeof window.lampa_settings != 'undefined' && (window.lampa_settings.fixdcma || window.lampa_settings.dcma)){
		clearInterval(dcma_timer)
		if (window.lampa_settings.dcma)
			window.lampa_settings.dcma = false;
	  }
      },100);
	
    /*var dcma_timer = setInterval(function(){
      if(window.lampa_settings.dcma){
            clearInterval(dcma_timer)
            window.lampa_settings.dcma = false
      }
    },1000)*/

function card() {
  var apiKey = '4ef0d7355d9ffb5151e987764708ce96';
  var baseUrl = 'http://tmdb.cub.red/3/';

  function fetchMovieDetails(movieId, method, callback) {
    var apiUrl = baseUrl + method + '/' + movieId + '?api_key=' + apiKey;
    $.getJSON(apiUrl, function(data, textStatus, xhr) {
      if (xhr.status === 200) {
        callback(null, data);
      } else {
        callback(new Error('Ошибка получения информации о фильме: ' + data.status_message));
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      callback(new Error('Ошибка выборки: ' + textStatus + ', ' + errorThrown));
    });
  }

  Lampa.Listener.follow('line', function(e) {
    if (e.type === 'append' && Lampa.Storage.field('source') !== 'cub') {
      e.items.forEach(function(movieCard) {
        if (movieCard.data && (movieCard.data.id || movieCard.data.number_of_seasons)) {
          var id = movieCard.data.id || 0;
          var mediaType = movieCard.data.media_type ? movieCard.data.media_type : movieCard.data.number_of_seasons ? 'tv' : 'movie';
          fetchMovieDetails(id, mediaType, function(err, data) {
            if (err) {
              console.error(err.message);
              return;
            }
            var release_quality = data.release_quality;
            if (release_quality) {
              var quality = document.createElement('div');
              quality.classList.add('quality');
              var quality_inner = document.createElement('div');
              quality_inner.innerText = release_quality;
              quality.appendChild(quality_inner);
              movieCard.card.querySelector('.cardrd__view').appendChild(quality);
            }
          });
        } else {
          console.warn('movieCard.data is undefined or missing id/number_of_seasons:', movieCard);
        }
      });
    }
  });
}

function add() {
  card();
}

function startPlugin() {
  window.plugin_lmeq_ready = true;
  if (window.appready) add();
  else {
    Lampa.Listener.follow('app', function(e) {
      if (e.type === 'ready') add();
    });
  }
}

if (!window.plugin_lmeq_ready) startPlugin();

})();
