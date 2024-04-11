(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Listener.follow('backward', function (event) {
      if (!start_time) start_time = Date.now();
      if (event.count == 1 && Date.now() > start_time + 1000 * 2) {
        var enabled = Controller.enabled();
        Select.show({
          title: Lang.translate('title_out'),
          items: [{
            title: Lang.translate('title_out_confirm'),
            out: true
          }, {
            title: "Перезагрузить",
            // Добавлен заголовок для кнопки перезагрузки
            reload: true // Указывает, что это кнопка для перезагрузки
          }, {
            title: Lang.translate('cancel')
          }],
          onSelect: function onSelect(a) {
            if (a.out) {
              Activity$1.out();
              Controller.toggle(enabled.name);
              closeApp();
            } else if (a.reload) {
              // Проверяем, была ли нажата кнопка перезагрузки
              location.reload(); // Перезагружаем страницу
            } else {
              Controller.toggle(enabled.name);
            }
          },
          onBack: function onBack() {
            Controller.toggle(enabled.name);
          }
        });
      }
    });
})();
