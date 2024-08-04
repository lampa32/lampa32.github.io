(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Timecode = /*#PURE*/ function () {
    function Timecode(field) {
      _classCallCheck(this, Timecode);
      this.localhost = 'http://212.113.103.137:3002/';
      this.network = new Lampa.Reguest();
    }

    _createClass(Timecode, [{
      key: "init",
      value: function init() {
        var _this = this;
        Lampa.Timeline.listener.follow('update', this.add.bind(this));
        Lampa.Listener.follow('full', function (e) {
          if (e.type == 'complite') _this.update();
        });
      }
    }, {
      key: "url",
      value: function url(method) {
        var url = this.localhost + 'lampa/timeline/' + method;
        var token = localStorage.getItem('token');
        url = Lampa.Utils.addUrlComponent(url, 'token=' + encodeURIComponent(token));
        return url;
      }
    }, {
      key: "filename",
      value: function filename() {
        var token = localStorage.getItem('token');
        var name = 'file_view' + (token ? '_' + token : '');
        if (window.localStorage.getItem(name) === null && token) {
          Lampa.Storage.set(name, Lampa.Arrays.clone(Lampa.Storage.cache('file_view', 10000, {})));
        }
        return name;
      }
    }, {
      key: "update",
      value: function update() {
        var _this2 = this;
        var url = this.url('all');
        this.network.silent(url, function (result) {
          if (result.accsdb) return;
          var viewed = Lampa.Storage.cache(_this2.filename(), 10000, {});
          for (var i in result) {
            var time = JSON.parse(result[i]);
            if (!Lampa.Arrays.isObject(time)) continue;
            viewed[i] = time;
            Lampa.Arrays.extend(viewed[i], {
              duration: 0,
              time: 0,
              percent: 0
            });
            delete viewed[i].hash;
          }
          Lampa.Storage.set(_this2.filename(), viewed, true);
        });
      }
    }, {
      key: "add",
      value: function add(e) {
        var url = this.url('add');
        this.network.silent(url, false, false, {
          id: e.data.hash,
          data: JSON.stringify(e.data.road)
        });
      }
    }]);

    return Timecode;
  }();

  function startPlugin() {
    window.lampac_timecode_plugin = true;
    if (Lampa.Timeline.listener) {
      var code = new Timecode();
      code.init();
    }
  }

  if (!window.lampac_timecode_plugin)
    startPlugin();

})();
