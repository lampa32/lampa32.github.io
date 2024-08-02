(function () {
    'use strict';
    Lampa.Platform.tv();

 Lampa.SettingsApi.addParam({
  component: 'more',
  param: {
    name: 'pva_timeline',
    type: 'trigger',
    default: false
  },
  field: {
    name: 'Синхронизация таймкодов',
    description: 'Синхронизация таймкодов, требуется токен'
  },
  onChange: function (value) {
    if (value == 'true') {
      Lampa.Storage.set('timeline_last_update_time', 0);
      startTimecode();
    } else {
      startTimecode(true);
    }
  }
});

var Timecode = function () {
  this.network = new Lampa.Reguest();
  this.error = 0;
  this.viewed = Lampa.Storage.cache('file_view_sync', 1000, {});
  var _this = this;
  this.received = {};

  this.init = function () {
    this.token = Lampa.Storage.get('token', '');
    if (!this.token) {
      Lampa.Noty.show('Timeline - нужен токен авторизации');
      return;
    }
    this.enable = true;
    this.last_update_time = Lampa.Storage.get('timeline_last_update_time', 0);
    Lampa.Listener.follow('full', this.fullListener);
    Lampa.Timeline.listener.follow('update', this.updateTimeline);
    Lampa.Player.listener.follow('destroy', this.destroyPlayer);
    _this.update(60 * 1000);
  }

  this.fullListener = function (e) {
    if (e.type == 'complite') _this.update(60 * 60 * 1000);
  }

  this.updateTimeline = function (e) {
    if (e.data == undefined || e.data.hash == undefined || e.data.hash.length <= 1) return;
    if (_this.received[e.data.hash]) { delete _this.received[e.data.hash]; return; }
    _this.viewed[e.data.hash] = e.data.road;
    Lampa.Storage.set('file_view_sync', _this.viewed, true);
    if (Lampa.Player.opened() == false && Lampa.Storage.field('player') != 'inner' && Lampa.Storage.field('player') != 'tizen') _this.add();
  }

  this.destroyPlayer = function (e) {
    _this.add();
  }

  this.url = function (method) {
    var url = 'http://212.113.103.137:3002/lampa/timeline/' + method;
    url = Lampa.Utils.addUrlComponent(url, 'token=' + encodeURIComponent(this.token));
    url = Lampa.Utils.addUrlComponent(url, 'start=' + Lampa.Storage.get('timeline_last_update_time', 0));
    url = Lampa.Utils.addUrlComponent(url, 'player=' + Lampa.Storage.field('player'));
    return url;
  }

  this.add = function () {
    if (!this.enable || this.error > 3) return;
    var url = this.url('add');
    var data_sync = [];
    for (var i in _this.viewed) {
      data_sync.push({ id: i, data: _this.viewed[i] });
    }
    if (data_sync.length == 0) return;
    this.network.silent(url, function () {
      for (var i in data_sync) { delete _this.viewed[data_sync[i].id]; }
      Lampa.Storage.set('file_view_sync', _this.viewed, true);
    }, function (a, c) { this.error++; }, JSON.stringify(data_sync));
  }

  this.update = function (timeout) {
  if (!this.enable || this.error > 3 || this.last_update_time + timeout > Date.now()) return;
  this.last_update_time = Date.now();
  var url = this.url('all');
  this.network.silent(url, function (result) {
    if (result.error) return;
    if (result.result) {
      if (result.timelines && Lampa.Arrays.getKeys(result.timelines).length > 0) {
        for (var i in result.timelines) {
          var time = result.timelines[i];
          if (!Lampa.Arrays.isObject(time)) continue;
          _this.received[i] = true;
          Lampa.Timeline.update({ hash: i, duration: time.duration, time: time.time, percent: time.percent, profile: time.profile, received: true });
        }
      }
      Lampa.Storage.set('timeline_last_update_time', _this.last_update_time);
    }
  }, function (a, c) { this.error++; });
}

this.destroy = function () {
  Lampa.Listener.remove('full', this.fullListener);
  Lampa.Timeline.listener.remove('update', this.updateTimeline);
  Lampa.Player.listener.remove('destroy', this.destroyPlayer);
  this.enable = false;
  this.network.clear();
};

return this;
}

function startTimecode(destroy) {
  //if (window.plugin_FilmixPVA.mini) return;
  if (!destroy) {
    if (Lampa.Storage.get('pva_timeline', false)) {
      if (Lampa.Timeline.listener) {
        if (!Lampa.timecode) Lampa.timecode = new Timecode();
        Lampa.timecode.init();
      }
    }
  } else if (Lampa.timecode) {
    Lampa.timecode.destroy();
  }
}
  

})();
