(function () {
	'use strict';

var network = new Lampa.Reguest();
    var cache = {};
    var total_cnt = 0;
    var proxy_cnt = 0;
    var good_cnt = 0;
    var menu_list = [];
    var genres_map = {};
    var countries_map = {};
    var CACHE_SIZE = 100;
    var CACHE_TIME = 1000 * 60 * 60;
    var SOURCE_NAME = 'KP';
    var SOURCE_TITLE = 'KP';

    function get(method, oncomplite, onerror) {
      var use_proxy = total_cnt >= 10 && good_cnt > total_cnt / 2;
      if (!use_proxy) total_cnt++;
      var kp_prox = 'https://cors.lampa.stream/';
      var url = 'https://kinopoiskapiunofficial.tech/';
      url += method;
      network.timeout(15000);
      network.silent((use_proxy ? kp_prox : '') + url, function (json) {
        oncomplite(json);
      }, function (a, c) {
        use_proxy = !use_proxy && (proxy_cnt < 10 || good_cnt > proxy_cnt / 2);

        if (use_proxy && (a.status == 429 || a.status == 0 && a.statusText !== 'timeout')) {
          proxy_cnt++;
          network.timeout(15000);
          network.silent(kp_prox + url, function (json) {
            good_cnt++;
            oncomplite(json);
          }, onerror, false, {
            headers: {
              'X-API-KEY': '14342b35-714b-449d-bf10-30d0d9ac22e6'
            }
          });
        } else onerror(a, c);
      }, false, {
        headers: {
          'X-API-KEY': '14342b35-714b-449d-bf10-30d0d9ac22e6'
        }
      });
    }

    function getComplite(method, oncomplite) {
      get(method, oncomplite, function () {
        oncomplite(null);
      });
    }

    function getCompliteIf(condition, method, oncomplite) {
      if (condition) getComplite(method, oncomplite);else {
        setTimeout(function () {
          oncomplite(null);
        }, 10);
      }
    }

    function getCache(key) {
      var res = cache[key];

      if (res) {
        var cache_timestamp = new Date().getTime() - CACHE_TIME;
        if (res.timestamp > cache_timestamp) return res.value;

        for (var ID in cache) {
          var node = cache[ID];
          if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
        }
      }

      return null;
    }

    function setCache(key, value) {
      var timestamp = new Date().getTime();
      var size = Object.keys(cache).length;

      if (size >= CACHE_SIZE) {
        var cache_timestamp = timestamp - CACHE_TIME;

        for (var ID in cache) {
          var node = cache[ID];
          if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
        }

        size = Object.keys(cache).length;

        if (size >= CACHE_SIZE) {
          var timestamps = [];

          for (var _ID in cache) {
            var _node = cache[_ID];
            timestamps.push(_node && _node.timestamp || 0);
          }

          timestamps.sort(function (a, b) {
            return a - b;
          });
          cache_timestamp = timestamps[Math.floor(timestamps.length / 2)];

          for (var _ID2 in cache) {
            var _node2 = cache[_ID2];
            if (!(_node2 && _node2.timestamp > cache_timestamp)) delete cache[_ID2];
          }
        }
      }

      cache[key] = {
        timestamp: timestamp,
        value: value
      };
    }

    function getFromCache(method, oncomplite, onerror) {
      var json = getCache(method);

      if (json) {
        setTimeout(function () {
          oncomplite(json, true);
        }, 10);
      } else get(method, oncomplite, onerror);
    }

    function clear() {
      network.clear();
    }

    function convertElem(elem) {
      var type = !elem.type || elem.type === 'FILM' || elem.type === 'VIDEO' ? 'movie' : 'tv';
      var kinopoisk_id = elem.kinopoiskId || elem.filmId || 0;
      var kp_rating = +elem.rating || +elem.ratingKinopoisk || 0;
      var adult = false;
      var result = {
        "source": SOURCE_NAME,
        "type": type,
        "adult": false,
        "id": SOURCE_NAME + '_' + kinopoisk_id,
        "name": elem.nameRu || elem.nameEn || elem.nameOriginal || '',
        "original_name": elem.nameOriginal || elem.nameEn || elem.nameRu || '',
        "overview": elem.description || elem.shortDescription || '',
        "img": elem.posterUrlPreview || elem.posterUrl || '',
        "background_image": elem.coverUrl || elem.posterUrl || elem.posterUrlPreview || '',
        "genres": elem.genres && elem.genres.map(function (e) {
          if (e.genre === 'для взрослых') {
            adult = true;
          }

          return {
            "id": e.genre && genres_map[e.genre] || 0,
            "name": e.genre,
            "url": ''
          };
        }) || [],
        "production_companies": [],
        "production_countries": elem.countries && elem.countries.map(function (e) {
          return {
            "name": e.country
          };
        }) || [],
        "vote_average": kp_rating,
        "vote_count": elem.ratingVoteCount || elem.ratingKinopoiskVoteCount || 0,
        "kinopoisk_id": kinopoisk_id,
        "kp_rating": kp_rating,
        "imdb_id": elem.imdbId || '',
        "imdb_rating": elem.ratingImdb || 0
      };
      result.adult = adult;
      var first_air_date = elem.year && elem.year !== 'null' ? elem.year : '';
      var last_air_date = '';

      if (type === 'tv') {
        if (elem.startYear && elem.startYear !== 'null') first_air_date = elem.startYear;
        if (elem.endYear && elem.endYear !== 'null') last_air_date = elem.endYear;
      }

      if (elem.distributions_obj) {
        var distributions = elem.distributions_obj.items || [];
        var year_timestamp = Date.parse(first_air_date);
        var min = null;
        distributions.forEach(function (d) {
          if (d.date && (d.type === 'WORLD_PREMIER' || d.type === 'ALL')) {
            var timestamp = Date.parse(d.date);

            if (!isNaN(timestamp) && (min == null || timestamp < min) && (isNaN(year_timestamp) || timestamp >= year_timestamp)) {
              min = timestamp;
              first_air_date = d.date;
            }
          }
        });
      }

      if (type === 'tv') {
        result.first_air_date = first_air_date;
        if (last_air_date) result.last_air_date = last_air_date;
      } else {
        result.release_date = first_air_date;
      }

      if (elem.seasons_obj) {
        var _seasons = elem.seasons_obj.items || [];

        result.number_of_seasons = elem.seasons_obj.total || _seasons.length || 1;
        result.seasons = _seasons.map(function (s) {
          return convertSeason(s);
        });
        var number_of_episodes = 0;
        result.seasons.forEach(function (s) {
          number_of_episodes += s.episode_count;
        });
        result.number_of_episodes = number_of_episodes;
      }

      if (elem.staff_obj) {
        var staff = elem.staff_obj || [];
        var cast = [];
        var crew = [];
        staff.forEach(function (s) {
          var person = convertPerson(s);
          if (s.professionKey === 'ACTOR') cast.push(person);else crew.push(person);
        });
        result.persons = {
          "cast": cast,
          "crew": crew
        };
      }

      if (elem.sequels_obj) {
        var sequels = elem.sequels_obj || [];
        result.collection = {
          "results": sequels.map(function (s) {
            return convertElem(s);
          })
        };
      }

      if (elem.similars_obj) {
        var similars = elem.similars_obj.items || [];
        result.simular = {
          "results": similars.map(function (s) {
            return convertElem(s);
          })
        };
      }

      return result;
    }

    function convertSeason(season) {
      var episodes = season.episodes || [];
      episodes = episodes.map(function (e) {
        return {
          "season_number": e.seasonNumber,
          "episode_number": e.episodeNumber,
          "name": e.nameRu || e.nameEn || 'S' + e.seasonNumber + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + e.episodeNumber,
          "overview": e.synopsis || '',
          "air_date": e.releaseDate
        };
      });
      return {
        "season_number": season.number,
        "episode_count": episodes.length,
        "episodes": episodes,
        "name": Lampa.Lang.translate('torrent_serial_season') + ' ' + season.number,
        "overview": ''
      };
    }

    function convertPerson(person) {
      return {
        "id": person.staffId,
        "name": person.nameRu || person.nameEn || '',
        "url": '',
        "img": person.posterUrl || '',
        "character": person.description || '',
        "job": Lampa.Utils.capitalizeFirstLetter((person.professionKey || '').toLowerCase())
      };
    }

    function cleanTitle(str) {
      return str.replace(/[\s.,:;’'`!?]+/g, ' ').trim();
    }

    function normalizeTitle(str) {
      return cleanTitle(str.toLowerCase().replace(/—/g, '-').replace(/ё/g, 'е'));
    }

    function containsTitle(str, title) {
      return typeof str === 'string' && typeof title === 'string' && normalizeTitle(str).indexOf(normalizeTitle(title)) !== -1;
    }

    function getList(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var url = method;

      if (params.query) {
        var clean_title = params.query && cleanTitle(decodeURIComponent(params.query));

        if (!clean_title) {
          onerror();
          return;
        }

        url = Lampa.Utils.addUrlComponent(url, 'keyword=' + encodeURIComponent(clean_title));
      }

      var page = params.page || 1;
      url = Lampa.Utils.addUrlComponent(url, 'page=' + page);
      getFromCache(url, function (json, cached) {
        var items = [];
        if (json.items && json.items.length) items = json.items;else if (json.films && json.films.length) items = json.films;else if (json.releases && json.releases.length) items = json.releases;
        if (!cached && items.length) setCache(url, json);
        var results = items.map(function (elem) {
          return convertElem(elem);
        });
        results = results.filter(function (elem) {
          return !elem.adult;
        });
        var total_pages = json.pagesCount || json.totalPages || 1;
        var res = {
          "results": results,
          "url": method,
          "page": page,
          "total_pages": total_pages,
          "total_results": 0,
          "more": total_pages > page
        };
        oncomplite(res);
      }, onerror);
    }

    function _getById(id) {
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var url = 'api/v2.2/films/' + id;
      var film = getCache(url);

      if (film) {
        setTimeout(function () {
          oncomplite(convertElem(film));
        }, 10);
      } else {
        get(url, function (film) {
          if (film.kinopoiskId) {
            var type = !film.type || film.type === 'FILM' || film.type === 'VIDEO' ? 'movie' : 'tv';
            getCompliteIf(type == 'tv', 'api/v2.2/films/' + id + '/seasons', function (seasons) {
              film.seasons_obj = seasons;
              getComplite('api/v2.2/films/' + id + '/distributions', function (distributions) {
                film.distributions_obj = distributions;
                getComplite('/api/v1/staff?filmId=' + id, function (staff) {
                  film.staff_obj = staff;
                  getComplite('api/v2.1/films/' + id + '/sequels_and_prequels', function (sequels) {
                    film.sequels_obj = sequels;
                    getComplite('api/v2.2/films/' + id + '/similars', function (similars) {
                      film.similars_obj = similars;
                      setCache(url, film);
                      oncomplite(convertElem(film));
                    });
                  });
                });
              });
            });
          } else onerror();
        }, onerror);
      }
    }

    function getById(id) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      menu({}, function () {
        return _getById(id, params, oncomplite, onerror);
      });
    }

    function main() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var parts_limit = 5;
      var parts_data = [function (call) {
        getList('api/v2.2/films/top?type=TOP_100_POPULAR_FILMS', params, function (json) {
          json.title = Lampa.Lang.translate('title_now_watch');
          call(json);
        }, call);
      }, function (call) {
        getList('api/v2.2/films/top?type=TOP_250_BEST_FILMS', params, function (json) {
          json.title = Lampa.Lang.translate('title_top_movie');
          call(json);
        }, call);
      }, function (call) {
        getList('api/v2.2/films?order=NUM_VOTE&type=FILM', params, function (json) {
          json.title = 'Популярные фильмы';
          call(json);
        }, call);
      }, function (call) {
        getList('api/v2.2/films?order=NUM_VOTE&type=TV_SERIES', params, function (json) {
          json.title = 'Популярные сериалы';
          call(json);
        }, call);
      }, function (call) {
        getList('api/v2.2/films?order=NUM_VOTE&type=MINI_SERIES', params, function (json) {
          json.title = 'Популярные мини-сериалы';
          call(json);
        }, call);
      }, function (call) {
        getList('api/v2.2/films?order=NUM_VOTE&type=TV_SHOW', params, function (json) {
          json.title = 'Популярные телешоу';
          call(json);
        }, call);
      }];

      function loadPart(partLoaded, partEmpty) {
        Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
      }

      menu({}, function () {
        var rus_id = countries_map['Россия'];

        if (rus_id) {
          parts_data.splice(3, 0, function (call) {
            getList('api/v2.2/films?order=NUM_VOTE&countries=' + rus_id + '&type=FILM', params, function (json) {
              json.title = 'Популярные российские фильмы';
              call(json);
            }, call);
          });
          parts_data.splice(5, 0, function (call) {
            getList('api/v2.2/films?order=NUM_VOTE&countries=' + rus_id + '&type=TV_SERIES', params, function (json) {
              json.title = 'Популярные российские сериалы';
              call(json);
            }, call);
          });
          parts_data.splice(7, 0, function (call) {
            getList('api/v2.2/films?order=NUM_VOTE&countries=' + rus_id + '&type=MINI_SERIES', params, function (json) {
              json.title = 'Популярные российские мини-сериалы';
              call(json);
            }, call);
          });
        }

        loadPart(oncomplite, onerror);
      });
      return loadPart;
    }

    function category() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var show = ['movie', 'tv'].indexOf(params.url) > -1 && !params.genres;
      var books = show ? Lampa.Favorite.continues(params.url) : [];
      books.forEach(function (elem) {
        if (!elem.source) elem.source = 'tmdb';
      });
      books = books.filter(function (elem) {
        return [SOURCE_NAME, 'tmdb', 'cub'].indexOf(elem.source) !== -1;
      });
      var recomend = show ? Lampa.Arrays.shuffle(Lampa.Recomends.get(params.url)).slice(0, 19) : [];
      recomend.forEach(function (elem) {
        if (!elem.source) elem.source = 'tmdb';
      });
      recomend = recomend.filter(function (elem) {
        return [SOURCE_NAME, 'tmdb', 'cub'].indexOf(elem.source) !== -1;
      });
      var parts_limit = 5;
      var parts_data = [function (call) {
        call({
          results: books,
          title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
        });
      }, function (call) {
        call({
          results: recomend,
          title: Lampa.Lang.translate('title_recomend_watch')
        });
      }];

      function loadPart(partLoaded, partEmpty) {
        Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
      }

      menu({}, function () {
        var priority_list = ['семейный', 'детский', 'короткометражка', 'мультфильм', 'аниме'];
        priority_list.forEach(function (g) {
          var id = genres_map[g];

          if (id) {
            parts_data.push(function (call) {
              getList('api/v2.2/films?order=NUM_VOTE&genres=' + id + '&type=' + (params.url == 'tv' ? 'TV_SERIES' : 'FILM'), params, function (json) {
                json.title = Lampa.Utils.capitalizeFirstLetter(g);
                call(json);
              }, call);
            });
          }
        });
        menu_list.forEach(function (g) {
          if (!g.hide && !g.separator && priority_list.indexOf(g.title) == -1) {
            parts_data.push(function (call) {
              getList('api/v2.2/films?order=NUM_VOTE&genres=' + g.id + '&type=' + (params.url == 'tv' ? 'TV_SERIES' : 'FILM'), params, function (json) {
                json.title = Lampa.Utils.capitalizeFirstLetter(g.title);
                call(json);
              }, call);
            });
          }
        });
        loadPart(oncomplite, onerror);
      });
      return loadPart;
    }

    function full() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;

      if (params.card && params.card.source === SOURCE_NAME && params.card.kinopoisk_id) {
        getById(params.card.kinopoisk_id, params, function (json) {
          var status = new Lampa.Status(4);
          status.onComplite = oncomplite;
          status.append('movie', json);
          status.append('persons', json && json.persons);
          status.append('collection', json && json.collection);
          status.append('simular', json && json.simular);
        }, onerror);
      } else onerror();
    }

    function list() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var method = params.url;

      if (method === '' && params.genres) {
        method = 'api/v2.2/films?order=NUM_VOTE&genres=' + params.genres;
      }

      getList(method, params, oncomplite, onerror);
    }

    function search() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var title = decodeURIComponent(params.query || '');
      var status = new Lampa.Status(1);

      status.onComplite = function (data) {
        var items = [];

        if (data.query && data.query.results) {
          var tmp = data.query.results.filter(function (elem) {
            return containsTitle(elem.name, title) || containsTitle(elem.original_name, title);
          });

          if (tmp.length && tmp.length !== data.query.results.length) {
            data.query.results = tmp;
            data.query.more = true;
          }

          var movie = Object.assign({}, data.query);
          movie.results = data.query.results.filter(function (elem) {
            return elem.type === 'movie';
          });
          movie.title = Lampa.Lang.translate('menu_movies');
          movie.type = 'movie';
          if (movie.results.length) items.push(movie);
          var tv = Object.assign({}, data.query);
          tv.results = data.query.results.filter(function (elem) {
            return elem.type === 'tv';
          });
          tv.title = Lampa.Lang.translate('menu_tv');
          tv.type = 'tv';
          if (tv.results.length) items.push(tv);
        }

        oncomplite(items);
      };

      getList('api/v2.1/films/search-by-keyword', params, function (json) {
        status.append('query', json);
      }, status.error.bind(status));
    }

    function discovery() {
      return {
        title: SOURCE_TITLE,
        search: search,
        params: {
          align_left: true,
          object: {
            source: SOURCE_NAME
          }
        },
        onMore: function onMore(params) {
          Lampa.Activity.push({
            url: 'api/v2.1/films/search-by-keyword',
            title: Lampa.Lang.translate('search') + ' - ' + params.query,
            component: 'category_full',
            page: 1,
            query: encodeURIComponent(params.query),
            source: SOURCE_NAME
          });
        },
        onCancel: network.clear.bind(network)
      };
    }

    function person() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status = new Lampa.Status(1);

      status.onComplite = function (data) {
        var result = {};

        if (data.query) {
          var p = data.query;
          result.person = {
            "id": p.personId,
            "name": p.nameRu || p.nameEn || '',
            "url": '',
            "img": p.posterUrl || '',
            "gender": p.sex === 'MALE' ? 2 : p.sex === 'FEMALE' ? 1 : 0,
            "birthday": p.birthday,
            "place_of_birth": p.birthplace,
            "deathday": p.death,
            "place_of_death": p.deathplace,
            "known_for_department": p.profession || '',
            "biography": (p.facts || []).join(' ')
          };
          var director_films = [];
          var director_map = {};
          var actor_films = [];
          var actor_map = {};

          if (p.films) {
            p.films.forEach(function (f) {
              if (f.professionKey === 'DIRECTOR' && !director_map[f.filmId]) {
                director_map[f.filmId] = true;
                director_films.push(convertElem(f));
              } else if (f.professionKey === 'ACTOR' && !actor_map[f.filmId]) {
                actor_map[f.filmId] = true;
                actor_films.push(convertElem(f));
              }
            });
          }

          var knownFor = [];

          if (director_films.length) {
            director_films.sort(function (a, b) {
              var res = b.vote_average - a.vote_average;
              if (res) return res;
              return a.id - b.id;
            });
            knownFor.push({
              "name": Lampa.Lang.translate('title_producer'),
              "credits": director_films
            });
          }

          if (actor_films.length) {
            actor_films.sort(function (a, b) {
              var res = b.vote_average - a.vote_average;
              if (res) return res;
              return a.id - b.id;
            });
            knownFor.push({
              "name": Lampa.Lang.translate(p.sex === 'FEMALE' ? 'title_actress' : 'title_actor'),
              "credits": actor_films
            });
          }

          result.credits = {
            "knownFor": knownFor
          };
        }

        oncomplite(result);
      };

      var url = 'api/v1/staff/' + params.id;
      getFromCache(url, function (json, cached) {
        if (!cached && json.personId) setCache(url, json);
        status.append('query', json);
      }, status.error.bind(status));
    }

    function menu() {
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      if (menu_list.length) oncomplite(menu_list);else {
        get('api/v2.2/films/filters', function (j) {
          if (j.genres) {
            j.genres.forEach(function (g) {
              menu_list.push({
                "id": g.id,
                "title": g.genre,
                "url": '',
                "hide": g.genre === 'для взрослых',
                "separator": !g.genre
              });
              genres_map[g.genre] = g.id;
            });
          }

          if (j.countries) {
            j.countries.forEach(function (c) {
              countries_map[c.country] = c.id;
            });
          }

          oncomplite(menu_list);
        }, function () {
          oncomplite([]);
        });
      }
    }

    function menuCategory(params, oncomplite) {
      oncomplite([]);
    }

    function seasons(tv, from, oncomplite) {
      var status = new Lampa.Status(from.length);
      status.onComplite = oncomplite;
      from.forEach(function (season) {
        var seasons = tv.seasons || [];
        seasons = seasons.filter(function (s) {
          return s.season_number === season;
        });

        if (seasons.length) {
          status.append('' + season, seasons[0]);
        } else {
          status.error();
        }
      });
    }

    var KP = {
      SOURCE_NAME: SOURCE_NAME,
      SOURCE_TITLE: SOURCE_TITLE,
      main: main,
      menu: menu,
      full: full,
      list: list,
      category: category,
      clear: clear,
      person: person,
      seasons: seasons,
      menuCategory: menuCategory,
      discovery: discovery
    };

    var ALL_SOURCES = [{
      name: 'tmdb',
      title: 'TMDB'
    }, {
      name: 'cub',
      title: 'CUB'
    }, {
      name: 'pub',
      title: 'PUB'
    }, {
      name: 'filmix',
      title: 'FILMIX'
    }, {
      name: KP.SOURCE_NAME,
      title: KP.SOURCE_TITLE
    }];

    function startPlugin() {
      window.kp_source_plugin = true;

      function addPlugin() {
        if (Lampa.Api.sources[KP.SOURCE_NAME]) {
          Lampa.Noty.show('Установлен плагин несовместимый с kp_source');
          return;
        }

        Lampa.Api.sources[KP.SOURCE_NAME] = KP;
        Object.defineProperty(Lampa.Api.sources, KP.SOURCE_NAME, {
          get: function get() {
            return KP;
          }
        });
        var sources;

        if (Lampa.Params.values && Lampa.Params.values['source']) {
          sources = Object.assign({}, Lampa.Params.values['source']);
          sources[KP.SOURCE_NAME] = KP.SOURCE_TITLE;
        } else {
          sources = {};
          ALL_SOURCES.forEach(function (s) {
            if (Lampa.Api.sources[s.name]) sources[s.name] = s.title;
          });
        }

        Lampa.Params.select('source', sources, 'tmdb');
      }

      if (window.appready) addPlugin();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') addPlugin();
        });
      }
    }

    if (!window.kp_source_plugin) startPlugin();

})();

