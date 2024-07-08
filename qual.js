(function () {
    'use strict';

    /*function card() {
      var apiKey = '4ef0d7355d9ffb5151e987764708ce96';
      var baseUrl = 'http://tmdb.cub.red/3/';
      function fetchMovieDetails(movieId, method, callback) {
        var apiUrl = "".concat(baseUrl).concat(method, "/").concat(movieId, "?api_key=").concat(apiKey);
        $.getJSON(apiUrl, function (data, textStatus, xhr) {
          if (xhr.status === 200) {
            callback(null, data);
          } else {
            callback(new Error("Error fetching movie details: ".concat(data.status_message)));
          }
        }).fail(function (jqXHR, textStatus, errorThrown) {
          callback(new Error("Fetch error: ".concat(textStatus, ", ").concat(errorThrown)));
        });
      }
      
      Lampa.Listener.follow("line", function (e) {
        if (e.type === "append" && Lampa.Storage.field("source") !== "cub") {
          e.items.forEach(function (movieCard) {
            // Проверяем, существует ли movieCard.data и имеет ли оно свойство id
            if (movieCard.data && (movieCard.data.id || movieCard.data.number_of_seasons)) {
              var id = movieCard.data.id || 0;
              var mediaType = movieCard.data.media_type ? movieCard.data.media_type : movieCard.data.number_of_seasons ? "tv" : "movie";
              fetchMovieDetails(id, mediaType, function (err, data) {
                if (err) {
                  console.error(err.message);
                  return;
                }
                var release_quality = data.release_quality;
                if (release_quality) {
                  var quality = document.createElement("div");
                  quality.classList.add("card__quality");
                  var quality_inner = document.createElement("div");
                  quality_inner.innerText = release_quality;
                  quality.appendChild(quality_inner);
                  movieCard.card.querySelector(".card__view").appendChild(quality);
                }
              });
            } else {
              console.warn("movieCard.data is undefined or missing id/number_of_seasons:", movieCard);
            }
          });
        }
      });
    }
    var UTILS = {
      card: card
    };

   
    function add() {
      UTILS.card();
    }
    
    

   
      if (window.appready) add();else {
        Lampa.Listener.follow("app", function (e) {
          if (e.type === "ready") add();
        });
      }*/
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
