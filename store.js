(function () {
    'use strict';
               
fetch('https://lampa32.github.io/extensions.json')
  .then(response => response.json())
  .then(data => {
    const themesData = data.themes;

    function applyTheme(themeData) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = themeData.link;
      head.appendChild(link);
      console.log(`Тема "${themeData.name}" успешно установлена.`);
    }

    // Применение всех тем из JSON-данных
    themesData.forEach(themeData => {
      applyTheme(themeData);
    });

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
