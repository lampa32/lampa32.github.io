(function ( backendhost, backendver, backendhost_cf ) {
    'use strict';
    // backendhost = 'http://192.168.1.100:3333';

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
          else Lampa.Noty.show('Необходимо указать данные для авторизации!');
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
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'к просмотру';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=next', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'скоро';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=shows', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'в профиле';
              call(json);
            }, call);
          },
          function (call) {
            owner.get('getSources?type=all', params, function (json) {
              json.title = Lampa.Lang.translate('menu_tv') + ' ' + 'список';
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
            title: 'Отметить сериал',
            "checkShow": true,
          }, {
            title: 'Отметить эпизоды',
            "checkEpisode": true
          }, {
            title: 'Передумал',
            "checkExit": true
          }],
          onSelect: function onSelect(a) {
            var this2 = this;
            if (a["checkExit"]) { Lampa.Controller.toggle('content'); return; }
            var myshows = Lampa.Api.sources.myshows;
            if (card == undefined || card.movie == undefined || card.movie.myshows_id == undefined) { 
              myshows.get('getSources?type=getShowId', { id: card.movie.id, data: { source: card.movie.source, id: card.movie.id, serial: (card.movie.number_of_seasons || card.movie.seasons ? 1 : 0), title: card.movie.title || card.movie.name || card.movie.original_title || card.movie.original_name, imdb_id: card.movie.imdb_id, kinopoisk_id: card.movie.kinopoisk_id } } , function (json) {
                if (json.myshows_id) { card.movie.myshows_id = json.myshows_id; this2.onSelect(a); }
                else { Lampa.Noty.show('myshows_id не найден'); Lampa.Controller.toggle('content'); }                
              }, function (aa, cc) { Lampa.Controller.toggle('content'); } 
              );              
              return;
            }
            if (a["checkShow"]) {
              myshows.get('getSources?type=getShow', { id: card.movie.myshows_id } , function (json) {

                Lampa.Select.show({
                  title: 'Статус сериала',
                  items: [{
                    title: 'Смотрю',
                    "watching": true,
                    value: "watching",
                    selected: (json && json.watching ? json.watching : false)
                  }, {
                    title: 'Буду смотреть',
                    "later": true,
                    value: "later",
                    selected: (json && json.later ? json.later : false)
                  }, {
                    title: 'Посмотрел',
                    "finished": true,
                    value: "finished",
                    selected: (json && json.finished ? json.finished : false)
                  }, {
                    title: 'Перестал',
                    "cancelled": true,
                    value: "cancelled",
                    selected: (json && json.cancelled ? json.cancelled : false)
                  }, {
                    title: 'Не смотрю',
                    "remove": true,
                    value: "remove",
                    selected: (json && json.remove ? json.remove : false)
                  }],
                  onSelect: function onSelect(b) {
                    
                    if (b["watching"] || b["later"] || b["finished"] || b["cancelled"] || b["remove"]) {
                      myshows.get('getSources?type=setShow', { id: card.movie.myshows_id, status: b.value } , function (json) {
                        if (json.success) Lampa.Noty.show('Успешно!');
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
                  title: 'Последняя просмотренная',
                  items: items,
                  onSelect: function onSelect(b) {

                    if (b["watched"]) {
                      var episodes = [];
                      (json.unwatched || []).forEach( function (episode) { 
                        if ((+episode.season_number < +b.value.season_number) || (+episode.season_number == +b.value.season_number && +episode.episode_number <= +b.value.episode_number)) 
                          episodes.push(episode.id);
                      })
                      myshows.get('getSources?type=setEpisodes', { id: card.movie.myshows_id, episodes: episodes.join(',') } , function (json) {
                        if (json.success) Lampa.Noty.show('Успешно!');
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

    function stPlugin() {
      window.plugin_sources_ready = true;
     // if (Lampa.Storage.get('pva_sources', false) === false) return;

      function add() {

      /*  Lampa.Plugins.loaded().forEach( function (plugin) { 
          if (plugin.toLowerCase().indexOf(backendhost_cf.toLowerCase()) != -1 && plugin.toLowerCase().indexOf('/sources.') != -1) backendhost = backendhost_cf; 
        })*/

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
           // 'pub': 'PUB',
           // 'filmix': 'FILMIX',
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
          //  if (Lampa.Api.sources.KP  != undefined) items.push( { title: Lampa.Lang.translate('title_main')+' - KP', source: 'KP' }  );
          //  if (Lampa.Api.sources.pub  != undefined) items.push( { title: Lampa.Lang.translate('title_main')+' - PUB', source: 'pub' }  );
          //  if (Lampa.Api.sources.filmix  != undefined) items.push( { title: Lampa.Lang.translate('title_main')+' - Filmix', source: 'filmix' }  );
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
    
    if (!window.plugin_sources_ready) stPlugin();

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
      var kp_prox = 'https://cors.kp556.workers.dev:8443/';
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
              'X-API-KEY': '2a4a0808-81a3-40ae-b0d3-e11335ede616'
            }
          });
        } else onerror(a, c);
      }, false, {
        headers: {
          'X-API-KEY': '2a4a0808-81a3-40ae-b0d3-e11335ede616'
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
      return cleanTitle(str.toLowerCase().replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, '-').replace(/ё/g, 'е'));
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

})( 'http://freebie.tom.ru', '919', 'https://cf.freebie.tom.ru' );
