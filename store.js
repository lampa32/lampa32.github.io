(function () {
    'use strict';

	var Theme = /*#__PURE__*/function (_Item) {
    function Theme(data, params) {
      var _this;
      _classCallCheck(this, Theme);
      _this = _callSuper(this, Theme, [data, params]);
      _this.template = 'extensions_theme';
      _this.link = 'http://' + 'lampa.run.place/' + _this.data.id + '.css';
      return _this;
    }
    _inherits(Theme, _Item);
    return _createClass(Theme, [{
      key: "update",
      value: function update() {
        this.html.querySelector('.extensions__item-name').innerText = this.data.name || Lang.translate('extensions_no_name');
        if (this.active()) this.html.classList.add('active');else this.html.classList.remove('active');
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
        _get(_getPrototypeOf(Theme.prototype), "visible", this).call(this);
        if (this.data.premium) this.premium();
        this.img = this.html.querySelector('.extensions__item-image');
        this.img.onload = function () {
          _this2.img.classList.add('loaded');
        };
        this.img.src = Utils$2.rewriteIfHTTPS(this.data.image);
        this.html.addEventListener('hover:enter', this.menu.bind(this));
      }
    }, {
      key: "menu",
      value: function menu() {
        var _this3 = this;
        var menu = [];
        var controller = Controller.enabled().name;
        menu.push({
          title: Lang.translate('extensions_' + (this.active() ? 'disable' : 'enable')),
          toggle: true
        });
        Select.show({
          title: Lang.translate('title_action'),
          items: menu,
          onBack: function onBack() {
            Controller.toggle(controller);
          },
          onSelect: function onSelect(a) {
            Controller.toggle(controller);
            if (a.toggle) {
              // if(!this.active() && this.data.premium && !Account.hasPremium()) return Lampa.Account.showCubPremium()

              Theme$2.toggle(_this3.active() ? '' : _this3.link);
              _this3.update();
            }
          }
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(Theme.prototype), "destroy", this).call(this);
        if (this.img) {
          this.img.onload = false;
          this.img.onerror = false;
        }
      }
    }]);
  }(Item);
               
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
                            item.on('hover:enter', function () {
                                  Lampa.Extensions.show({ 
					store: 'https://lampa32.github.io/extensions.json',
					with_installed: true
				  });
                             });
			}
});

})();
