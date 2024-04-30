(function () {
    'use strict';
               
var Theme = /*#PURE*/function () {
  function Theme() {
    _classCallCheck(this, Theme);
  }
  _createClass(Theme, [{
    key: "init",
    value: function init() {
      if (this.get()) this.set(this.get());
    }
  }, {
    key: "toggle",
    value: function toggle(url) {
      if (url) {
        Storage.set('cub_theme', url);
        this.set(url);
      } else {
        Storage.set('cub_theme', '');
        $('#cub-theme').remove();
      }
    }
  }, {
    key: "get",
    value: function get() {
      return Storage.get('cub_theme', '');
    }
  }, {
    key: "set",
    value: function set(url) {
      $('#cub-theme').remove();
      var href = Utils.rewriteIfHTTPS(Utils.addUrlComponent(url, 'token=' + encodeURIComponent(Storage.get('account', '{}').token)));
      var css = $('<link rel="stylesheet" href="' + href + '" id="cub-theme">');
      $('body').append(css);
    }
  }]);
  return Theme;
}();

var ThemeInstance = new Theme();

var ThemeItem = /*#PURE*/function (_Item) {
  _inherits(ThemeItem, _Item);
  var _super = _createSuper(ThemeItem);
  function ThemeItem(data, params) {
    var _this;
    _classCallCheck(this, ThemeItem);
    _this = _super.call(this, data, params);
    _this.template = 'extensions_theme';
    _this.link = Utils.rewriteIfHTTPS(Utils.protocol() + 'lampa.run.place/' + _this.data.id);
    return _this;
  }
  _createClass(ThemeItem, [{
    key: "update",
    value: function update() {
      this.html.querySelector('.extensionsitem-name').innerText = this.data.name || 'Без названия';
      if (this.active()) this.html.classList.add('active');
      else this.html.classList.remove('active');
    }
  }, {
    key: "active",
    value: function active() {
      return Storage.get('cub_theme', '') == this.link;
    }
  }, {
    key: "visible",
    value: function visible() {
      var _this2 = this;
      _get(_getPrototypeOf(ThemeItem.prototype), "visible", this).call(this);
      this.img = this.html.querySelector('.extensionsitem-image');
      this.img.onload = function () {
        _this2.img.classList.add('loaded');
      };
      this.img.src = Utils.rewriteIfHTTPS(this.data.image);
      this.html.addEventListener('hover:enter', this.menu.bind(this));
      this.html.addEventListener('click', this.toggleTheme.bind(this));
    }
  }, {
    key: "menu",
    value: function menu() {
      var _this3 = this;
      var menu = [];
      var controller = Controller.enabled().name;
      menu.push({
        title: 'Включить/Выключить тему',
        toggle: true
      });
      Select.show({
        title: 'Действие',
        items: menu,
        onBack: function onBack() {
          Controller.toggle(controller);
        },
        onSelect: function onSelect(a) {
          Controller.toggle(controller);
          if (a.toggle) {
            ThemeInstance.toggle(_this3.active() ? '' : _this3.link);
            _this3.update();
          }
        }
      });
    }
  }, {
    key: "toggleTheme",
    value: function toggleTheme() {
      if (!this.active()) {
        ThemeInstance.toggle(this.link);
        this.update();
      } else {
        ThemeInstance.toggle('');
        this.update();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ThemeItem.prototype), "destroy", this).call(this);
      if (this.img) {
        this.img.onload = false;
        this.img.onerror = false;
      }
    }
  }]);
  return ThemeItem;
}(Item);
    
    // Добавление нового параметра настроек
    Lampa.SettingsApi.addParam({
      component: 'interface',
      param: {
        name: 'col',
        type: 'static',
      },
      field: {
        name: '123'
      },
      onRender: function(item) {
        setTimeout(function() {
          $('.settings-param > div:contains("123")').parent().insertAfter($('div[data-name="interface_size"]'))
        }, 100);
        item.on('hover:enter', function() {
          Lampa.Extensions.show({
            store: 'https://lampa32.github.io/extensions.json',
            with_installed: true
          });
        });
      }
    });
  })
})();