(function () {
	'use strict';
//	Lampa.Storage.set("lmp_collection", true);

	
	var Protocol = function Protocol() {
		return window.location.protocol == 'https:' ? 'https://' : 'http://';
	}
	var API = '', /*type = '', /*jackets = {},*/ cards,/* ping_auth,*/ manifest, /*menu_list = [], /*user_id = 86914,*/ uid = '/*3cd26a8132842c8ee74bfe73d0ff3bbb_86914*/';
		console.log('App', 'protocol:', Protocol());

	var Lmp = {
		init: function () {
		//	this.collections();
			this.sources();
   	if (!window.FX) {
  			window.FX = {
  				max_qualitie: 720,
  				is_max_qualitie: true, 
  				auth: false
  			};
  		}

},
  sources: function () {
			var sources;
			if (Lampa.Params.values && Lampa.Params.values['source']) {
        sources = Object.assign({}, Lampa.Params.values['source']);
  //      sources.pub = 'PUB';
        sources.filmix = 'FILMIX';
      } else {
        sources = {
          'tmdb': 'TMDB',
          'cub': 'CUB',
    //      'pub': 'PUB',
          'filmix': 'FILMIX'
        };
      }

      Lampa.Params.select('source', sources, 'tmdb');
		},
		
/*collections: function () {
    var menu_item = $('<li class="menu__item selector" data-action="collection"><div class="menu__ico"><img src="./img/icons/kinopub.svg"/></div><div class="menu__text">Kinopubорки</div></li>');
    if (Lampa.Storage.get('lmp_collection')) $('body').find('[data-action="cols"]').before(menu_item);
    
    //if(!API || !API.length) window.location.reload();

    // Упрощаем логику выбора, устанавливая 'pub' как источник по умолчанию.
    menu_item.on('hover:enter', function () {
        Lampa.Activity.push({
            url: Pub.baseurl + 'v1/collections',
            sourc: 'pub',
            source: Lampa.Storage.field('source'),
            title: 'Подборки от kinopub',
            card_cat: true,
            category: true,
            component: 'collection',
            page: 1
        });
    });
},*/
	/*	Timer: function (tpl) {
      var self = this;
      self.tpl = tpl;
      self.startTime = 0;
      self.paused = true;
      self.msElapsed = 0;
      self.intervalId = null;
    
      self.start = function() {
        self.paused = false;
        self.startTime = Date.now();
        Lampa.Activity.active().activity.render().find(self.tpl).html('');
        self.intervalId = setInterval(function() {
          var curTime = Date.now();
          self.msElapsed = curTime - self.startTime;
          var sek = self.formatTime(self.msElapsed);
          Lampa.Activity.active().activity.render().find(self.tpl).html(sek);
        }, 100);
      };
      self.stop = function() {
        clearInterval(self.intervalId);
        self.intervalId = null;
        self.paused = true;
        return self.formatTime(self.msElapsed);
      };
      self.formatTime = function(ms) {
        var totalSeconds = Math.floor(ms / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        var milliseconds = Math.floor((ms % 1000) / 10);
        var sec = seconds < 10 ? '0' + seconds : seconds;
        var milsec = milliseconds < 10 ? '0' + milliseconds : milliseconds;
        return sec+':'+milsec+' c';
      };
    },*/
/*	last_view: function (data) {
			var episodes = Lampa.TimeTable.get(data);
			var viewed;
			episodes.forEach(function (ep) {
				var hash = Lampa.Utils.hash([ep.season_number, ep.episode_number, data.original_title].join(''));
				var view = Lampa.Timeline.view(hash);
				if (view.percent) viewed = {
					ep: ep,
					view: view
				};
			});
			if (viewed) {
				var ep = viewed.ep.episode_number;
				var se = viewed.ep.season_number;
				var last_view = 'S' + se + ':E' + ep;
				if ($('body').find('.full-start__buttons,.full-start-new__buttons').length) {
					$('.timeline, .card--last_view').remove();
					$('body').find('.full-start__poster,.full-start-new__poster').append("<div class='card--last_view' style='top:0.6em;right: -.5em;position: absolute;background: #168FDF;color: #fff;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'><div style='float:left;margin:-5px 0 -4px -4px' class='card__icon icon--history'></div>" + last_view +"</div>").parent().append('<div class="timeline" style="position:relative;"></div>');
					$('body').find('.timeline').append(Lampa.Timeline.render(viewed.view));
				}
				if ($('body').find('.filter--sort').length) $('body').find('.files__left .time-line, .card--last_view').remove();
			} else $('body').find('.timeline,.card--last_view').remove();
			if ($('body').find('.online').length == 0) $('.card--new_ser,.card--viewed').remove();
		},*/
	/*	serialInfo: function (card) {
			if (Lampa.Storage.field('lmp_serial_info') && card.source == 'tmdb' && card.seasons && card.last_episode_to_air) {
				var last_seria_inseason = card.last_episode_to_air.season_number;
				var air_new_episode = card.last_episode_to_air.episode_number;
				var next_episode = card.next_episode_to_air;
				var last_seria = next_episode && new Date(next_episode.air_date) <= Date.now() ? next_episode.episode_number : card.last_episode_to_air.episode_number;
				var new_ser;
				this.last_view(card);
				var count_eps_last_seas = card.seasons.find(function (eps) {
				 	return eps.season_number == last_seria_inseason;
				}).episode_count;
				//if(!API || !API.length) window.location.reload();
				
				if (card.next_episode_to_air) {
					var add_ = '<b>' + last_seria;
					var notices = Lampa.Storage.get('account_notice', []).filter(function (n) {
						return n.card_id == card.id;
					});
					if (notices.length) {
						var notice = notices.find(function (itm) {
						  return itm.episode == last_seria;
						});
						
						if (notice) {
  						var episod_new = JSON.parse(notice.data).card.seasons;
  						if (Lampa.Utils.parseTime(notice.date).full == Lampa.Utils.parseTime(Date.now()).full) 
  						add_ = '#{season_new} <b>' + episod_new[last_seria_inseason];
  					} 
					}
					new_ser = add_ + '</b> #{torrent_serial_episode} #{season_from} ' + count_eps_last_seas + ' - S' + last_seria_inseason;
				} else new_ser = last_seria_inseason + ' #{season_ended}';
		
				if(!$('.card--new_seria', Lampa.Activity.active().activity.render()).length) {
  				if(window.innerWidth > 585) $('.full-start__poster,.full-start-new__poster', Lampa.Activity.active().activity.render()).append("<div class='card--new_seria' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;bottom:.6em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate(new_ser) + "</div>");
  			  else {
  			    if($('.card--new_seria', Lampa.Activity.active().activity.render()).length)$('.full-start__tags', Lampa.Activity.active().activity.render()).append('<div class="full-start__tag card--new_seria"><img src="./img/icons/menu/movie.svg" /> <div>'+ Lampa.Lang.translate(new_ser) +'</div></div>');
  			    else $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<span class="full-start-new__split">●</span><div class="card--new_seria"><div>'+ Lampa.Lang.translate(new_ser) +'</div></div>');
  			  }
  		  }
			}
		},*/ 
/*	  rating_kp_imdb:function (card) {
			return new Promise(function (resolve, reject) {
  			var relise = (card.number_of_seasons ? card.first_air_date : card.release_date) || '0000';
  			var year = parseInt((relise + '').slice(0, 4));
    	//	if (Lampa.Storage.field('lmp_rating') && $('.rate--kp', Lampa.Activity.active().activity.render()).hasClass('hide') && !$('.wait_rating', Lampa.Activity.active().activity.render()).length) 
  		  if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('lmp_rating'))
  		  //if(!API || !API.length) window.location.reload();
  		  $('.info__rate', Lampa.Activity.active().activity.render()).after('<div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div><div>');
  		  Pub.network.clear();
  			Pub.network.timeout(10000);
  			Pub.network.silent(API + 'KPrating', function (json) {
  				if(!card.kinopoisk_id && json.data && json.data.kp_id) card.kinopoisk_ID = json.data.kp_id;
  				var kp = json.data && json.data.kp_rating || 0;
  				var imdb = json.data && json.data.imdb_rating || 0;
  				var auth = json.data.auth;
  	
 				var kp_rating = !isNaN(kp) && kp !== null ? parseFloat(kp).toFixed(1) : '0.0';
  				var imdb_rating = !isNaN(imdb) && imdb !== null ? parseFloat(imdb).toFixed(1) : '0.0';
  				if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('lmp_rating')){
  					$('.wait_rating',Lampa.Activity.active().activity.render()).remove();
  					$('.rate--imdb', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(imdb_rating);
  					$('.rate--kp', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(kp_rating);
  				} 
  				resolve();
  			}, function (a, c) {
  				resolve();
  				Lampa.Noty.show('lmps ОШИБКА Рейтинг KP   ' + Pub.network.errorDecode(a, c));
  			}, {
  			  title:card.title, 
  			  year: year, 
  			  card_id:card.id, 
  			  imdb: card.imdb_id,
  			  user_id: user_id, 
  			  uid: uid
  			});
			});
		}, */
	/*  check: function(name, call) {
      var json = Lmpsh.jack[name];
      var item = $('.settings-param__status.one');
      var item2 = $('.settings-param__status.act');
      var url = (json && json.url || Lampa.Storage.get('jackett_url'));
      var u = url + '/api/v2.0/indexers/' + (Lampa.Storage.field('jackett_interview') == 'healthy' ? 'status:healthy' : 'all') + '/results?apikey=' + (json && json.key || Lampa.Storage.get('jackett_key'));
      Pub.network.timeout(10000);
      var check = function check (ok) {
        Pub.network["native"](Protocol() + u, function (t) {
          if(name && !call) item2.removeClass('active error wait').addClass('active');
          if(call) {
            if(name && !Lmpsh.jack[name].check) Lmpsh.jack[name].check = true;
            if(name && !Lmpsh.jack[name].ok) Lmpsh.jack[name].ok = true;
            call(true);
          }
        }, function (a, c) {
          console.error('Request', 'parser error - ', Protocol() + u);
          Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - ' + url);
          if(name && !call) item2.removeClass('active error wait').addClass('error');
          if(call) {
            if(ok && name && !Lmpsh.jack[name].check) Lmpsh.jack[name].check = true;
            if(ok && name && !Lmpsh.jack[name].ok) Lmpsh.jack[name].ok = false;
            call(false);
          }
        });
      };
      if(name && !call) check();
      else if(call && name && !Lmpsh.jack[name].check) check(true);
      else {
        if(name && Lmpsh.jack[name].ok) if(call) call(true);
        if(name && !Lmpsh.jack[name].ok) if(call) call(false);
        if(Boolean(Lmpsh.jack[Lampa.Storage.get('jackett_url2')])) item.removeClass('wait').addClass(Lmpsh.jack[Lampa.Storage.get('jackett_url2')].ok ? 'active' : 'error');
      }
    },*/
    /*jack:{					
      lampishe:         {url:'jack.letz.dev', key:'lampishe',lang:'df_lg', interv:'all'},
	  viewbox:       	{url:'jacred.viewbox.dev', key:'viewbox',lang:'df_lg', interv:'all'},
      jacred_xyz:       {url:'jacred.xyz', key:' ',lang:'df_lg', interv:'all'},
      jac_lampa32_ru:   {url:'jac.lampa32.ru', key:' ',lang:'lg', interv:'all'},
      spawn_jackett:    {url:'spawn.pp.ua:59117', key:'2',lang:'df', interv:'all'},
      spawn_jacred:     {url:'spawn.pp.ua:59118', key:' ',lang:'lg', interv:'all'},
      jacred_ru:        {url:'jacred.ru', key:' ',lang:'lg', interv:'healthy'},
      jac_unknown:      {url:'188.119.113.252:9117', key:'1',lang:'lg', interv:'healthy'},
    },*/
   /*CACHE_TIME: 1000 * 60 * 60 * 2,
    getCache: function(key, data) {
      var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {}); //500 это лимит ключей
			if (cache[key]) {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					// Если кеш истёк, чистим его
					delete cache[key];
					Lampa.Storage.set(data, cache);
					return false;
				}
			} else return false;
			return cache[key];
		},*/ 
    setCache: function(key, data) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {}); //500 это лимит ключей
			if (!cache[key]) {
				cache[key] = data;
				Lampa.Storage.set(key, cache);
			} else {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					data.timestamp = timestamp;
					cache[key] = data;
					Lampa.Storage.set(key, cache);
				} else data = cache[key];
			}
			return data;
		}
	}; 
	var Filmix = {
  	network: new Lampa.Reguest(),
  	api_url: 'http://filmixapp.cyou/api/v2/',
  	token: Lampa.Storage.get('filmix_token', ''),
  	user_dev: 'app_lang=ru_RU&user_dev_apk=2.1.2&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=',
  	add_new: function () {
  		var user_code = '';
  		var user_token = '';
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">Ожидаем код...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
  		Lampa.Modal.open({
  			title: '',
  			html: modal,
  			onBack: function onBack() {
  				Lampa.Modal.close();
  				Lampa.Controller.toggle('settings_component');
  				clearInterval(ping_auth);
  			},
  			onSelect: function onSelect() {
  				Lampa.Utils.copyTextToClipboard(user_code, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  				}, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  				});
  			}
  		});
  		ping_auth = setInterval(function () {
  			Filmix.checkPro(user_token, function (json) {
  				if (json && json.user_data) {
  					Lampa.Modal.close();
  					clearInterval(ping_auth);
  					Lampa.Storage.set("filmix_token", user_token);
  					Filmix.token = user_token;
  					$('[data-name="filmix_token"] .settings-param__value').text(user_token);
  					Lampa.Controller.toggle('settings_component');
  				}
  			});
  		}, 2000);
  		this.network.clear();
  		this.network.timeout(10000);
  		this.network.quiet(this.api_url + 'token_request?' + this.user_dev, function (found) {
  			if (found.status == 'ok') {
  				user_token = found.code;
  				user_code = found.user_code;
  				modal.find('.selector').text(user_code);
  			} else {
  				Lampa.Noty.show(found);
  			}
  		}, function (a, c) {
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c));
  		});
  	}  };
	var Pub = {
  	network: new Lampa.Reguest(),
  	baseurl: 'http://cors.lampa32.ru/https://api.service-kp.com',
  	tock: 'crz384rhwkadtp32mh8vo5a8wsk59j0r',
  	token: Lampa.Storage.get('pub_access_token', 'crz384rhwkadtp32mh8vo5a8wsk59j0r'),
  	openBrowser: function (url) {
 	},
  	/*Auth_pub: function () {
  		Pub.network.silent(Pub.baseurl + 'oauth2/device', function (json) {
  			Lampa.Storage.set('pub_user_code', json.user_code);
  			Lampa.Storage.set('pub_code', json.code);
  			Pub.checkAdd();
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		}, {
  			'grant_type': 'device_code',
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},*/
  refreshTok: function () {
  		this.network.silent(Pub.baseurl + 'oauth2/token', function (json) {
  			Lampa.Storage.set('pub_access_token', json.access_token);
  			Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  			Pub.token = Lampa.Storage.get('pub_access_token');
  			Lampa.Noty.show('ТОКЕН обновлён');
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		}, {
  			'grant_type': 'refresh_token',
  			'refresh_token': Lampa.Storage.get('pub_refresh_token'),
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
 };
  	
 

  var proxyInitialized = false;
  var proxyWindow;
  var proxyCalls = {};
  
	
	function collection(object) {
  	var network = new Lampa.Reguest();
  	var scroll = new Lampa.Scroll({
  		mask: true,
  		over: true,
  		step: 250
  	});
  	var items = [];
  	var html = $('<div></div>');
  	var body = $('<div class="category-full"></div>');
  	var cors = object.sour == 'rezka' || object.sourc == 'rezka' ? Lampa.Utils.protocol() + 'prox.lampa.stream/' : object.sour == 'filmix' || object.sourc == 'filmix' ? 'http://corsanywhere.herokuapp.com/' : '';
  	var cache = Lampa.Storage.cache('my_col', 5000, {});
  	var info;
  	var last;
  	var waitload = false;
  	var relises = [];
  	var total_pages;
  	var _this1 = this;
 this.create = function () {
    var _this = this;
    var url;
    object.sourc = object.sourc || 'pub'; // Установка 'pub' в качестве источника по умолчанию

    if (object.sourc == 'my_coll') {
        _this.build({
            card: cache
        });
    } else {
        if (object.card && isNaN(object.id)) url = object.id;
        else url = object.url + (object.sourc == 'pub' ? '?sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token : '?filter=last');

        this.activity.loader(true);
        network.silent(cors + url, function (str) {
            var data = _this.card(str);
            _this.build(data);
            if (object.card) $('.head__title').append(' - ' + data.card.length);
        }, function (a, c) {
            _this.empty(network.errorDecode(a, c));
        }, false, {
            dataType: 'text'
        });
    }
    return this.render();
};

 	this.next = function (page) {
  		var _this2 = this;
  		var url;
  		if (total_pages == 0 || total_pages == page) waitload = true;
  		if (waitload) return;
  		waitload = true;
  		object.page++;
  		network.clear();
  		network.timeout(1000 * 40);
  		if (typeof page == 'undefined') return;
  		if (object.sourc == 'pub' && object.sour !== 'rezka') url = object.url + '?page=' + object.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  		else if ((object.sourc == 'rezka' || object.sour == 'rezka') && object.data && object.data.page) url = object.data.page;
  		else url = page.replace(/(\d+)\/\?filter/,object.page+'/?filter');
  		network.silent(cors + url, function (result) {
  			var data = _this2.card(result);
  			object.data = data;
  			_this2.append(data, true);
  			if (data.card.length) waitload = false;
  			//Lampa.Controller.toggle('content');
  			_this2.activity.loader(false);
  		}, function (a, c) {
  			Lampa.Noty.show(network.errorDecode(a, c));
  		}, false, {
  			dataType: 'text'
  		});
  	};
  	this.append = function (data, append) {
  		var _this1 = this;
  		var datas = Lampa.Arrays.isArray(data.card) ? data.card : Lampa.Arrays.getValues(data.card).reverse();
  		datas.forEach(function (element) {
  			var card = new Lampa.Card(element, {
  				card_category: object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? true : false,
  				card_collection: object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? false : true,
  				object: object
  			});
  			card.create();
  			if(object.category && (element.watch || element.quantity)) card.render().find('.card__view').append('<div style="background-color: rgba(0,0,0, 0.7);padding:.5em;position:absolute;border-radius:.3em;right:3;bottom:3">' + (element.watch || element.quantity) + '</div>');
  			card.onFocus = function (target, card_data) {
  				last = target;
  				scroll.update(card.render(), true);
  				Lampa.Background.change(card_data.img);
  				if (scroll.isEnd()) _this1.next(data.page);
  				if (!Lampa.Platform.tv() || !Lampa.Storage.field('light_version')) {
  					var maxrow = Math.ceil(items.length / 7) - 1;
  					//if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this1.next(data.page);
  				}
  			};
  			card.onEnter = function (target, card_data) {
  				last = target;
  				if (object.sour == 'rezka' || object.sour == 'filmix' || (Lampa.Storage.field('light_version') && !object.cards) && !object.card_cat || object.cards) {
  					Lampa.Api.search({
  						query: encodeURIComponent(element.title_org)
  					}, function (find) {
  						var finded = _this1.finds(element, find);
  						if (finded) {
  							Lampa.Activity.push({
  								url: '',
  								component: 'full',
  								id: finded.id,
  								method: finded.name ? 'tv' : 'movie',
  								card: finded
  							});
  						} else {
  							Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  							Lampa.Controller.toggle('content');
  						}
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  						Lampa.Controller.toggle('content');
  					});
  				} else if (object.sourc == 'pub' || object.sourc == 'my_coll') {
  					Lampa.Activity.push({
  						title: element.title,
  						url: object.url + '/view?id=' + (object.sourc == 'my_coll' ? element.id : element.url) + '&access_token=' + Pub.token,
  						sourc: 'pub',
  						sour: element.source,
  						source: 'pub',
  						id: element.url,
  						card: element,
  						card_cat: true,
  						component: !object.category ? 'full' : 'collection',
  						page: 1
  					});
  				} else {
  					Lampa.Activity.push({
  						title: element.title,
  						url: element.url,
  						component: 'collection',
  						cards: true,
  						sourc: object.sourc,
  						source: object.source,
  						page: 1
  					});
  				}
  			};
  			card.onMenu = function (target, data) {
  				var _this2 = this;
  				var enabled = Lampa.Controller.enabled().name;
  				var status = Lampa.Favorite.check(data);
  				var items = [];
  				if (object.category) {
  					items.push({
  						title: cache['id_' + data.id] ? Lampa.Lang.translate('card_my_clear') : Lampa.Lang.translate('card_my_add'),
  						subtitle: Lampa.Lang.translate('card_my_descr'),
  						where: 'book'
  					});
  				} else {
  					items.push({
  						title: status.book ? Lampa.Lang.translate('card_book_remove') : Lampa.Lang.translate('card_book_add'),
  						subtitle: Lampa.Lang.translate('card_book_descr'),
  						where: 'book'
  					}, {
  						title: status.like ? Lampa.Lang.translate('card_like_remove') : Lampa.Lang.translate('card_like_add'),
  						subtitle: Lampa.Lang.translate('card_like_descr'),
  						where: 'like'
  					}, {
  						title: status.wath ? Lampa.Lang.translate('card_wath_remove') : Lampa.Lang.translate('card_wath_add'),
  						subtitle: Lampa.Lang.translate('card_wath_descr'),
  						where: 'wath'
  					}, {
  						title: status.history ? Lampa.Lang.translate('card_history_remove') : Lampa.Lang.translate('card_history_add'),
  						subtitle: Lampa.Lang.translate('card_history_descr'),
  						where: 'history'
  					});
  				}
  				Lampa.Select.show({
  					title: Lampa.Lang.translate('title_action'),
  					items: items,
  					onBack: function onBack() {
  						Lampa.Controller.toggle(enabled);
  					},
  					onSelect: function onSelect(a) {
  						if (a.where == 'clear') {
  							Lampa.Storage.set('my_col', '');
  							Lampa.Activity.push({
  								url: object.url,
  								sourc: object.sourc,
  								source: object.source,
  								title: object.title,
  								card_cat: true,
  								category: true,
  								component: 'collection',
  								page: 1
  							});
  							Lampa.Noty.show(Lampa.Lang.translate('saved_collections_clears'));
  						} else if (object.category) {
  							data.source = object.sourc;
  							_this1.favorite(data, card.render());
  						} else {
  							if (object.sour == 'filmix' || object.sour == 'rezka' || object.sourc == 'rezka' || object.sourc == 'filmix') {
  								Lampa.Api.search({
  									query: encodeURIComponent(data.title_org)
  								}, function (find) {
  									var finded = _this1.finds(data, find);
  									if (finded) {
  										finded.url = (finded.name ? 'tv' : 'movie') + '/' + finded.id;
  										Lampa.Favorite.toggle(a.where, finded);
  									} else {
  										Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  										Lampa.Controller.toggle('content');
  									}
  								}, function () {
  									Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  									Lampa.Controller.toggle('content');
  								});
  							} else {
  								data.source = object.source;
  								Lampa.Favorite.toggle(a.where, data);
  							}
  							_this2.favorite();
  						}
  						Lampa.Controller.toggle(enabled);
  					}
  				});
  			};
  			card.visible();
  			body.append(card.render());
  			if (cache['id_' + element.id]) _this1.addicon('book', card.render());
  			if (append) Lampa.Controller.collectionAppend(card.render());
  			items.push(card);
  		});
  	};
  	this.addicon = function (name, card) {
  		card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
  	};
  	this.favorite = function (data, card) {
  		var _this = this;
  		if (!cache['id_' + data.id]) {
  			cache['id_' + data.id] = data;
  			Lampa.Storage.set('my_col', cache);
  		} else {
  			delete cache['id_' + data.id];
  			Lampa.Storage.set('my_col', cache);
  			Lampa.Activity.push({
  				url: object.url,
  				sourc: object.sourc,
  				source: object.source,
  				title: object.title,
  				card_cat: true,
  				category: true,
  				component: 'collection',
  				page: 1
  			});
  		}
  		card.find('.card__icon').remove();
  		if (cache['id_' + data.id]) _this.addicon('book', card);
  	};
  	this.build = function (data) {
  		var _this1 = this;
  		if (data.card.length || Lampa.Arrays.getKeys(data.card).length) {
// Добавление нового шаблона в Lampa.Template
/*Lampa.Template.add('info_coll', 
    Lampa.Lang.translate(
         '<div class="info layer--width" style="height:6.2em">' +
            '<div class="info__left">' +
                '<div class="info__title"></div>' +
                '<div class="info__title-original"></div>' +
                '<div class="info__create"></div>' + */
    /*             Кнопка поиска с иконкой лупы
                 '<div class="full-start__button selector view--category">' +
                    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">' +
                         '<path fill="currentColor" d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848S326.847,409.323,225.474,409.323z"/>' +
                         '<path fill="currentColor" d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/>' +
                     '</svg>' +
                     '<span>#{pub_search_coll}</span>' + 
                 '</div>' +
             '</div>' +
             '<div class="info__right">' +
                 Кнопка фильтра с иконкой меню
                 '<div class="full-start__button selector view--filter">' +
                     '<svg style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 24 24">' +
                         '<g><path d="M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z" fill="currentColor"/>' +
                         '<path d="M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z" fill="currentColor"/>' +
                         '<path d="M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z" fill="currentColor"/></g>' +
                     '</svg>' +
                     '<span>#{title_filter}</span>' +
                 '</div>' +
             '</div>' +
         '</div>'
    )
);*/

  		/*	info = Lampa.Template.get('info_coll');
  			info.find('.view--category').on('hover:enter hover:click', function () {
  				Lampa.Input.edit({
  					value: '',
  					free: true
  				}, function (name) {
  					if (name == '') {
  						Lampa.Controller.toggle('content');
  						return;
  					}
  					Lampa.Activity.push({
  						title: 'Поиск по - ' + name,
  						url: Pub.baseurl + 'v1/collections',
  						component: 'collection',
  						search: name,
  						card_cat: true,
  						category: true,
  						sourc: 'pub',
  						source: 'pub',
  						page: 1
  					});
  				});
  			});*/
  		/*	info.find('.view--filter').on('hover:enter hover:click', function () {
  				var enabled = Lampa.Controller.enabled().name;
  				var items = [{
  					title: Lampa.Lang.translate('pub_sort_views'),
  					id: 'views-'
  				}, {
  					title: Lampa.Lang.translate('pub_sort_watchers'),
  					id: 'watchers-'
  				}, {
  					title: Lampa.Lang.translate('pub_sort_updated'),
  					id: 'updated-'
  				}, {
  					title: Lampa.Lang.translate('pub_sort_created'),
  					id: 'created-'
  				}].filter(function (el, i) {
  					if (object.sort == el.id) el.selected = true;
  					return el;
  				});
  				Lampa.Select.show({
  					title: Lampa.Lang.translate('title_filter'),
  					items: items,
  					onBack: function onBack() {
  						Lampa.Controller.toggle(enabled);
  					},
  					onSelect: function onSelect(a) {
  						Lampa.Activity.push({
  							title: Lampa.Lang.translate('title_filter') + ' ' + a.title.toLowerCase(),
  							url: Pub.baseurl + 'v1/collections',
  							component: 'collection',
  							sort: a.id,
  							card_cat: true,
  							category: true,
  							sourc: 'pub',
  							source: 'pub',
  							page: 1
  						});
  					}
  				});
  			});*/
  			scroll.render().addClass('layer--wheight').data('mheight', info);
  			if (object.sourc == 'pub' && object.category) html.append(info);
  			html.append(scroll.render());
  			scroll.onEnd = function(){
  			  _this1.next(data.page);
  			}
  			this.append(data);
  	
  		//	if (Lampa.Platform.tv() && Lampa.Storage.field('light_version')) this.more(data);
  			scroll.append(body);
  			this.activity.loader(false);
  			this.activity.toggle();
  		} else {
  			html.append(scroll.render());
  			this.empty(object.search ? Lampa.Lang.translate('online_query_start') + ' (' + object.search + ') ' + Lampa.Lang.translate('online_query_end') : '');
  		}
  	};
  	this.empty = function (msg) {
  		var empty = msg == undefined ? new Lampa.Empty() : new Lampa.Empty({
  		  title: '',
  			descr: msg
  		});
  		html.append(empty.render());
  		_this1.start = empty.start;
  		_this1.activity.loader(false);
  		_this1.activity.toggle();
  	};
  	this.more = function (data) {
  		var _this = this;
  	//	var more = $('<div class="category-full__more selector"><span>' + Lampa.Lang.translate('show_more') + '</span></div>');
  	//	more.on('hover:focus hover:touch', function (e) {
  			Lampa.Controller.collectionFocus(last || false, scroll.render());
  			var next = Lampa.Arrays.clone(object);
  			if (data.total_pages == 0 || data.total_pages == undefined) {
  				more.remove();
  				return;
  			}
  			network.clear();
  			network.timeout(1000 * 20);
  			var url;
  			if (object.sourc == 'pub') url = object.url + '?page=' + data.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  			else url = data.page;
  			network.silent(cors + url, function (result) {
  				var card = _this.card(result);
  				next.data = card;
  				if (object.cards) next.cards = false;
  				delete next.activity;
  				next.page++;
  				if (card.card.length == 0) more.remove();
  				else Lampa.Activity.push(next);
  			}, function (a, c) {
  				Lampa.Noty.show(network.errorDecode(a, c));
  			}, false, {
  				dataType: 'text'
  			});
  	//	});
  		body.append(more);
  	};
  	this.back = function () {
  		last = items[0].render()[0];
  		var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
  		more.on('hover:focus', function (e) {
  			if (object.page > 1) {
  				Lampa.Activity.backward();
  			} else {
  				Lampa.Controller.toggle('head');
  			}
  		});
  		body.prepend(more);
  	};
  	this.card = function (str) {
  		var card = [];
  		var page;
  		if (object.sourc != 'pub') str = str.replace(/\n/g, '');
		else if (object.card && object.card.source == 'filmix' || object.sourc == 'filmix') {
  			var d = $('.playlist-articles', str);
  			var str = d.length ? d.html() : $('.m-list-movie', str).html();
  			$(str).each(function (i, html) {
  				if (html.tagName == 'DIV') {
  					page = $(html).find('.next').attr('href');
  					total_pages = $(html).find('a:last-child').length;
  				}
  				if (html.tagName == 'ARTICLE') card.push({
  					id: $('a', html).attr('href').split('-')[0].split('/').pop(),
  					title: $('.m-movie-title', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').shift()),
  					title_org: $('.m-movie-original', html).text() || $('.origin-name', html).text(),
  					url: $('a', html).attr('href'),
  					img: $('img', html).attr('src'),
  					quantity: $('.m-movie-quantity', html).text() || $('.count', html).text(),
  					year: $('.grid-item', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').pop())
  				});
  			});
  		} else if (object.card && object.card.source == 'pub' || object.sourc == 'pub') {
  			str = JSON.parse(str);
  			if (str.pagination) {
  				total_pages = str.pagination.total + 1;
  				page = str.pagination.current + 1;
  			}
  			if (str.items) str.items.forEach(function (element) {
  				card.push({
  					url: element.id,
  					id: element.id,
  				
  					title: element.title.split('/')[0],
  					original_title: element.title.split('/')[1] || element.title,
  					release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
  					first_air_date: element.type && (element.type.match('serial|docuserial|tvshow') ? 'tv' : '') || '',
  					vote_average: element.imdb_rating || 0,
  					img: element.posters.big,
  					year: element.year,
  					years: element.years
  				});
  			});
  		}
  		return {
  			card: card,
  			page: page,
  			total_pages: total_pages
  		};
  	};
  	this.finds = function (element, find) {
  		var finded;
  		var filtred = function filtred(items) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];
  				if ((element.title_org == (item.original_title || item.original_name) || element.title == (item.title || item.name)) && (item.first_air_date || item.release_date) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
  					finded = item;
  					break;
  				}
  			}
  		};
  		if (find.movie && find.movie.results.length) filtred(find.movie.results);
  		if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
  		return finded;
  	};
  	this.start = function () {
  		Lampa.Controller.add('content', {
  			toggle: function toggle() {
  				Lampa.Controller.collectionSet(scroll.render(), info);
  				Lampa.Controller.collectionFocus(last || false, scroll.render());
  			},
  			left: function left() {
  				if (Navigator.canmove('left')) Navigator.move('left');
  				else Lampa.Controller.toggle('menu');
  			},
  			right: function right() {
  				Navigator.move('right');
  			},
  			up: function up() {
  				if (Navigator.canmove('up')) Navigator.move('up');
  				else Lampa.Controller.toggle('head');
  			},
  			down: function down() {
  				if (Navigator.canmove('down')) Navigator.move('down');
  			},
  			back: function back() {
  				Lampa.Activity.backward();
  			}
  		});
  		Lampa.Controller.toggle('content');
  	};
  	this.pause = function () {};
  	this.stop = function () {};
  	this.render = function () {
  		return html;
  	};
  	this.destroy = function () {
  		network.clear();
  		Lampa.Arrays.destroy(items);
  		scroll.destroy();
  		html.remove();
  		body.remove();
  		network = null;
  		items = null;
  		html = null;
  		body = null;
  		info = null;
  	};
  }
	
	
	function startPlugin() {
		//window.plugin_lmpsh = true;

//		Lampa.Component.add('collection', collection);
		
		/*Lampa.Template.add('onlines_v1', "<div class='online onlines_v1 selector'><div class='online__body'><div style='position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em'><svg style='height: 2.4em; width:  2.4em;' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'>   <circle cx='64' cy='64' r='56' stroke='white' stroke-width='16'/>   <path d='M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z' fill='white'/></svg>  </div><div class='online__title' style='padding-left: 2.1em;'>{title}</div><div class='online__quality' style='padding-left: 3.4em;'>{quality}{info}</div> </div></div>");
		Lampa.Template.add('lmpsh_online_css', "<style>@charset 'UTF-8';.full-start-new__buttons .full-start__button.view--lmpsh_online span{display:block;} .online_lmpsh__episode-number-season{font-size:1em;font-weight:700;color:#fff;position:absolute;top:.5em;right:.5em;background-color: rgba(0, 0, 0, 0.4);padding:0.2em;-webkit-border-radius: 0.3em;moz-border-radius: 0.3em;border-radius: 0.3em;} .online_lmpsh{position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online_lmpsh__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online_lmpsh__body{padding:.8em 1.2em}}.online_lmpsh__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online_lmpsh__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online_lmpsh__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online_lmpsh__img{width:7em;min-height:6em}}.online_lmpsh__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online_lmpsh__folder>svg{width:4.4em!important;height:4.4em!important}.online_lmpsh__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_lmpsh__subtitle{position:absolute;bottom:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_lmpsh__viewed>svg, .online_lmpsh__subtitle>svg{width:1.5em!important;height:1.5em!important;}.online_lmpsh__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online_lmpsh__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-moz-background-size:contain;-o-background-size:contain;background-size:contain}.online_lmpsh__head,.online_lmpsh__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_lmpsh__timeline{margin:.8em 0}.online_lmpsh__timeline>.time-line{display:block !important}.online_lmpsh__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online_lmpsh__title{font-size:1.4em}}.online_lmpsh__time{padding-left:2em}.online_lmpsh__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_lmpsh__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online_lmpsh__quality{padding-left:1em;white-space:nowrap}.online_lmpsh__scan-file{position:absolute;bottom:0;left:0;right:0}.online_lmpsh__scan-file .broadcast__scan{margin:0}.online_lmpsh .online_lmpsh-split{font-size:.8em;margin:0 1em;flex-shrink: 0;}.online_lmpsh.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;-moz-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online_lmpsh+.online_lmpsh{margin-top:1.5em}.online_lmpsh--folder .online_lmpsh__footer{margin-top:.8em}.online_lmpsh-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_lmpsh-rate>svg{width:1.3em!important;height:1.3em!important;}.online_lmpsh-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em} .online-lmpsh-watched{padding:1em}.online-lmpsh-watched__icon>svg{width:1.5em!important;height:1.5em!important;}.online-lmpsh-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-lmpsh-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}   </style>");
		Lampa.Template.add('lmpsh_online_full', "<div class=\"online_lmpsh online_lmpsh--full selector\"><div class=\"online_lmpsh__img\">    <img alt=\"\">    <div class=\"online_lmpsh__loader\"></div></div><div class=\"online_lmpsh__body\">    <div class=\"online_lmpsh__head\">        <div class=\"online_lmpsh__title\">{title}</div>        <div class=\"online_lmpsh__time\">{serv} {time}</div>    </div><div class=\"online_lmpsh__timeline\"></div><div class=\"online_lmpsh__footer\">        <div class=\"online_lmpsh__info\">{info}</div>        <div class=\"online_lmpsh__quality\">{quality}</div>    </div></div>    </div>");
		Lampa.Template.add('lmpsh_does_not_answer', "<div class=\"online-empty\"><div class=\"online-empty__title\">    {title}</div><div class=\"online-empty__time\">    #{lmpsh_balanser_timeout}</div><div class=\"online-empty__buttons\">    <div class=\"online-empty__button selector cancel\">#{cancel}</div>    <div class=\"online-empty__button selector change\">#{lmpsh_change_balanser}</div></div><div class=\"online-empty__templates\">    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div></div>    </div>");
		Lampa.Template.add('lmpsh_online_rate', "<div class=\"online_lmpsh-rate\"><svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">    <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path></svg><span>{rate}</span>    </div>");
		Lampa.Template.add('lmpsh_online_folder', "<div class=\"online_lmpsh online_lmpsh--folder selector\"><div class=\"online_lmpsh__folder\">    <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>        <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>        <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>    </svg></div><div class=\"online_lmpsh__body\">    <div class=\"online_lmpsh__head\">        <div class=\"online_lmpsh__title\">{title}</div>        <div class=\"online_lmpsh__time\">{time}</div>    </div><div class=\"online_lmpsh__footer\">        <div class=\"online_lmpsh__info\">{info}</div>    </div></div>    </div>");
		Lampa.Template.add('lmpsh_online_watched', "<div class=\"online_lmpsh online-lmpsh-watched selector\"><div class=\"online-lmpsh-watched__icon\">    <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>        <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>    </svg></div><div class=\"online-lmpsh-watched__body\">    </div></div>");
		Lampa.Template.add('epg_lmpsh', "<div class=\"notice notice--card selector layer--render image--loaded\"><div class=\"notice__left\"><div class=\"notice__img\"><img/></div></div> <div class=\"notice__body\"> <div class=\"notice__head\"><div class=\"notice__title\">{title}</div><div class=\"notice__time\">{time}</div></div><div class=\"notice__descr\">{descr}</div></div></div>");
		Lampa.Template.add('icon_subs', '<svg width=\"23\" height=\"25\" viewBox=\"0 0 23 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M22.4357 20.0861C20.1515 23.0732 16.5508 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C16.5508 0 20.1515 1.9268 22.4357 4.9139L18.8439 7.84254C17.2872 6.09824 15.0219 5 12.5 5C7.80558 5 5 7.80558 5 12.5C5 17.1944 7.80558 20 12.5 20C15.0219 20 17.2872 18.9018 18.8439 17.1575L22.4357 20.0861Z\" fill=\"currentColor\"/>\n</svg>');
		Lampa.Template.add('lmpsh_style', "<style>.program-body .notice__left{width:15em!important;} .program-body .notice__img{padding-bottom: 57% !important;} @media screen and (max-width:2560px){.epg--img{width:10em;}}@media screen and (max-width:420px){.program-body .notice--card{display:block} .program-body .notice__left{float:left;width:32em!important}.program-body .notice__body{float:left;} .program-body .notice__img{padding-bottom: 56% !important;}} .lmp_iptv__program{padding:0 1em}.iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black}@media screen and (max-width: 585px) {.timeline{bottom:12em}.card--new_seria {right:2em!important;bottom:10em!important} .card--last_viewD{right:80%!important;top:2em!important}}</style>");
		
		Lampa.Template.add('hdgo_item', '<div class="selector hdgo-item"><div class="hdgo-item__imgbox"><img class="hdgo-item__img"/><div class="card__icons"><div class="card__icons-inner"></div></div></div><div class="hdgo-item__name">{title}</div></div>');
		Lampa.Template.add('hdgo_style', '<style>.last--focus .hdgo-item__imgbox::after {content: "";position: absolute;top: -0.4em;left: -0.4em;right: -0.4em;bottom: -0.4em;border: .3em solid red;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em;opacity: .4}.lmpsh-channel__name {padding:20px;text-align: center;font-size: 1.2em}.forktv.focus .hdgo-item__imgbox::after, .lmpsh__tv.focus .hdgo-item__imgbox::after {opacity: 1}.nuamtv {filter: blur(7px);}.nuamtv:hover, .nuamtv:action {filter: blur(0px);}.a-r.b{color:#fff;background: linear-gradient(to right, rgba(204,0,0,1) 0%,rgba(150,0,0,1) 100%);}.a-r.de{color:#fff;background: linear-gradient(to right, #ffbc54 0%,#ff5b55 100%);}.a-r.g{background: linear-gradient(to right, rgba(205,235,142,1) 0%,rgba(165,201,86,1) 100%);color: #12420D;}.card.home.focus .card__img {border-color: green!important;-webkit-box-shadow: 0 0 0 0.4em green!important;-moz-box-shadow: 0 0 0 0.4em green!important;box-shadow: 0 0 0 0.4em green!important;}@media screen and (max-width: 2560px) {.pc.hdgo.card--collection,.pc.card--collection{width:11em!important} .tv_tv{width:12.5%!important}.tv_tv_c{width:20%!important}.tv_pc{width:16.66%!important}.tv.hdgo.card--collection{width:10.3em!important} .tv.card--collection{width:14.2%!important}.tv.sort.card--collection{width:25%!important}.tv.sort.hdgo.card--collection{width:25%!important}  .sort.hdgo.card--collection .card__view {padding-bottom:25%!important} .tv.two.sort.card--collection .card__view {padding-bottom: 10%!important} .tv.two.sort.card--collection{height:20%!important;width:50%!important}.pc.card--category, .tv.card--category{width:14.28%}.nuam.card--collection{width:20%!important}}  @media screen and (max-width: 1380px) {.pc.card--collection,.mobile,.mobile_tv{width:16.6%!important} .tv_pc{width:14.28%!important} .tv_pc_c{width:14.28%!important} .tv_tv{width:14.28%!important} .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.sort.pc.card--collection{width:25%!important}.sort.hdgo.card--collection{width:25%!important} .sort.hdgo.card--collection .card__view {padding-bottom:40%!important} .two.sort.card--collection{width:50%!important} .pc.two.sort.card--collection .card__view {padding-bottom: 33%!important} .pc.card--category,.nuam.card--category{width:11.5em!important}}  @media screen and (max-width: 420px) {.pc.card--collection,.mobile{width:10.3em!important}.mobile_tv{width:33.3%!important}  .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.pc.card--category,.nuam.card--category{width:7.9em!important}.nuam.card--collection{width:33.3%!important}.sort.hdgo.card--collection .card__view {padding-bottom:60%!important}}   .searc.card--collection .card__view {padding-bottom: 5%!important}.searc.card--collection{width:100%!important}.searc.card--collection .card__img{height:100%!important;}.hdgo-item{margin:0 .3em;width:10.4em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.hdgo-item__imgbox{background-color:#3e3e3e;padding-bottom:60%;position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.hdgo-item__img{position:absolute;top:0;left:0;width:100%;height:100%}.hdgo-item__name{font-size:1.1em;margin-top:.8em}.hdgo-item.focus .hdgo-item__imgbox::after{content:"";display:block;position:absolute;left:-.4em;top:-.4em;right:-.4em;bottom:-.4em;-border: .2em solid red;opacity:.6;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em}.hdgo-item +.hdgo-item{margin:0 .3em}.lmpsh_tv .items-line + .items-line, .forktv .items-line + .items-line {margin-top:0!important;}</style>');
		Lampa.Template.add('lmp_radio_style', "<style>.blink2{-webkit-animation:blink2 1.5s linear infinite;animation:blink2 1.5s linear infinite}@-webkit-keyframes blink2{100%{color:rgba(34,34,34,0)}}@keyframes blink2{100%{color:rgba(34,34,34,0)}}.controll,.controll *{box-sizing:content-box;letter-spacing:0;}.controll{position:relative;transition:.5s linear;border:.3em solid #fff;background-color:#fff;border-radius:50%;bottom:4.19em;float:right;right:0;padding:1.7em;width:.2em;height:.2em;white-space:nowrap;text-align:center;cursor:pointer}.controll.pause{background-color:#353434;border-color:#3b6531}.controll,.controll .but_left,.controll .but_right,.controll:before{display:inline-block}.controll.pause .but_left,.controll.pause .but_right{margin-left:-8px;margin-top:-8px;border-left:8px solid #fff;border-top:0 solid transparent;border-bottom:0 solid transparent;height:18px}.controll.pause .but_left{border-right:10px solid transparent}.controll.play .but_right{margin-left:-5px;margin-top:-9px;border-left:15px solid #525252;border-top:10px solid transparent;border-bottom:10px solid transparent}.controll:hover,.controll.focus{background-color:#fff}.controll.play.focus{border-color:#8a8a8a}.controll.focus .but_left,.controll.focus .but_right,.controll:hover .but_left,.controll:hover .but_right{border-left-color:#252525}.Radio_n .card__view {padding-bottom: 75%!important;}.stbut,.stbut *{box-sizing:content-box;letter-spacing:0}.title_plaing{position:absolute;text-align:center;width:15em;margin-top:-1.2em;font-size:1.1em}.stbut{transition:.5s linear;border:.15em solid #fbfbfb;background-color:#000;border-radius:4em;margin-top:1em;padding:0.3em 4em 0em 0.5em;font-size:2em;cursor:pointer;height:1.5em;max-width:4em}.stbut:hover, .stbut.focus{background-color:#edebef;color:#616060;border-color:#8e8e8e}</style>");
		Lampa.Template.add('info_radio', '<div style="height:8em" class="radio_r info layer--width"><div class="info__left"><div style="margin-top:25px" class="info__title"></div><div class="info__create"></div></div><div style="display:block" class="info__right"> <b class="title_plaing"></b>   <div id="stantion_filtr"><div id="stbut" class="stbut selector"><b>СТАНЦИИ</b></div></div>    <div id="player_radio"><div id="plbut" class="controll selector play"><span class="but_left"></span><span class="but_right"></span></div></div></div></div>');
		Lampa.Template.add('lmp_iptv_details', '<div class="lmp_iptv-details"><div class="lmp_epg-load" style="display:none;margin-bottom:-2em;position:relative"><div class="broadcast__text">' + Lampa.Lang.translate('search_searching') + '</div><div class="broadcast__scan"><div></div></div></div><div class="lmp_iptv__program"></div></div>');
		Lampa.Template.add('lmp_iptv_list', "<div class=\"iptv-list layer--height\"><div class=\"iptv-list__ico\"><svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>        <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>        <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg></div><div class=\"iptv-list__title\">#{iptv_select_playlist}</div><div class=\"iptv-list__items\"></div></div>");
		*/

		
		manifest = {
		//type: 'video',
		//version: 'dsds',
		//name: "Онлайн - lmp's v",
		//description: 'Плагин для просмотра онлайн сериалов и фильмов',
		//component: 'lmpsh_online',
		onContextMenu: function onContextMenu(object) {
			return {
			name: Lampa.Lang.translate('online_watch'),
			description: ''
			};
		},
	/*	onContextLauch: function onContextLauch(object) {
			Lampa.Activity.push({
						url: '',
						title: Lampa.Lang.translate('lmpsh_title_online') + " - lmp's v",
						component: 'lmpsh_online',
						search: object.title,
						search_one: object.title,
						search_two: object.original_title,
						movie: object,
						page: 1
					});
		}*/
		};
    	Lampa.Manifest.plugins = manifest;
    	if (!Lampa.Lang) {
			var lang_data = {};
			Lampa.Lang = {
				add: function (data) {
					lang_data = data;
				},
				translate: function (key) {
					return lang_data[key] ? lang_data[key].ru : key;
				}
			}
		}
		Lampa.Lang.add({
	pub_sort_views: {
    		ru: 'По просмотрам',
    	},
    	pub_sort_watchers: {
    		ru: 'По подпискам',
    	},
    	pub_sort_updated: {
    		ru: 'По обновлению',
    	},
    	pub_sort_created: {
    		ru: 'По дате добавления',
    	},
    	pub_search_coll: {
    		ru: 'Поиск по подборкам',
    	},
    	pub_title_all: {
    		ru: 'Все',
    	},
    	pub_title_popular: {
    		ru: 'Популярные',
    	},
    	pub_title_new: {
    		ru: 'Новые',
    	},
    	pub_title_hot: {
    		ru: 'Горячие',
    	},
    	pub_title_fresh: {
    		ru: 'Свежие',
    	},
    	pub_title_rating: {
    		ru: 'Рейтинговые',
    	},
    	pub_title_allingenre: {
    		ru: 'Всё в жанре',
    	},
    	pub_title_popularfilm: {
    		ru: 'Популярные фильмы',
    	},
    	pub_title_popularserial: {
    		ru: 'Популярные сериалы',
    	},
    	pub_title_newfilm: {
    		ru: 'Новые фильмы',
    	},
    	pub_title_newserial: {
    		ru: 'Новые сериалы',
    	},
    	pub_title_newconcert: {
    		ru: 'Новые концерты',
    	},
    	pub_title_newdocfilm: {
    		ru: 'Новые док. фильмы',
    	},
    	pub_title_newdocserial: {
    		ru: 'Новые док. сериалы',
    	},
    	pub_title_newtvshow: {
    		ru: 'Новое ТВ шоу',
    	},
    	/*pub_modal_title: {
    		ru: '1. Авторизируйтесь на сайте: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. В поле "Активация устройства" введите код.',
    	},
    	pub_title_wait: {
    		ru: 'Ожидание идентификации кода',
    	},
    	pub_title_left_days: {
    		ru: 'Осталось: ',
    	},
    	pub_title_left_days_d: {
    		ru: 'дн.',
    	},
    	pub_title_regdate: {
    		ru: 'Дата регистрации:',
    	},
    	pub_date_end_pro: {
    		ru: 'ПРО заканчивается:',
    	},
    	pub_auth_add_descr: {
    		ru: 'Добавить в свой профиль устройство',
    	},
    	pub_title_not_pro: {
    		ru: 'ПРО не активирован',
    	},
    	pub_device_dell_noty: {
    		ru: 'Устройство успешно удалено',
    	},
    	pub_device_title_options: {
    		ru: 'Настройки устройства',
    	},
    	pub_device_options_edited: {
    		ru: 'Настройки устройства изменены',
    	},
    	params_pub_clean_tocken: {
    		ru: 'Очистить токен',
    	},
    	saved_collections_clears: {
    		ru: 'Сохранённые подборки очищены',
    	},
    	card_my_clear: {
    		ru: 'Убрать с моих подборок',
    	},
    	card_my_add: {
    		ru: 'Добавить в мои подборки',
    	},
    	card_my_descr: {
    		ru: 'Смотрите в меню (Подборки)',
    	},
    	card_my_clear_all: {
    		ru: 'Удалить всё',
    	},
    	card_my_clear_all_descr: {
    		ru: 'Очистит все сохранённые подборки',
    	},
    	radio_style: {
    		ru: 'Стиль',
    	},
    	title_on_the: {
    		ru: 'на',
    	},
    	title_my_collections: {
    		ru: 'Мои подборки',
    	},
      lmpsh_watch: {
        ru: 'Смотреть онлайн',
        ua: 'Дивитися онлайн',
        zh: '在线观看'
      },
      online_no_watch_history: {
        ru: 'Нет истории просмотра',
        ua: 'Немає історії перегляду',
        zh: '没有浏览历史'
      },
      lmpsh_video: {
        ru: 'Видео',
        ua: 'Відео',
        zh: '视频'
      },
    	lmpsh_nolink: {
    		ru: 'Не удалось извлечь ссылку',
    	},
    	lmpsh_waitlink: {
        ru: 'Работаем над извлечением ссылки, подождите...',
        be: 'Працуем над выманнем спасылкі, пачакайце...',
        zh: '正在提取链接，请稍候...'
     },
    	lmpsh_viewed: {
    		ru: 'Просмотрено',
    	},
    	lmpsh_balanser: {
    		ru: 'Балансер',
    	},
    	helper_online_file: {
    		ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
    	},
    	filter_series_order: {
    		ru: 'Порядок серий',
    	},
    	filter_video_stream: {
    		ru: 'Видео поток',
    	},
    	filter_video_codec: {
    		ru: 'Кодек',
    	},
    	filter_video_server: {
    		ru: 'Сервер',
    	},
    	lmpsh_title_online: {
    		ru: 'Онлайн',
    	},
    	lmpsh_change_balanser: {
        ru: 'Изменить балансер',
        zh: '更改平衡器'
      },
      lmpsh_clear_all_marks: {
        ru: 'Очистить все метки',
        zh: '清除所有标签'
      },
      lmpsh_clear_all_timecodes: {
        ru: 'Очистить все тайм-коды',
        zh: '清除所有时间代码'
      },
    	lmpsh_title_clear_all_mark: {
    		ru: 'Снять отметку у всех',
    	},
    	lmpsh_title_clear_all_timecode: {
    		ru: 'Сбросить тайм-код у всех',
    	},
    	lmpsh_title_links: {
    		ru: 'Качество',
    	},
    	title_proxy: {
				ru: 'Прокси',
			},
			online_proxy_title: {
				ru: 'Личный прокси',
			},
			online_proxy_title_descr: {
				ru: 'Если балансер недоступен или не отвечает, требуется в выбранном Вами балансере "Включить" прокси, или указать ссылку на "Свой URL"',
			},
			online_proxy_title_main: {
				ru: 'Встроенный прокси',
			},
			online_proxy_title_main_descr: {
				ru: 'Позволяет использовать встроенный в систему прокси для всех балансеров',
			},
			online_proxy_descr: {
				ru: 'Позволяет задать личный прокси для всех балансеров',
			},
			online_proxy_placeholder: {
				ru: 'Например: http://proxy.com',
			},
			online_proxy_url: {
				ru: 'Свой URL',
			},
    	lmpsh_voice_subscribe: {
    		ru: 'Подписаться на перевод',
    	},
    	lmpsh_voice_success: {
    		ru: 'Вы успешно подписались',
    	},
    	lmpsh_voice_error: {
    		ru: 'Возникла ошибка',
    	},
      lmpsh_balanser_dont_work: {
        ru: 'Балансер ({balanser}) не отвечает на запрос.',
        zh: '平衡器（{balanser}）未响应请求。'
      },
      lmpsh_balanser_timeout: {
        ru: 'Балансер будет переключен автоматически через <span class="timeout">10</span> секунд.',
        zh: '平衡器将在<span class="timeout">10</span>秒内自动切换。'
      },
      lmpsh_does_not_answer_text: {
        ru: 'Сервер не отвечает на запрос.',
        zh: '服务器未响应请求。'
      }, 
      lmpsh_balanser_dont_work_from: {
        ru: ' на балансере <b>{balanser}</b>',
      },
    	online_dash: {
        ru: 'Предпочитать DASH вместо HLS',
        be: 'Аддаваць перавагу DASH замест HLS',
        zh: '比 HLS 更喜欢 DASH'
      },
    	online_query_start: {
    		ru: 'По запросу',
    	},
    	online_query_end: {
    		ru: 'нет результатов',
    	},
    	title_online_continue: {
    		ru: 'Продолжить',
    	},
    	title_kb_captcha_address: {
        ru: 'Требуется пройти капчу по адресу: ',
      },
    	title_online_first_but: {
    		ru: 'Кнопка онлайн всегда первая',
    	},
    	title_online_continued: {
    		ru: 'Продолжить просмотр',
    	},
    	title_online_descr: {
    		ru: 'Позволяет запускать плеер сразу на том месте, где остановили просмотр. Работает только в ВСТРОЕННОМ плеере.',
    	},
    	title_online_hevc: {
        ru: 'Включить поддержку HDR',
      },
      title_online__hevc_descr: {
        ru: 'Использовать HEVC / HDR если он доступен',
      },
    	title_prioriry_balanser: {
        ru: 'Балансер по умолчанию',
      },
      title_prioriry_balanser_descr: {
        ru: 'Балансер фильмов по умолчанию',
      },
    	filmix_param_add_title: {
    		ru: 'Добавить ТОКЕН от Filmix',
    	},
    	filmix_param_add_descr: {
    		ru: 'Добавьте ТОКЕН для подключения подписки',
    	},
    	filmix_param_placeholder: {
    		ru: 'Например: nxjekeb57385b..',
    	},
    	filmix_params_add_device: {
    		ru: 'Добавить устройство на ',
    	},
    	filmix_modal_text: {
    		ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
    	},
    	filmix_modal_wait: {
    		ru: 'Ожидаем код',
    	},
    	filmix_copy_secuses: {
    		ru: 'Код скопирован в буфер обмена',
    	},
    	filmix_copy_fail: {
    		ru: 'Ошибка при копировании',
    	},
    	filmix_nodevice: {
    		ru: 'Устройство не авторизовано',
    	},
    	filmix_auth_onl: {
        ru: 'Для просмотра в качестве 720p нужно добавить устройство в свой аккаунт на сайте filmix иначе будет заставка на видео.<br><br>Перейти в настройки и добавить?',
      },
    	fork_auth_modal_title: {
    		ru: '1. Авторизируйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потребуется оформить подписку<br>3. В поле "Ваш ID/MAC" добавьте код',
    	},
    	fork_modal_wait: {
    		ru: '<b style="font-size:1em">Ожидание идентификации кода</b><hr>После завершения идентификации произойдет перенаправление в обновленный раздел ForkTV',
    	},
    	title_status: {
    		ru: 'Статус',
    	},
    	season_ended: {
    		ru: 'сезон завершён',
    	},
    	season_from: {
    		ru: 'из',
    	},
    	season_new: {
    		ru: 'Новая',
    	},
    	info_attention: {
    		ru: 'Внимание',
    	},
    	info_pub_descr: {
    		ru: '<b>KinoPub</b> платный ресурс, просмотр онлайн с балансера, а так же спортивные ТВ каналы будут доступны после покупки <b>PRO</b> в аккаунте на сайте',
    	},
    	info_filmix_descr: {
    		ru: 'Максимально доступное качество для просмотра без подписки - 720p. Для того, чтобы смотреть фильмы и сериалы в качестве - 1080р-2160р требуется подписка <b>PRO</b> или <b>PRO-PLUS</b> на сайте',
    	},
    	params_pub_on: {
    		ru: 'Включить',
    	},
    	params_pub_off: {
    		ru: 'Выключить',
    	},
    	params_pub_on_descr: {
    		ru: 'Отображает источник "<b>KinoPub</b>", а так же подборки. Для просмотра с балансера, а так же ТВ спорт каналов <span style="color:#ffd402">требуется подписка<span>',
    	},
    	params_pub_add_source: {
    		ru: 'Установить источник',
    	},
    	pub_source_add_noty: {
    		ru: 'KinoPub установлен источником по умолчанию',
    	},
    	descr_pub_settings: {
    		ru: 'Настройки сервера, типа потока...',
    	},
    	params_pub_add_source_descr: {
    		ru: 'Установить источник по умолчанию на KinoPub',
    	},
    	params_pub_update_tocken: {
    		ru: 'Обновить токен',
    	},
    	params_pub_dell_device: {
    		ru: 'Удалить привязку устройства',
    	},
    	params_pub_dell_descr: {
    		ru: 'Будет удалено устройство с прывязаных устройств в аккаунте',
    	},
    	params_radio_enable: {
    		ru: 'Включить радио',
    	},
    	params_radio_enable_descr: {
    		ru: 'Отображает пункт "Радио" в главном меню с популярными радио-станциями',
    	},
    	params_tv_enable: {
    		ru: 'Включить ТВ',
    	},
    	params_tv_enable_descr: {
    		ru: 'Отображает пункт "Lmpsh-TV" в главном меню с популярными каналами',
    	},
    	params_collections_descr: {
    		ru: 'Добавляет в пункт "Подборки" популярные разделы, такие как Rezka, Filmix, KinoPub',
    	},
    	params_styles_title: {
    		ru: 'Стилизация',
    	},
    	placeholder_password: {
    		ru: 'Введите пароль',
    	},
    	title_parent_contr: {
    		ru: 'Родительский контроль',
    	},
    	title_addons: {
    		ru: 'Дополнения',
    	},
    	onl_enable_descr: {
    		ru: 'Позволяет просматривать фильмы, сериалы в режиме Stream',
    	},
    	fork_enable_descr: {
    		ru: 'Отображает пункт <b>"ForkTV"</b> в главном меню с популярными источниками, торрентами',
    	},
    	title_fork_edit_cats: {
    		ru: 'Изменить разделы',
    	},
    	title_fork_add_cats: {
    		ru: 'Добавить разделы',
    	},
    	title_fork_clear: {
    		ru: 'Очистить разделы',
    	},
    	title_fork_clear_descr: {
    		ru: 'Будет выполнена очистка всех выбранных разделов',
    	},
    	title_fork_clear_noty: {
    		ru: 'Разделы успешно очищены',
    	},
    	title_fork_reload_code: {
    		ru: 'Обновить код',
    	},
    	title_fork_current: {
    		ru: 'Текущий',
    	},
    	title_fork_new: {
    		ru: 'Новый',
    	},
    	title_tv_clear_fav: {
    		ru: 'Очистить избранное',
    	},
    	title_tv_clear__fav_descr: {
    		ru: 'Будет выполнена очистка избранных каналов',
    	},
    	title_tv_clear_fav_noty: {
    		ru: 'Все избранные каналы удалены',
    	},
    	succes_update_noty: {
    		ru: 'успешно обновлён',
    	},
    	title_enable_rating: {
    		ru: 'Включить рейтинг',
    	},
    	title_enable_rating_descr: {
    		ru: 'Отображает в карточке рейтинг Кинопоиск и IMDB',
    	},
    	title_info_serial: {
    		ru: 'Информация о карточке',
    	},
    	title_info_serial_descr: {
    		ru: 'Отображает информацию о количестве серий в карточке, в том числе последнею серию на постере',
    	},
    	title_add_butback: {
    		ru: 'Включить кнопку "Назад"',
    	},
    	title_add_butback_descr: {
    		ru: 'Отображает внешнюю кнопку "Назад" для удобной навигации в полноэкраном режиме на различных смартфона',
    	},
    	title_butback_pos: {
    		ru: 'Положение кнопки "Назад"',
    	},
    	buttback_right: {
    		ru: 'Справа',
    	},
    	buttback_left: {
    		ru: 'Слева',
    	},
    	title_close_app: {
    		ru: 'Закрыть приложение',
    	},
    	title_radio: {
    		ru: 'Радио',
    	}*/
    });
	/*	function FreeJaketOpt() {
			Lampa.Arrays.getKeys(Lmpsh.jack).map(function (el){
			  jackets[el] = el.replace(/_/g,'.');
			});
			var params = Lampa.SettingsApi.getParam('parser')
			if(params){
				var param = params.find(function (p){
				return p.param.name == 'jackett_url2';
				});
				if(param) Lampa.Arrays.remove(params, param);
			}
      		Lampa.SettingsApi.addParam({
				component: 'parser',
				param: {
					name: 'jackett_url2', 
					type: 'select', 			
					values: jackets,
					default: 'lampishe'				
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="font-size:1.0em">Выбор Jackett  </div><div style="width:1.1em; padding-right: 0.2em; margin-left: 0.3em;"><?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"> <g transform="matrix(0.10000000149011612, 0, 0, -0.10000000149011612, 3.552713678800501e-15, 255.99999999999997)" fill="CurrentColor" stroke="none">  <path d="M1113 2550 c-71 -10 -190 -39 -215 -52 -15 -7 -18 -23 -18 -92 l0 -84 -37 -7 c-85 -16 -311 -98 -442 -161 l-140 -67 -5 -51 c-4 -28 -35 -472 -71 -986 -35 -514 -67 -961 -70 -992 l-6 -58 184 0 185 0 6 158 c16 393 40 665 79 897 l22 129 30 0 30 0 3 -230 2 -231 108 -23 c152 -32 152 -32 152 -78 0 -21 -2 -41 -5 -44 -3 -2 -53 6 -112 18 -159 34 -143 49 -143 -132 l0 -155 74 -34 c146 -67 361 -125 461 -125 l45 0 0 1114 0 1114 -62 7 c-100 10 -170 33 -166 53 5 24 42 39 131 51 99 14 185 14 283 0 177 -24 175 -74 -3 -99 l-83 -12 0 -1117 0 -1117 74 7 c146 14 293 57 429 125 l67 34 0 155 c0 180 16 165 -143 131 -59 -12 -109 -20 -112 -18 -3 3 -5 24 -5 47 l0 42 130 28 130 28 2 230 3 231 30 0 c30 0 30 -1 46 -82 41 -202 73 -545 85 -900 l7 -202 189 0 189 0 -5 52 c-4 29 -38 476 -76 993 -38 517 -72 963 -75 991 l-6 51 -137 66 c-124 59 -318 130 -429 157 l-43 11 0 85 c0 83 -1 85 -27 95 -109 43 -400 69 -540 49z"/></g></svg></div></div>', 			
					description: 'Обновится после выхода из настроек' 
				},
				onChange: function (value) { 	
					Lampa.Storage.set('jackett_url', Lmpsh.jack[value].url);
					Lampa.Storage.set('jackett_key', Lmpsh.jack[value].key);
					Lampa.Storage.set('jackett_interview',Lmpsh.jack[value].interv);
					Lampa.Storage.set('parse_in_search', false);
					Lampa.Storage.set('parse_lang', Lmpsh.jack[value].lang);
					Lampa.Settings.update();							
			 	},
				onRender: function (item) {
					setTimeout(function() {
						$('div[id="jackett"]').on('hover:enter', function(){
							Lampa.Settings.update();							
						});
						//if(!API || !API.length) window.location.reload();
						$('[data-name="jackett_url2"]').on('hover:enter', function (el){
							Lampa.Select.render().find('.selectbox-item__title').map(function(i, item){
								Lmpsh.check($(item).text().toLowerCase().replace(/\./g,'_'), function(e){
									$(item).css('color', e ? '#23ff00' : '#d10000');
								});
							});
						});
						if(Lampa.Storage.field('parser_use')) {
							item.show();
							if(Boolean(Lmpsh.jack[Lampa.Storage.get('jackett_url2')])) $('.settings-param__name', item).before('<div class="settings-param__status one '+(Lmpsh.jack[Lampa.Storage.get('jackett_url2')].ok ? "active" : "error")+'"></div>');
							$('[data-name="jackett_url"] .settings-param__name').before('<div class="settings-param__status wait act"></div>');
							$('.settings-param__name', item).css('color','#f3d900');
							$('div[data-name="jackett_url2"]').insertAfter('div[id="jackett"]');
							Lmpsh.check($('.settings-param__value', item).text().toLowerCase().replace(/\./g,'_'), function(e){
								Lmpsh.check(Lampa.Storage.get('jackett_url'));
								$($('.settings-param__status', item)).removeClass('active error wait').addClass(e ? 'active' : 'error');
							});
						} else item.hide();
					}, 50);
				}
			});
		}*/
	/*	Lampa.Listener.follow('full', function (e) {
			if (e.type == 'complite') {
				cards = e.data.movie;
				Lmpsh.serialInfo(e.data.movie);
				Lmpsh.rating_kp_imdb(e.data.movie).then(function (e) {
				  Lmpsh.preload();
				})['catch'](function(e){
				});
				$('.view--torrent').addClass('selector').empty().append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"/></svg><span>' + Lampa.Lang.translate('full_torrents') + '</span>');
				$('.view--trailer').empty().append("<svg enable-background='new 0 0 512 512' id='Layer_1' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='currentColor' d='M260.4,449c-57.1-1.8-111.4-3.2-165.7-5.3c-11.7-0.5-23.6-2.3-35-5c-21.4-5-36.2-17.9-43.8-39c-6.1-17-8.3-34.5-9.9-52.3   C2.5,305.6,2.5,263.8,4.2,222c1-23.6,1.6-47.4,7.9-70.3c3.8-13.7,8.4-27.1,19.5-37c11.7-10.5,25.4-16.8,41-17.5   c42.8-2.1,85.5-4.7,128.3-5.1c57.6-0.6,115.3,0.2,172.9,1.3c24.9,0.5,50,1.8,74.7,5c22.6,3,39.5,15.6,48.5,37.6   c6.9,16.9,9.5,34.6,11,52.6c3.9,45.1,4,90.2,1.8,135.3c-1.1,22.9-2.2,45.9-8.7,68.2c-7.4,25.6-23.1,42.5-49.3,48.3   c-10.2,2.2-20.8,3-31.2,3.4C366.2,445.7,311.9,447.4,260.4,449z M205.1,335.3c45.6-23.6,90.7-47,136.7-70.9   c-45.9-24-91-47.5-136.7-71.4C205.1,240.7,205.1,287.6,205.1,335.3z'/></g></svg><span>" + Lampa.Lang.translate('full_trailers') + "</span>");
			}
		});*/
		/*Lampa.Storage.listener.follow('change', function (e) {
		  //if(e.name == 'jackett_key' || e.name == 'jackett_url') Lmpsh.check(e.value);
		});
		Lampa.Settings.listener.follow('open', function (e) {
		if (e.name == 'parser') FreeJaketOpt();
		});*/
	/*	if (Lampa.Manifest.app_digital >= 177) {
			Lampa.Storage.sync('my_col', 'object_object');
			Lampa.Storage.sync('fav_chns', 'object_object');
			Lampa.Storage.sync('online_watched_last', 'object_object');
		}*/
		function add() {
			Lmp.init();
			//$('body').append(Lampa.Template.get('hdgo_style', {}, true));
			//$('body').append(Lampa.Template.get('lmp_radio_style', {}, true));
			//$('body').append(Lampa.Template.get('lmpsh_style', {}, true));
			//$('body').append(Lampa.Template.get('lmpsh_online_css', {}, true));
			//	Lampa.Storage.set('guide', '');
			//setTimeout(function () {
				//if (window.innerHeight > 700 && Lampa.Storage.field('guide') == 'undefined') guide();
			//}, 3000);
	
//Styles
		/*Lampa.SettingsApi.addParam({
				component: 'parser',
				param: {
					name: 'lmp_rating',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_enable_rating'),
					description: Lampa.Lang.translate('title_enable_rating_descr')
				},
				onChange: function (value) {
				  if (value == 'true') {
  				  $('body').find('.rate--kp, .rate--imdb').removeClass('hide');
  				  Lmpsh.rating_kp_imdb(cards);
  				} else $('body').find('.rate--kp, .rate--imdb').addClass('hide');
  			}
			});*/
			/*Lampa.SettingsApi.addParam({
				component: 'parser',
				param: {
					name: 'lmp_serial_info',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_info_serial'),
					description: Lampa.Lang.translate('title_info_serial_descr')
				},
				onChange: function (value) {
					if (value == 'true' && $('body').find('.full-start__poster').length) Lmpsh.serialInfo(cards);
					else $('body').find('.files__left .time-line, .card--last_view, .card--new_seria').remove();
				}
			});*/
		  
			//FreeJaketOpt();
		}
		
		if (window.appready) add();else {
			Lampa.Listener.follow('app', function (e) {
				if (e.type == 'ready') add();
			});
    	}
		
		function url$1(u) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			if (params.genres) u = add$4(u, 'genre=' + params.genres);
			if (params.page) u = add$4(u, 'page=' + params.page);
			if (params.query) u = add$4(u, 'q=' + params.query);
			if (params.type) u = add$4(u, 'type=' + params.type);
			if (params.field) u = add$4(u, 'field=' + params.field);
			if (params.id) u = add$4(u, 'actor=' + params.id);
			if (params.perpage) u = add$4(u, 'perpage=' + params.perpage);
			u = add$4(u, 'access_token=' + Pub.token);
			if (params.filter) {
				for (var i in params.filter) {
					u = add$4(u, i + '=' + params.filter[i]);
				}
			}
			return Pub.baseurl + u;
		}
		function add$4(u, params) {
			return u + (/\?/.test(u) ? '&' : '?') + params;
		}
		function get$6(method, call) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
			var onerror = arguments.length > 3 ? arguments[3] : undefined;
			var u = url$1(method, params);
			Pub.network.silent(params.component == 'full' ? API +'pub/source' : u, function (json) {
				json.url = method;
				oncomplite(json);
			}, onerror, params.component == 'full' ? {
        	id:"aGFyaW1hbWJ1cmFAZ21haWwuY29t", 
        	url: u
        } : '');
		}
		function tocard(element) {
			return {
				url: '',
				id: element.id,
				type: element.type,
				title: element.title.split('/')[0],
				promo_title: element.title.split('/')[0],
				original_title: element.title.split('/')[1] || element.title,
				release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
				first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year : '',
				vote_averagey: parseFloat((element.imdb_rating || 0) + '').toFixed(1),
				vote_average: element.imdb_rating || 0,
				poster: element.posters.big,
				cover: element.posters.wide,
				background_image: element.posters.wide,
        imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
        kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
				year: element.year,
				years: element.years
			};
		}
		function list$2(params, oncomplite, onerror) {
			var url = url$1('v1/items', params, params.type = type);
			if (!params.genres) url = url$1(params.url, params);
			Pub.network["native"](url, function (json) {
				var items = [];
				if (json.items) {
					json.items.forEach(function (element) {
						items.push(tocard(element));
					});
				}
				oncomplite({
					results: items,
					page:json.pagination.current,
					total_pages: json.pagination.total
				});
			}, onerror);
		}
		function main$2(params, oncomplite, onerror) {
			var status = new Lampa.Status(9);
			status.onComplite = function () {
				var fulldata = [];
				var data = status.data;
				for (var i = 1; i <= 9; i++) {
					var ipx = 's' + i;
					if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
				}
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.items.forEach(function (element) {
					data.push(tocard(element));
				});
				if(name == 's1' || name == 's6') {
				  json.wide = true;
				  json.small = true;
				}
				if(name == 's2') {
				  data.forEach(function (el){
				    el.poster = el.cover;
				  });
				  json.collection = true;
				  json.line_type  = 'collection';
				}
				json.results = data;
				status.append(name, json);
			};
			get$6('v1/items/popular?type=movie&sort=views', params, function (json) {
				append(Lampa.Lang.translate('pub_title_popularfilm'), 's1', json);
				Lampa.VideoQuality.add(json.results);
			}, status.error.bind(status));
			get$6('v1/items?type=movie&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newfilm'), 's2', json);
			}, status.error.bind(status));
			get$6('v1/items/popular?type=serial&sort=views', params, function (json) {
				append(Lampa.Lang.translate('pub_title_popularserial'), 's3', json);
				Lampa.VideoQuality.add(json.results);
			}, status.error.bind(status));
			get$6('v1/items?type=serial&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newserial'), 's4', json);
			}, status.error.bind(status));
			get$6('v1/items?type=concert&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newconcert'), 's5', json);
			}, status.error.bind(status));
			get$6('v1/items?type=&quality=4', params, function (json) {
				append('4K', 's6', json);
			}, status.error.bind(status));
			get$6('v1/items?type=documovie&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newdocfilm'), 's7', json);
			}, status.error.bind(status));
			get$6('v1/items?type=docuserial&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newdocserial'), 's8', json);
			}, status.error.bind(status));
			get$6('v1/items?type=tvshow&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newtvshow'), 's9', json);
			}, status.error.bind(status));
		}
		function category$1(params, oncomplite, onerror) {
			var books = Lampa.Favorite.continues(params.url);
			var status = new Lampa.Status(5);
			status.onComplite = function () {
				var fulldata = [];
				if (books.length) fulldata.push({
					results: books,
					title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
				});
				var data = status.data;
				for (var i = 1; i <= 5; i++) {
					var ipx = 's' + i;
					if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
				}
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.items.forEach(function (element) {
					data.push(tocard(element));
				});
				json.results = data;
				status.append(name, json);
			};
			var type = params.url == 'tv' ? 'serial' : params.url;
			var Name = params.genres ? params.typeName.toLowerCase() : params.url == 'tv' ? Lampa.Lang.translate('menu_tv').toLowerCase() : Lampa.Lang.translate('menu_movies').toLowerCase();
			if (params.genres) {
				get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
					append(Lampa.Lang.translate('pub_title_new') + ' ' + params.janr.toLowerCase(), 's1', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + 'sort=rating-', params, function (json) {
					append(Lampa.Lang.translate('pub_title_rating') + ' ' + Name, 's2', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&sort=updated-', params, function (json) {
					append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&sort=views-', params, function (json) {
					append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&quality=4', params, function (json) {
					append('4K ' + Name, 's5', json);
				}, status.error.bind(status));
			} else {
				get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
					append(Lampa.Lang.translate('pub_title_new') + ' ' + Name, 's1', json);
				}, status.error.bind(status));
				get$6('v1/items/popular?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
					append(Lampa.Lang.translate('pub_title_popular') + ' ' + Name, 's2', json);
				}, status.error.bind(status));
				get$6('v1/items/fresh?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
					append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
				}, status.error.bind(status));
				get$6('v1/items/hot?type=' + type + '&sort=created-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
					append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&quality=4', params, function (json) {
					append('4K ' + Name, 's5', json);
				}, status.error.bind(status));
			}
		}
		function full$1(params, oncomplite, onerror) {
			var status = new Lampa.Status(5);
			status.onComplite = oncomplite;
			var url = 'v1/items/' + params.id;
			get$6(url, params, function (json) {
				json.source = 'pub';
				var data = {};
				var element = json.item;
				get$6('v1/items/similar?id=' + element.id, params, function (json) {
					var similars = [];
					if (json.items) {
						for (var i in json.items) {
							var item = json.items[i];
							similars.push(tocard(item));
						}
						status.append('simular', {
							results: similars
						});
					}
				}, onerror);
				get$6('v1/items/comments?id=' + element.id, params, function (json) {
					var comments = [];
					if (json.comments) {
						for (var i in json.comments) {
							var com = json.comments[i];
							com.text = com.message.replace(/\[n|r|t]/g, '');
							com.like_count = com.rating;
							comments.push(com);
						}
						status.append('comments', comments);
					}
				}, onerror);
				data.movie = {
					id: element.id,
					url: url,
					type: element.type,
					source: 'pub',
					title: element.title.split('/')[0],
					original_title: element.title.split('/')[1] ? element.title.split('/')[1] : element.title.split('/')[0],
					name: element.seasons ? element.title.split('/')[0] : '',
					original_name: element.seasons ? element.title.split('/')[1] : '',
					original_language: element.genres.find(function (e){return e.id == 25}) !== undefined ? 'ja' : '', 
					overview: element.plot.replace(/\[n|r|t]/g, ''),
					img: element.posters.big,
					runtime: (element.duration.average || 0) / 1000 / 6 * 100,
					genres: genres$1(element, json.item),
					vote_average: parseFloat(element.imdb_rating || element.kinopoisk_rating || '0'),
					production_companies: [],
					production_countries: countries(element.countries, json.item),
					budget: element.budget || 0,
					seasons: element.seasons && element.seasons.filter(function (el){
					  el.episode_count = 1;
					  return el
					}) || '',
					release_date: element.year || Lampa.Utils.parseTime(element.created_at).full || '0000',
					number_of_seasons: seasonsCount(element).seasons,
					number_of_episodes: seasonsCount(element).episodes,
					first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year || Lampa.Utils.parseTime(element.created_at).full || '0000' : '', 
					background_image: element.posters.wide,
          imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
          kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
          imdb_id:'tt' +element.imdb,
          kinopoisk_id:element.kinopoisk
				};
				status.append('persons', persons(json));
				status.append('movie', data.movie);
				status.append('videos', videos(element));
			}, onerror);
		}
		function menu$1(params, oncomplite) {
			var u = url$1('v1/types', params);
			var typeName = '';
			Pub.network["native"](u, function (json) {
				Lampa.Select.show({
					title: Lampa.Lang.translate('title_category'),
					items: json.items,
					onBack: this.onBack,
					onSelect: function onSelect(a) {
						type = a.id;
						typeName = a.title;
						get$6('v1/genres?type=' + a.id, params, function (jsons) {
							Lampa.Select.show({
								title: Lampa.Lang.translate('full_genre'),
								items: jsons.items,
								onBack: function onBack() {
									menu$1(params, oncomplite);
								},
								onSelect: function onSelect(a) {
									Lampa.Activity.push({
										url: type,
										title: Lampa.Lang.translate('title_catalog') + ' - ' + typeName + ' - ' + a.title + ' - KinoPUB',
										component: 'category',
										typeName: typeName,
										janr: a.title,
										genres: a.id,
										id: a.id,
										source: 'pub',
										card_type: true,
										page: 1
									});
								}
							});
						}, onerror);
					}
				});
			});
		}
		function seasons$2(tv, from, oncomplite) {
			Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		}
		function person$2(params, oncomplite, onerror) {
			var u = url$1('v1/items', params);
			Pub.network["native"](u, function (json, all) {
				var data = {};
				if (json.items) {
					data.person = {
						name: params.id,
						biography: '',
						img: '',
						place_of_birth: '',
						birthday: '----'
					};
					var similars = [];
					for (var i in json.items) {
						var item = json.items[i];
						similars.push(tocard(item));
					}
					data.credits = {
						movie: similars,
						knownFor: [{
						  name: '', 
						  credits: similars
						}]
					};
				}
				oncomplite(data);
			}, onerror);
		}
		function clear$3() {
			Pub.network.clear();
		}
		function seasonsCount(element) {
			var data = {
				seasons: 0,
				episodes: 0
			};
			if (element.seasons) {
				data.seasons = element.seasons.length;
				element.seasons.forEach(function (ep) {
					data.episodes += ep.episodes.length;
				})
			}
			return data;
		}
		function videos(element) {
			var data = [];
			if (element.trailer) {
				data.push({
					name: element.trailer.title  || 'Trailer name',
					url: element.trailer.url,
					youtube: false,
					iso_639_1: 'ru'
				});
			}
			return data.length ? {
				results: data
			} : false;
		}
		function persons(json) {
			var data = [];
			if (json.item.cast) {
				json.item.cast.split(',').forEach(function (name) {
					data.push({
						name: name,
						id: name,
						character: Lampa.Lang.translate('title_actor'),
					});
				});
			}
			return data.length ? {
				cast: data
			} : false;
		}
		function genres$1(element, json) {
			var data = [];
			element.genres.forEach(function (id) {
				if (id) {
					data.push({
						id: id.id,
						name: id.title
					});
				}
			});
			return data;
		}
		function countries(element, json) {
			var data = [];
			if (element && json.countries) {
				data.push({
					name: element[0].title
				});
			}
			return data;
		}
		function search$3() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			var status = new Lampa.Status(2);
			status.onComplite = function (data) {
				var items = [];
				if (data.movie && data.movie.results.length) items.push(data.movie);
				if (data.tv && data.tv.results.length) items.push(data.tv);
				oncomplite(items);
			};
			var mov = params;
			mov.type = '';
			mov.field = 'title';
			mov.perpage = 20;
			get$6('v1/items/search', mov, function (json) {
				var items = [];
				var itemss = [];
				if (json.items) {
					json.items.forEach(function (element) {
						if(element.type == 'movie') items.push(tocard(element));
						else itemss.push(tocard(element));
					});
					var movie = {
						results: items,
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
						type: 'movie'
					};
					status.append('movie', movie);
					var tv = {
						results: itemss,
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
						type: 'tv'
					};
					status.append('tv', tv);
				}
			}, status.error.bind(status));
		}
		/*function discovery() {
			return {
				title: 'PUB',
				search: search$3,
				params: {
					align_left: true,
					object: {
						source: 'pub'
					}
				},
				onMore: function onMore(params) {
					Lampa.Activity.push({
						url: 'v1/items/search?field=title&type=' + params.data.type,
						title: Lampa.Lang.translate('search') + ' - ' + params.query,
						component: 'category_full',
						page: 2,
						query: encodeURIComponent(params.query),
						source: 'pub'
					});
				},
				onCancel: Pub.network.clear.bind(Pub.network)
			};
		}/*
	/*	var PUB = {
			main: main$2,
			menu: menu$1,
			full: full$1,
			search: search$3,
			person: person$2,
			list: list$2,
			seasons: seasons$2,
			category: category$1,
			clear: clear$3,
			discovery: discovery
		};*/
	//	Lampa.Api.sources.pub = PUB;
		
		function url$2(u) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			u = (u == 'undefined' ? '' : u)
			if (params.genres) u = 'catalog' +add$5(u, 'orderby=date&orderdir=desc&filter=s996-' + params.genres.replace('f','g'));
			if (params.page) u = add$5(u, 'page=' + params.page);
			if (params.query) u = add$5(u, 'story=' + params.query);
			if (params.type) u = add$5(u, 'type=' + params.type);
			if (params.field) u = add$5(u, 'field=' + params.field);
			if (params.perpage) u = add$5(u, 'perpage=' + params.perpage);
			u = add$5(u, Filmix.user_dev + Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb'));
			if (params.filter) {
				for (var i in params.filter) {
					u = add$5(u, i + '=' + params.filter[i]);
				}
			}
			return Filmix.api_url + u;
		}
		function add$5(u, params) {
			return u + (/\?/.test(u) ? '&' : '?') + params;
		}
		function get$7(method, call) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
			var onerror = arguments.length > 3 ? arguments[3] : undefined;
			var u = url$2(method, params);
			Filmix.network["native"](u, function (json) {
				json.url = method;
				oncomplite(json);
			}, onerror);
		}
		function tocardf(element, type) {
			return {
				url: '',
				id: element.id,
				type: type || (((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id)) ? 'tv' : 'movie'),
				source: 'filmix',
				quality: element.quality && element.quality.split(' ').shift() || '',
				title: element.title,
				original_title: element.original_title || element.title,
				release_date: (element.year || element.date && element.date.split(' ')[2] || '0000'),
				first_air_date: (type == 'tv' || ((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id))) ? element.year : '',
				img: element.poster,
				cover: element.poster,
				background_image: element.poster,
        vote_average: parseFloat(element.kp_rating || '0.0').toFixed(1),
        imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
        kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
				year: element.year
			};
		}
		function list$3(params, oncomplite, onerror) {
			var page = 2;
			var url = url$2(params.url, params);
			Filmix.network["native"](url, function (json) {
				var items = [];
				if (json) {
					json.forEach(function (element) {
						items.push(tocardf(element));
					});
				}
				oncomplite({
					results: items,
					page: page,
					total_pages: 50
				});
				page++
			}, onerror);
		}
		function main$1(params, oncomplite, onerror) {
		  var source = [{
		    title: 'title_now_watch',
		    url: 'top_views'
		  }, {
		    title: 'title_new', 
		    url: 'catalog?orderby=date&orderdir=desc'
		  }, {
		    title: 'title_new_this_year', 
		    url: 'catalog?orderby=year&orderdir=desc'
		  }, {
		    title: 'pub_title_newfilm', 
		    url: 'catalog?orderby=date&orderdir=desc&filter=s0'
		  }, {
		    title: '4K', 
		    url: 'catalog?orderby=date&orderdir=desc&filter=s0-q4'
		  }, {
		    title: 'pub_title_popularfilm', 
		    url: 'popular'
		  }, {
		    title: 'pub_title_popularserial', 
		    url: 'popular?section=7'
		  }, {
		    title: 'title_in_top', 
		    url: 'catalog?orderby=rating&orderdir=desc'
		  }];
			var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
			status.onComplite = function () {
				var fulldata = [];
				var data = status.data;
				source.forEach(function (q) {
          if (status.data[q.title] && status.data[q.title].results.length) {
            fulldata.push(status.data[q.title]);
          }
        });
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.forEach(function (element) {
					data.push(tocardf(element));
				});
      	json.results = data;
				status.append(name, json);
			};
      source.forEach(function (q) {
			  get$7(q.url, params, function (json) {
          append(Lampa.Lang.translate(q.title), q.title, json);
        }, status.error.bind(status));
      });
		}
		function category$2(params, oncomplite, onerror) {
			var books = Lampa.Favorite.continues(params.url);
			var type = params.url == 'tv' ? 7 : 0;
			var source = [{
		    title: 'title_new_this_year',
		    url: 'catalog?orderby=year&orderdir=desc&filter=s'+type
		  }, {
		    title: 'title_new', 
		    url: 'catalog?orderby=date&orderdir=desc&filter=s'+type
		  }, {
		    title: 'title_popular', 
		    url: 'popular?section='+type
		  }, {
		    title: 'title_in_top', 
		    url: 'catalog?orderby=rating&orderdir=desc&filter=s'+type
		  }];
			var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
			status.onComplite = function () {
				var fulldata = [];
				var data = status.data;
				if (books.length) fulldata.push({
					results: books,
					title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
				});
				source.forEach(function (q) {
          if (data[q.title] && data[q.title].results.length) {
            fulldata.push(data[q.title]);
          }
        });
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.forEach(function (element) {
					data.push(tocardf(element, params.url));
				});
				json.results = data;
				status.append(name, json);
			};
      source.forEach(function (q) {
			  get$7(q.url, params, function (json) {
          append(Lampa.Lang.translate(q.title), q.title, json);
        }, status.error.bind(status));
      });
		}
		function full$2(params, oncomplite, onerror) {
			var status = new Lampa.Status(5);
			status.onComplite = oncomplite;
			var url = 'post/' + params.id;
			get$7(url, params, function (json) {
				json.source = 'filmix';
				var data = {};
				var element = json;
			
				var similars = [];
				if (json.relates) {
					for (var i in json.relates) {
						var item = json.relates[i];
						similars.push(tocardf(item));
					}
					status.append('simular', {
						results: similars
					});
				}
			
				data.movie = {
					id: element.id,
					url: url,
					type: Lampa.Arrays.getValues(element.player_links.playlist).length ? 'tv' : 'movie',
					source: 'filmix',
					title: element.title,
					original_title: element.original_title,
					name: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.title : '',
					original_name: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.original_title : '',
					overview: element.short_story.replace(/\[n|r|t]/g, ''),
					img: element.poster,
					runtime: (element.duration || 0),
					genres: genres$2(element),
					vote_average: parseFloat(element.imdb_rating || element.kp_rating || '0'),
					production_companies: [],
					production_countries: countries2(element.countries),
					budget: element.budget || 0,
					release_date: element.year || element.date.split(' ')[2] || '0000',
					seasons: Lampa.Arrays.getValues(element.player_links.playlist).filter(function (el){
					  el.episode_count = 1;
					  return el
					}),
					quality: element.rip && element.rip.split(' ').shift() || '',
					number_of_seasons: Lampa.Arrays.getValues(element.player_links.playlist).length || '',
					number_of_episodes: element.last_episode && element.last_episode.episode || '',
					first_air_date: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.year || element.date_atom || '0000' : '', 
					background_image: element.poster,
          imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
          kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
     		};
				get$7('comments/' + element.id, params, function (json) {
					var comments = [];
					if (json) {
						json.forEach(function(com) {
							com.text = com.text.replace(/\[n|r|t]/g, '');
							com.like_count = '';
							comments.push(com);
						});
						status.append('comments', comments);
						$('.full-review__footer', Lampa.Activity.active().activity.render()).hide();
					}
				}, onerror);
     		status.append('persons', persons2(json));
				status.append('movie', data.movie);
				status.append('videos', videos2(element.player_links));			
			}, onerror);
		}
		function menu$2(params, oncomplite) {
  		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      if (menu_list.length) oncomplite(menu_list);else {
        var us = url$2('filter_list', params);
        var u = url$2('category_list', params);
        Filmix.network["native"](u, function (j) {
          Lampa.Arrays.getKeys(j).forEach(function (g) {
            menu_list.push({
              title: j[g],
              id: g
            });
          });
          console.log (menu_list)
          oncomplite(menu_list);
        });
      }
		}
		function seasons$1(tv, from, oncomplite) {
			Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		}
		function formatDate(dateString) {
      var months = [
        { name: 'января', number: '01' },
        { name: 'февраля', number: '02' },
        { name: 'марта', number: '03' },
        { name: 'апреля', number: '04' },
        { name: 'мая', number: '05' },
        { name: 'июня', number: '06' },
        { name: 'июля', number: '07' },
        { name: 'августа', number: '08' },
        { name: 'сентября', number: '09' },
        { name: 'октября', number: '10' },
        { name: 'ноября', number: '11' },
        { name: 'декабря', number: '12' }
      ];
    
      var parts = dateString.split(' ');
      var day = parts[0];
      var monthName = parts[1];
      var year = parts[2];
      
      var monthNumber;
      for (var i = 0; i < months.length; i++) {
        if (months[i].name === monthName) {
          monthNumber = months[i].number;
          break;
        }
      }
      
      var formattedDate = year + '-' + monthNumber + '-' + day;
      return formattedDate;
    }
		function person$3(params, oncomplite, onerror) {
			var u = url$2('person/'+params.id, params);
			Filmix.network["native"](u, function (json, all) {
				var data = {};
				if (json) {
					data.person = {
						id: params.id,
						name: json.name,
						biography: json.about,
						img: json.poster,
						place_of_birth: json.birth_place,
						birthday: formatDate(json.birth)
					};
					var similars = [];
					for (var i in json.movies) {
						var item = json.movies[i];
						similars.push(tocardf(item));
					}
					data.credits = {
						movie: similars,
						knownFor: [{
						  name: json.career, 
						  credits: similars
						}]
					};
				}
				oncomplite(data);
			}, onerror);
		}
		function clear$4() {
			Filmix.network.clear();
		}
		function videos2(element) {
			var data = [];
			if (element.trailer.length) {
				element.trailer.forEach(function (el){
  				var qualities = el.link.match(/\[(.*?)\]/);
  			  qualities = qualities[1].split(',').filter(function (quality){
            if (quality === '') return false
            return true
          }).sort(function (a, b) {
            return b - a
          }).map(function (quality) {
            data.push({
    					name: el.translation+' '+quality+'p',
    					url: el.link.replace(/\[(.*?)\]/, quality),
    					player: true
    				});
          });
				});
			}
			return data.length ? {
				results: data
			} : false;
		}
		function persons2(json) {
			var data = [];
			if (json.actors) {
				json.found_actors.filter(function (act){
					data.push({
						name: act.name,
						id: act.id,
						character: Lampa.Lang.translate('title_actor'),
					});
				});
			}
			return data.length ? {
				cast: data
			} : false;
		}
		function genres$2(element) {
			var data = [];
			var u = url$2('category_list');
      Filmix.network["native"](u, function (j) {
  			element.categories.forEach(function (name, i) {
  				if (name) {
            var _id = Object.entries(j).find(function (g) {
              return g[1] == name
            });
  				 	data.push({
  						id: _id && _id[0] || '',
  						name: name
  					});
  				}
  			});
      });
			return data;
		}
		function countries2(element) {
			var data = [];
			if (element) {
				element.forEach(function (el) {
  				data.push({
  					name: el
  				});
				});
			}
			return data;
		}
		function search$4() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			var status = new Lampa.Status(2);
			status.onComplite = function (data) {
				var items = [];
				if (data.movie && data.movie.results.length) items.push(data.movie);
				if (data.tv && data.tv.results.length) items.push(data.tv);
				oncomplite(items);
			};
			get$7('search', params, function (json) {
				var items = [];
				var itemss = [];
				if (json) {
					json.forEach(function (element) {
						if(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status) itemss.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
						else items.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
					});
					var movie = {
						results: items,
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
						type: 'movie'
					};
					status.append('movie', movie);
					var tv = {
						results: itemss,
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
						type: 'tv'
					};
					status.append('tv', tv);
				}
			}, status.error.bind(status));
		}
		function discovery$1() {
			return {
				title: 'FILMIX',
				search: search$4,
				params: {
					align_left: true,
					object: {
						source: 'filmix'
					}
				},
				onMore: function onMore(params) {
					Lampa.Activity.push({
						url: 'search',
						title: Lampa.Lang.translate('search') + ' - ' + params.query,
						component: 'category_full',
						query: encodeURIComponent(params.query),
						source: 'filmix'
					});
				},
				onCancel: Pub.network.clear.bind(Pub.network)
			};
		}
		var FILMIX = {
			main: main$1,
			menu: menu$2,
			full: full$2,
			search: search$4,
			person: person$3,
			list: list$3,
			seasons: seasons$1,
			category: category$2,
			clear: clear$4,
			discovery: discovery$1
		};
		Lampa.Api.sources.filmix = FILMIX;
		
	
		
	}
	if (!window.plugin_lmp) startPlugin();
	


})();

