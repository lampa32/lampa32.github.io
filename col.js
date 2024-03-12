(function () {
    'use strict';
function lampishecol() {
      window.rating_plugin = true;
      Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
          var render = e.object.activity.render();
          if ($('.rate--kp', render).hasClass('hide') && !$('.wait_rating', render).length) {
            $('.info__rate', render).after('<div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div><div>');
          }
        }
      });
      var network = new Lampa.Reguest();
      var api_url = 'https://api.lampishe.cc/collections/';
      function main(params, oncomplite, onerror) {
        network.silent(api_url + '?page=' + params.page, function (data) {
          data.collection = true;
          data.total_pages = data.total_pages || 1;
          data.results.forEach(function (element) {
            element.poster_path = element.img;
            element.backdrop_path = element.img;
          });
          oncomplite(data);
        }, onerror);
      }
      function full(params, oncomplite, onerror) {
        network.silent(api_url + 'view/' + params.url + '?page=' + params.page, function (data) {
          data.total_pages = data.total_pages || 15;
          oncomplite(data);
        }, onerror);
      }
      function clear() {
        network.clear();
      }
      var Api = {
        main: main,
        full: full,
        clear: clear
      };
      function component$1(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
          Api.main(object, this.build.bind(this), this.empty.bind(this));
        };
        comp.nextPageReuest = function (object, resolve, reject) {
          Api.main(object, resolve.bind(comp), reject.bind(comp));
        };
        comp.cardRender = function (object, element, card) {
          card.onMenu = false;
          card.onEnter = function () {
            Lampa.Activity.push({
              url: element.hpu,
              title: element.title,
              component: 'lampishe_collection',
              page: 1
            });
          };
        };
        return comp;
      }
      function component(object) {
        var comp = new Lampa.InteractionCategory(object);
        comp.create = function () {
          Api.full(object, this.build.bind(this), this.empty.bind(this));
        };
        comp.nextPageReuest = function (object, resolve, reject) {
          Api.full(object, resolve.bind(comp), reject.bind(comp));
        };
        return comp;
      }
      var manifest = {
        type: 'video',
        version: '1.1.1',
        name: 'РљРѕР»Р»РµРєС†РёРё',
        description: '',
        component: 'lampishe_collections'
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Component.add('lampishe_collections', component$1);
      Lampa.Component.add('lampishe_collection', component);
    }
    lampishecol();
})();
