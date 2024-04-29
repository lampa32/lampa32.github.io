(function () {
    'use strict';
      fetch('https://lampa32.github.io/extensions.json')
  .then(response => response.json())
  .then(themesData => {
    function applyTheme(themeLink) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = themeLink;
      head.appendChild(link);
    }

    function onThemeEnable(themeData) {
      applyTheme(themeData.link);
      console.log(`Тема "${themeData.name}" успешно установлена.`);
    }

    // Пример вызова при включении темы "Copenhagen"
    const copenhagenTheme = themesData.results[0].results[0];
    onThemeEnable(copenhagenTheme);

    // Ваш код
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
  .catch(error => console.error('Ошибка при загрузке JSON:', error));         

})();