(function () {
    'use strict';
       backendhost = 'http://freebie.tom.ru';
       backendver = '919';
       backendhost_cf = 'https://cf.freebie.tom.ru';
    var Source = function () {
      this.network = new Lampa.Reguest();

      this.add = function (u, params) {
        return u + (/\?/.test(u) ? '&' : '?') + params;
      }

      this.url = function (u) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (backendver) u = this.add(u, 'v=' + backendver);
        if (this.source) u = this.add(u, 'source=' + this.source);
        if (params.id) u = this.add(u, 'id=' + params.id);
        if (params.genres) u = this.add(u, 'genre=' + params.genres);
        if (params.page) u = this.add(u, 'page=' + params.page);
        if (params.query) u = this.add(u, 'title=' + params.query);

        if (params.filter) {
          for (var i in params.filter) {
            u = this.add(u, i + '=' + params.filter[i]);
          }
        }

        return this.baseurl + u;
      }

      this.get = function (method) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
        var onerror = arguments.length > 3 ? arguments[3] : undefined;
        var u = this.url(method, params);
        var data;
        if (this.source && this.source == 'myshows' && u.indexOf('type=') > 0) {
          data = {};
          if (params && params.status) data.status = params.status;
          if (params && params.episodes) data.episodes = params.episodes;
          if (params && params.data) data.data = params.data;
          if (Lampa.Storage.get('pva_sources_myshows_password', false)) {
            data.login = Lampa.Storage.get('pva_sources_myshows_login', false);
            data.password = btoa(Lampa.Storage.get('pva_sources_myshows_password', false));
          } 
          else Lampa.Noty.show('Íåîáõîäèìî óêàçàòü äàííûå äëÿ àâòîðèçàöèè!');
        }
        this.network.silent(u, function (json) {
          if (json && json.error) { onerror(); Lampa.Noty.show(json.error); return; }
          json.url = method;
          oncomplite(json);
        }, onerror, (data ? JSON.stringify(data) : undefined) );
      }

      // this.main = function () { }
      // this.menu = function () { }

      // this.search = function () { }

      this.full =  function (params, oncomplite, onerror) {
        this.get('getSources', params, function (json) {
          if (json && json.movie && json.movie.source == 'tmdb') {
            params.id = json.movie.tmdb_id;
            params.method = json.movie.type;
            Lampa.Api.sources.tmdb.full(params, oncomplite, onerror);
          } else {
            var status = new Lampa.Status(3);
            status.onComplite = oncomplite;
            status.append('movie', (json && json.movie ? json.movie : []));
            status.append('episodes', (json && json.movie && json.movie.episodes ? json.movie.episodes : []));
            status.append('persons', (json && json.movie && json.movie.persons ? json.movie.persons : {}));
            status.append('collection', (json && json.movie && json.movie.collection ? json.movie.collection : {results: []}));
            status.append('simular', (json && json.movie && json.movie.similars ? json.movie.similars : {results: []}));
            status.append('videos', (json && json.movie && json.movie.trailers ? json.movie.trailers : {results: []}));
          }
        }, onerror);
      };

      this.list =  function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var u = this.url(params.url, params);
        this.network.silent(u, oncomplite, onerror);
      };

      // this.category = function () { }

      this.clear = function () {
        this.network.clear();
      };

      this.person = function (params, oncomplite, onerror) {
        Lampa.Api.sources.tmdb.person(params, oncomplite, onerror);
      }

      this.seasons = function (tv, from, oncomplite) {
        Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
      }

      // this.menuCategory = function (params, oncomplite) { }

      this.discovery = function () {
        // this.title = 'title';
        this.params = {
          align_left: true,
          object: {
            source: this.source
          }
        // this.search: search,
        };
        this.onMore = function onMore(params) {
          Lampa.Activity.push({
            url: 'getSources?type=' + params.data.type,
            title: Lampa.Lang.translate('search') + ' - ' + params.query,
            component: 'category_full',
            page: 2,
            query: encodeURIComponent(params.query),
            source: this.source
          });
        };
        this.onCancel = this.network.clear.bind(this.network)
        return this;
      };

      return this;
    }

    var SourceKP = function () {
      Source.call(this);
      this.title = 'KP';
      this.source = 'kp';
      this.baseurl = backendhost + '/lampa/';  

      this.search = function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var status = new Lampa.Status(2);

        status.onComplite = function (data) {
          var items = [];
          if (data.movie && data.movie.results.length) items.push(data.movie);
          if (data.tv && data.tv.results.length) items.push(data.tv);
          if (data.anime && data.anime.results.length) items.push(data.anime);
          oncomplite(items);
        };

        this.get('getSources', params, function (json) {
          var movie = {};
          movie.results = json.results.filter(function (elem) { return elem.type == 'movie' });
          movie.title = Lampa.Lang.translate('menu_movies');
          movie.type = 'movie';
          status.append('movie', movie);
          var tv = {};
          tv.results = json.results.filter(function (elem) { return elem.type == 'tv' });
          tv.title = Lampa.Lang.translate('menu_tv');
          tv.type = 'tv';
          status.append('tv', tv);
        }, status.error.bind(status));
      }

      this.seasons = function (tv, from, oncomplite) {
        var status = new Lampa.Status(1);
        status.onComplite = oncomplite;      
        from.forEach(function (season) {
          var seasons = (tv.seasons || []).filter(function (s) {
            return s.season_number === season;
          });
          if (seasons.length) {
            status.append('' + season, seasons.pop());
          } else {
            status.error();
          }
        });
      }

      this.person = function (params, oncomplite, onerror) {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      }

      if (Lampa.Storage.get('pva_sources_kp', false) === false) this.discovery = false;

    }

    var SourceHDRezka = function () {
      Source.call(this);
      this.title = 'HDRezka';
      this.source = 'hdrezka';
      this.baseurl = backendhost + '/lampa/';  
      this.categoryurl = 'getSources?ext=releases&type=new';

      this.search = function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var status = new Lampa.Status(2);

        status.onComplite = function (data) {
          var items = [];
          if (data.movie && data.movie.results.length) items.push(data.movie);
          if (data.tv && data.tv.results.length) items.push(data.tv);
          if (data.anime && data.anime.results.length) items.push(data.anime);
          oncomplite(items);
        };

        this.get('getSources', params, function (json) {
          var movie = {};
          movie.results = json.results.filter(function (elem) { return elem.type == 'movie' });
          movie.title = Lampa.Lang.translate('menu_movies');
          movie.type = 'movie';
          status.append('movie', movie);
          var tv = {};
          tv.results = json.results.filter(function (elem) { return elem.type == 'tv' });
          tv.title = Lampa.Lang.translate('menu_tv');
          tv.type = 'tv';
          status.append('tv', tv);
        }, status.error.bind(status));
      }

      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var parts_limit = 4;
        var parts_data = [
          function (call) {
            owner.get('getSources?type=films_watching', params, function (json) {
              json.title = Lampa.Lang.translate('menu_movies') + ' ' + Lampa.Lang.translate('title_now_watch');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=films_last', params, function (json) {
              json.title = Lampa.Lang.translate('menu_movies') + ' ' + Lampa.Lang.translate('title_new');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=serials_watching', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + Lampa.Lang.translate('title_now_watch');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=serials_last', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + Lampa.Lang.translate('title_new');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=cartoons_watching', params, function (json) {
              json.title = Lampa.Lang.translate('menu_multmovie') + ' ' + Lampa.Lang.translate('title_now_watch');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=cartoons_last', params, function (json) {
              json.title = Lampa.Lang.translate('menu_multmovie') + ' ' + Lampa.Lang.translate('title_new');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=animation_watching', params, function (json) {
              json.title = Lampa.Lang.translate('menu_anime') + ' ' + Lampa.Lang.translate('title_now_watch');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=animation_last', params, function (json) {
              json.title = Lampa.Lang.translate('menu_anime') + ' ' + Lampa.Lang.translate('title_new');
              call(json);
            }, call);
          },
        ];

        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
        }

        loadPart(oncomplite, onerror);
        return loadPart;
      }

      this.category = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;

        owner.get(this.categoryurl, params, function (json) {
          json.title = Lampa.Lang.translate('menu_movies');
          oncomplite([json]);
        }, onerror);

      }

      if (Lampa.Storage.get('pva_sources_hdrezka', false) == false) this.discovery = false;

    }

    var SourceKinoVOD = function () {
      Source.call(this);
      this.title = 'KinoVOD';
      this.source = 'kinovod';
      this.baseurl = backendhost + '/lampa/';  

      this.search = function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var status = new Lampa.Status(2);

        status.onComplite = function (data) {
          var items = [];
          if (data.movie && data.movie.results.length) items.push(data.movie);
          if (data.tv && data.tv.results.length) items.push(data.tv);
          if (data.anime && data.anime.results.length) items.push(data.anime);
          oncomplite(items);
        };

        this.get('getSources', params, function (json) {
          var movie = {};
          movie.results = json.results.filter(function (elem) { return elem.type == 'movie' });
          movie.title = Lampa.Lang.translate('menu_movies');
          movie.type = 'movie';
          status.append('movie', movie);
          var tv = {};
          tv.results = json.results.filter(function (elem) { return elem.type == 'tv' });
          tv.title = Lampa.Lang.translate('menu_tv');
          tv.type = 'tv';
          status.append('tv', tv);
        }, status.error.bind(status));
      }

      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var parts_limit = 4;
        var parts_data = [
          function (call) {
            owner.get('getSources?type=films_viewed_day', params, function (json) {
              json.title = Lampa.Lang.translate('menu_movies') + ' ' + Lampa.Lang.translate('title_trend_day');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=films_viewed_week', params, function (json) {
              json.title = Lampa.Lang.translate('menu_movies') + ' ' + Lampa.Lang.translate('title_trend_week');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=films_new', params, function (json) {
              json.title = Lampa.Lang.translate('menu_movies') + ' ' + Lampa.Lang.translate('title_new');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=serials_viewed_day', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + Lampa.Lang.translate('title_trend_day');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=serials_viewed_week', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + Lampa.Lang.translate('title_trend_week');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=serials_new', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + Lampa.Lang.translate('title_new');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=animation_viewed_week', params, function (json) {
              json.title = Lampa.Lang.translate('menu_anime') + ' ' + Lampa.Lang.translate('title_trend_week');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=tv_viewed_week', params, function (json) {
              json.title = 'TV' + ' ' + Lampa.Lang.translate('title_trend_week');
              call(json);
            }, call);
          },
        ];

        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
        }

        loadPart(oncomplite, onerror);
        return loadPart;
      }

      this.category = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var parts_limit = 3;
        var parts_data = [
          function (call) {
            owner.get('getSources?ext=num&type=movies_id', params, function (json) {
              json.title = Lampa.Lang.translate('menu_movies');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?ext=num&type=movies_4k', params, function (json) {
              json.title = '4K';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?ext=num&type=tv', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?ext=num&type=cartoons', params, function (json) {
              json.title = Lampa.Lang.translate('menu_multmovie');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?ext=num&type=cartoons_tv', params, function (json) {
              json.title = Lampa.Lang.translate('menu_multtv');
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?ext=num&type=legends', params, function (json) {
              json.title = Lampa.Lang.translate('title_in_top');
              call(json);
            }, call);
          },
        ];

        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
        }

        loadPart(oncomplite, onerror);
        return loadPart;
      }

      if (Lampa.Storage.get('pva_sources_kinovod', false) == false) this.discovery = false;

    }

    var SourceMyShows = function () {
      Source.call(this);
      this.title = 'MyShows';
      this.source = 'myshows';
      this.baseurl = backendhost + '/lampa/';  

      this.search = function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var status = new Lampa.Status(2);

        status.onComplite = function (data) {
          var items = [];
          if (data.movie && data.movie.results.length) items.push(data.movie);
          if (data.tv && data.tv.results.length) items.push(data.tv);
          if (data.anime && data.anime.results.length) items.push(data.anime);
          oncomplite(items);
        };

        this.get('getSources', params, function (json) {
          var movie = {};
          movie.results = json.results.filter(function (elem) { return elem.type == 'movie' });
          movie.title = Lampa.Lang.translate('menu_movies');
          movie.type = 'movie';
          status.append('movie', movie);
          var tv = {};
          tv.results = json.results.filter(function (elem) { return elem.type == 'tv' });
          tv.title = Lampa.Lang.translate('menu_tv');
          tv.type = 'tv';
          status.append('tv', tv);
        }, status.error.bind(status));
      }

      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var parts_limit = 1;
        var parts_data = [
          function (call) {
            owner.get('getSources?type=unwatched', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'ê ïðîñìîòðó';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=next', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'ñêîðî';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=shows', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'â ïðîôèëå';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=all', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'ñïèñîê';
              call(json);
            }, call);
          },
        ];

        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
        }

        this.get('getSources?type=shows', params, function (json) {
          loadPart(oncomplite, onerror);
          return loadPart;
        }, onerror);

      }

      this.seasons = function (tv, from, oncomplite) {
        var status = new Lampa.Status(1);
        status.onComplite = oncomplite;      
        from.forEach(function (season) {
          var seasons = (tv.seasons || []).filter(function (s) {
            return s.season_number === season;
          });
          if (seasons.length) {
            status.append('' + season, seasons.pop());
          } else {
            status.error();
          }
        });
      }

      if (Lampa.Storage.get('pva_sources_myshows', false) == false) this.discovery = false;

      function button_click (card) {        
        Lampa.Select.show({
          title: 'MyShows',
          items: [{
            title: 'Îòìåòèòü ñåðèàë',
            "checkShow": true,
          }, {
            title: 'Îòìåòèòü ýïèçîäû',
            "checkEpisode": true
          }, {
            title: 'Ïåðåäóìàë',
            "checkExit": true
          }],
          onSelect: function onSelect(a) {
            var this2 = this;
            if (a["checkExit"]) { Lampa.Controller.toggle('content'); return; }
            var myshows = Lampa.Api.sources.myshows;
            if (card == undefined || card.movie == undefined || card.movie.myshows_id == undefined) { 
              myshows.get('getSources?type=getShowId', { id: card.movie.id, data: { source: card.movie.source, id: card.movie.id, serial: (card.movie.number_of_seasons || card.movie.seasons ? 1 : 0), title: card.movie.title || card.movie.name || card.movie.original_title || card.movie.original_name, imdb_id: card.movie.imdb_id, kinopoisk_id: card.movie.kinopoisk_id } } , function (json) {
                if (json.myshows_id) { card.movie.myshows_id = json.myshows_id; this2.onSelect(a); }
                else { Lampa.Noty.show('myshows_id íå íàéäåí'); Lampa.Controller.toggle('content'); }                
              }, function (aa, cc) { Lampa.Controller.toggle('content'); } 
              );              
              return;
            }
            if (a["checkShow"]) {
              myshows.get('getSources?type=getShow', { id: card.movie.myshows_id } , function (json) {

                Lampa.Select.show({
                  title: 'Ñòàòóñ ñåðèàëà',
                  items: [{
                    title: 'Ñìîòðþ',
                    "watching": true,
                    value: "watching",
                    selected: (json && json.watching ? json.watching : false)
                  }, {
                    title: 'Áóäó ñìîòðåòü',
                    "later": true,
                    value: "later",
                    selected: (json && json.later ? json.later : false)
                  }, {
                    title: 'Ïîñìîòðåë',
                    "finished": true,
                    value: "finished",
                    selected: (json && json.finished ? json.finished : false)
                  }, {
                    title: 'Ïåðåñòàë',
                    "cancelled": true,
                    value: "cancelled",
                    selected: (json && json.cancelled ? json.cancelled : false)
                  }, {
                    title: 'Íå ñìîòðþ',
                    "remove": true,
                    value: "remove",
                    selected: (json && json.remove ? json.remove : false)
                  }],
                  onSelect: function onSelect(b) {
                    
                    if (b["watching"] || b["later"] || b["finished"] || b["cancelled"] || b["remove"]) {
                      myshows.get('getSources?type=setShow', { id: card.movie.myshows_id, status: b.value } , function (json) {
                        if (json.success) Lampa.Noty.show('Óñïåøíî!');
                        Lampa.Controller.toggle('content');
                      }, function (aa, cc) { Lampa.Controller.toggle('content'); } 
                      );              
                    } else {
                      Lampa.Controller.toggle('content');
                    }

                  },
                  onBack: function onBack() {
                    Lampa.Controller.toggle('content');
                  }                  
                });

              }, function (aa, cc) { Lampa.Controller.toggle('content'); } 
              );              

            } else if (a["checkEpisode"]) {
              myshows.get('getSources?type=getEpisodes', { id: card.movie.myshows_id } , function (json) {

                var items = [];
                (json.unwatched || []).forEach( function (episode) {
                  items.push({ title: episode.overview+', '+episode.name, "watched": true, value: episode, selected: false });
                })
                Lampa.Select.show({
                  title: 'Ïîñëåäíÿÿ ïðîñìîòðåííàÿ',
                  items: items,
                  onSelect: function onSelect(b) {

                    if (b["watched"]) {
                      var episodes = [];
                      (json.unwatched || []).forEach( function (episode) { 
                        if ((+episode.season_number < +b.value.season_number) || (+episode.season_number == +b.value.season_number && +episode.episode_number <= +b.value.episode_number)) 
                          episodes.push(episode.id);
                      })
                      myshows.get('getSources?type=setEpisodes', { id: card.movie.myshows_id, episodes: episodes.join(',') } , function (json) {
                        if (json.success) Lampa.Noty.show('Óñïåøíî!');
                        Lampa.Controller.toggle('content');
                      }, function (aa, cc) { Lampa.Controller.toggle('content'); } 
                      );              
                    } else {
                      Lampa.Controller.toggle('content');
                    }

                  },
                  onBack: function onBack() {
                    Lampa.Controller.toggle('content');
                  }                  
                });

              }, function (aa, cc) { Lampa.Controller.toggle('content'); } 
              );              
            } else {
              Lampa.Controller.toggle('content');
            }
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      }

      this.add_button = function () {
        var button = "<div class=\"full-start__button selector button--myshows\" data-subtitle=\"MyShows\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 16 16\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M4 1.9c0 .5.7 1.1 1.4 1.4 1 .4 1.3.1.9-.9C5.7.9 4 .5 4 1.9zM9.7 2.4c-.4 1-.1 1.3.9.9 1.5-.6 1.9-2.3.5-2.3-.5 0-1.1.7-1.4 1.4zM5 4.9c-2.1.6-2.5 1.3-2.5 4.6v4h11l.3-3.4c.2-1.8 0-3.7-.5-4.1C12 4.8 7.7 4.2 5 4.9zm7 4.6c0 2.2-.4 2.5-4 2.5s-4-.3-4-2.5C4 7.2 4.4 7 8 7s4 .2 4 2.5z\" fill=\"currentColor\"/>\n     </g></svg>\n\n    <span>MyShows</span>\n    </div>";
        Lampa.Listener.follow('full', function (e) {
          if (e.type == 'complite') {
            var btn = $(Lampa.Lang.translate(button));
            btn.on('hover:enter', function () {
              button_click(e.data);
            });
            if (e.data && e.data.movie && ['myshows','tmdb','cub'].indexOf(e.data.movie.source) != -1 && (e.data.movie.number_of_seasons || e.data.movie.seasons) && Lampa.Storage.get('pva_sources_myshows_password', false))
              e.object.activity.render().find('.button--book').after(btn);
          }
        });
      }

    }

    function startPlugin() {
      window.plugin_sources_ready = true;
      if (Lampa.Storage.get('pva_sources', false) === false) return;

      function add() {

        Lampa.Plugins.loaded().forEach( function (plugin) { 
          if (plugin.toLowerCase().indexOf(backendhost_cf.toLowerCase()) != -1 && plugin.toLowerCase().indexOf('/sources.') != -1) backendhost = backendhost_cf; 
        })

        /*var kp = new SourceKP;
        Lampa.Api.sources.kp = kp;
        Object.defineProperty(Lampa.Api.sources, 'kp', {
          get: function get() {
            return kp;
          }
        });*/

        var hdrezka = new SourceHDRezka;
        Lampa.Api.sources.hdrezka = hdrezka;
        Object.defineProperty(Lampa.Api.sources, 'hdrezka', {
          get: function get() {
            return hdrezka;
          }
        });

        var kinovod = new SourceKinoVOD;
        Lampa.Api.sources.kinovod = kinovod;
        Object.defineProperty(Lampa.Api.sources, 'kinovod', {
          get: function get() {
            return kinovod;
          }
        });

        var myshows = new SourceMyShows;
        Lampa.Api.sources.myshows = myshows;
        Object.defineProperty(Lampa.Api.sources, 'myshows', {
          get: function get() {
            return myshows;
          }
        });
        myshows.add_button();
        
         Lampa.Params.select('source', {
           'tmdb': 'TMDB',
           'cub': 'CUB',
            //'pub': 'PUB',
            //'filmix': 'FILMIX',
           'hdrezka': 'HDRezka',
           'kinovod': 'KinoVOD',
         }, 'tmdb');  

        var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"800\" height=\"800\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M29.753.049L16.533 3.63c-.336.09-1.066.089-1.4-.005L2.253.056C1.104-.261-.01.568-.01 1.752v24.316c0 1.003.76 1.962 1.728 2.232l12.88 3.57c.345.096.788.149 1.248.149.315 0 .781-.024 1.21-.142l13.22-3.581c.971-.262 1.734-1.22 1.734-2.227V1.752C32.011.569 30.897-.262 29.752.049zM15 29.904L2.221 26.371c-.096-.026-.232-.203-.232-.303V2.067l12.608 3.486c.122.034.259.061.402.083v24.269zm15.01-3.836c0 .099-.162.27-.258.297l-12.753 3.454V5.572c.018-.005.038-.007.056-.012l12.954-3.504v24.012zm-9.948-14.621a.98.98 0 00.272-.037l6.998-1.97a1 1 0 10-.542-1.926l-6.998 1.97a1 1 0 00.27 1.963zm.001 6c.09 0 .182-.012.272-.037l6.998-1.97a1 1 0 10-.542-1.927l-6.998 1.97a1 1 0 00.27 1.963zm0 6c.09 0 .182-.012.272-.037l6.998-1.97a1 1 0 00-.542-1.926l-6.998 1.97a1 1 0 00.27 1.964zM12.332 9.484l-6.998-1.97a1.001 1.001 0 00-.542 1.926l6.998 1.97a1 1 0 10.54-1.926zm0 6l-6.998-1.97a1 1 0 00-.542 1.927l6.998 1.97a1 1 0 10.54-1.927zm0 6l-6.998-1.97a1.001 1.001 0 00-.542 1.926l6.998 1.97a1 1 0 10.54-1.927z\" fill=\"white\"/></svg>\n            </div>\n            <div class=\"menu__text\">".concat(Lampa.Lang.translate('settings_rest_source'), "</div>\n        </li>"));
        button.on('hover:enter', function () {        
            var items = [ 
              { title: Lampa.Lang.translate('title_main')+' - TMDB', source: 'tmdb' }, 
              { title: Lampa.Lang.translate('title_main')+' - CUB', source: 'cub' },
              { title: Lampa.Lang.translate('title_main')+' - NUM', source: 'kinovod', component: 'category' }, 
              { title: Lampa.Lang.translate('title_main')+' - Releases', source: 'hdrezka', component: 'category_full', url: hdrezka.categoryurl  }, 
              { title: Lampa.Lang.translate('title_main')+' - MyShows', source: 'myshows' },
              { title: Lampa.Lang.translate('title_main')+' - HDRezka', source: 'hdrezka' },
              { title: Lampa.Lang.translate('title_main')+' - KinoVOD', source: 'kinovod' },
            ];
            //if (Lampa.Api.sources.KP  != undefined) items.push( { title: Lampa.Lang.translate('title_main')+' - KP', source: 'KP' }  );
            //if (Lampa.Api.sources.pub  != undefined) items.push( { title: Lampa.Lang.translate('title_main')+' - PUB', source: 'pub' }  );
           // if (Lampa.Api.sources.filmix  != undefined) items.push( { title: Lampa.Lang.translate('title_main')+' - Filmix', source: 'filmix' }  );
            Lampa.Select.show({
              title: Lampa.Lang.translate('settings_rest_source'),
              items: items,
              onSelect: function onSelect(a) {
                Lampa.Activity.push({
                  title: a.title,
                  url: a.url,
                  component: a.component || 'main',
                  source: a.source,
                  page: 1
                });
              },
              onBack: function onBack() {
                Lampa.Controller.toggle('menu');
              }
            });
        });
        //$('.menu .menu__list').eq(0).append(button);    
      }

     /* function startDCMA() {
        var dcma_timer = setInterval( function() {
          if(window.lampa_settings.dcma){
            clearInterval(dcma_timer)          
            window.lampa_settings.dcma = false
          }
        },500)
      }*/

      if (window.appready) add(); else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') { add();  }
        });
      }
    }
    
    if (!window.plugin_sources_ready) startPlugin();
     

})();


