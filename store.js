(function () {
    'use strict';
               
let ThemeManager = (function() {
  let currentTheme = null;

  function init(themeData) {
    if (themeData && themeData.themes && themeData.themes.length > 0) {
      applyTheme(themeData.themes[0]); // Применяем первую тему из JSON
    }
  }

  function applyTheme(themeData) {
    removeCurrentTheme();

    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = themeData.link;
    link.id = 'current-theme';
    head.appendChild(link);
    currentTheme = themeData;
    console.log(`Тема "${themeData.name}" успешно применена.`);
  }

  function removeCurrentTheme() {
    const currentThemeLink = document.getElementById('current-theme');
    if (currentThemeLink) {
      currentThemeLink.remove();
      currentTheme = null;
    }
  }

  return {
    init: init,
    applyTheme: applyTheme,
    removeCurrentTheme: removeCurrentTheme
  };
})();

// Использование ThemeManager
fetch('https://lampa32.github.io/extensions.json')
  .then(response => response.json())
  .then(themeData => {
    ThemeManager.init(themeData);
    
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
  .catch(error => console.error('Ошибка при загрузке JSON:', error));
})();
