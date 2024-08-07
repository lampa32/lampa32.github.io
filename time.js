(function () {
  'use strict';

  Lampa.SettingsApi.addParam({
        component: 'acc',
        param: {
          name: 'acc_timecode',
          type: 'trigger', //доступно select,input,trigger,title,static
          default: false
        },
        field: {
          name: 'Синхронизация таймкодов', 
          description: 'Синхронизация таймкодов, требуется аккаут CUB'
        },
        onChange: function (value) {
          if (value == 'true') { 
            var token = localStorage.getItem('token');
            if (token) {
                 //startTimecode(); 
              Lampa.Noty.show("Вы");
                 
            } else {
                 Lampa.Noty.show("Вы не зашли в аккаунт");
                 if (Lampa.Storage.field('acc_timecode') == true) {
                     Lampa.Storage.set('acc_timecode', false);
                     Lampa.Settings.update();
                 }
            } 
          }
        }
  });

 function startTimecode() {
    // if (Lampa.Storage.field('acc_timecode') == true) {

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
        if (token) {
          url = Lampa.Utils.addUrlComponent(url, 'token=' + encodeURIComponent(token));
        }
        return url;
      }
    }, {
      key: "update",
      value: function update() {
        var _this2 = this;
        var url = this.url('all');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.accsdb) return;
            Lampa.Storage.set(_this2.filename(), result, true);
          } else if (xhr.readyState === 4) {
            console.error('Error fetching timecodes:', xhr.status);
          }
        };
        xhr.send();
      }
    }, {
      key: "add",
      value: function add(e) {
        var url = this.url('add');
        var data = {
          id: e.data.hash,
          data: JSON.stringify(e.data.road)
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Timecode added successfully');
          } else if (xhr.readyState === 4) {
            console.error('Error adding timecode:', xhr.status);
          }
        };
        xhr.send(JSON.stringify(data));
      }
    }, {
      key: "filename",
      value: function filename() {
        var token = localStorage.getItem('token');
        return 'file_view';
      }
    }]);

    return Timecode;
  }();
 
  
       var timecode = new Timecode();
       timecode.init();
    
    //}
 }
})();
