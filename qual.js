(function () {
    'use strict';

    /*document.addEventListener("DOMSubtreeModified", function(event) {
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
      return Lampa.Storage.field('proxy_tmdb') ? 'http://image.tmdb.org/' + Lampa.Utils.addUrlComponent(base) : base;
    };

    Lampa.TMDB.api = function (url) {
      var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
      return Lampa.Storage.field('proxy_tmdb') ? 'http://212.113.103.137:9118/proxy/' + Lampa.Utils.addUrlComponent(base) : base;
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
      },100);*/
    
function card() {
  var apiKey = '4ef0d7355d9ffb5151e987764708ce96';
  var baseUrl = 'http://tmdb.cub.red/3/';
  var movieCache = new Map();

  // Загружаем данные из localStorage
  loadMovieDataFromLocalStorage();

  function fetchMovieDetails(movieId, mediaType) {
    // Сначала проверяем, есть ли данные в кэше
    if (movieCache.has(movieId)) {
      return Promise.resolve(movieCache.get(movieId));
    }

    // Если данных нет в кэше, проверяем localStorage
    var cachedData = loadMovieDataFromLocalStorage(movieId);
    if (cachedData) {
      movieCache.set(movieId, cachedData);
      return Promise.resolve(cachedData);
    }

    // Если нет данных ни в кэше, ни в localStorage, делаем запрос к API
    return new Promise(function (resolve, reject) {
      var apiUrl = baseUrl + mediaType + "/" + movieId + "?api_key=" + apiKey;
      $.getJSON(apiUrl, function (data, textStatus, xhr) {
        if (xhr.status === 200) {
          // Сохраняем данные в кэше и localStorage
          movieCache.set(movieId, data);
          saveMovieDataToLocalStorage(movieId, data);
          resolve(data);
        } else {
          reject(new Error("Error fetching movie details: " + data.status_message));
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        reject(new Error("Fetch error: " + textStatus + ", " + errorThrown));
      });
    });
  }

  function loadMovieDataFromLocalStorage(movieId) {
    var data = localStorage.getItem('movie_' + movieId);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  function saveMovieDataToLocalStorage(movieId, data) {
    localStorage.setItem('movie_' + movieId, JSON.stringify(data));
  }

  Lampa.Listener.follow("line", function (e) {
    if (e.type === "append" && Lampa.Storage.field("source") !== "cub") {
      var movieIds = e.items
        .filter(function (movieCard) {
          return movieCard.data && (movieCard.data.id || movieCard.data.number_of_seasons);
        })
        .map(function (movieCard) {
          return {
            id: movieCard.data.id || 0,
            mediaType: movieCard.data.media_type ? movieCard.data.media_type : movieCard.data.number_of_seasons ? "tv" : "movie"
          };
        });

      if (movieIds.length > 0) {
        Promise.all(movieIds.map(function (item) {
          return fetchMovieDetails(item.id, item.mediaType);
        }))
        .then(function (results) {
          e.items.forEach(function (movieCard, index) {
            if (movieCard.data && (movieCard.data.id || movieCard.data.number_of_seasons)) {
              var release_quality = results[index].release_quality;
              // Обновляем качество в localStorage
              saveMovieDataToLocalStorage(movieCard.data.id, results[index]);
              if (release_quality) {
                var quality = document.createElement("div");
                quality.classList.add("card__quality");
                var quality_inner = document.createElement("div");
                quality_inner.innerText = release_quality;
                quality.appendChild(quality_inner);
                movieCard.card.querySelector(".card__view").appendChild(quality);
              }
            }
          });
        })
        .catch(function (error) {
          console.error("Error fetching movie details:", error);
        });
      }
    }
  });
}

var UTILS = {
  card: card
};

function add() {
  UTILS.card();
}

if (window.appready) {
  add();
} else {

  Lampa.Listener.follow("app", function (e) {
    if (e.type === "ready") {
      add();
    }
  });
}


})();
