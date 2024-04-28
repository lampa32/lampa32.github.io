(function() {
  'use strict';

  function mainSet() {
    // Массив с CSS-файлами для разных цветов
    const CSS_FILES = {
      red_stroke: 'http://lampa.run.place/red_stroke.css',
      pink_stroke: 'http://lampa.run.place/pink_stroke.css',
      orange_stroke: 'http://lampa.run.place/orange_stroke.css',
      green_stroke: 'http://lampa.run.place/green_stroke.css',
      dark_blue_stroke: 'http://lampa.run.place/dark_blue_stroke.css',
      violet_stroke: 'http://lampa.run.place/violet_stroke.css',
      immersive_garden: 'http://lampa.run.place/immersive_garden.css',
      copenhagen: 'http://lampa.run.place/copenhagen.css',
      authentic_brief: 'http://lampa.run.place/authentic_brief.css'
    };

    function changeInterfaceColor(cssFile) {
      // Удаляем наши CSS-файлы, кроме стандартного
      $('link[rel="stylesheet"][href^="http://lampa.run.place/"]').remove();

      // Загрузка нового CSS-файла, если он задан
      if (cssFile) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
      }
    }

    // Получение ранее сохраненного значения из хранилища
    const savedColor = localStorage.getItem('interfaceColor') || 'no';

    // Применяем сохраненный цвет интерфейса сразу после загрузки приложения
    changeInterfaceColor(savedColor !== 'no' ? CSS_FILES[savedColor] : null);

    Lampa.SettingsApi.addParam({
      component: 'interface',
      param: {
        name: 'Color_interface',
        type: 'select',
        values: {
          header: {
            value: '--- Цветовые схемы ---',
            disabled: true
          },
          no: 'Стандартная',
          red_stroke: 'С красной обводкой',
          pink_stroke: 'С розовой обводкой',
          orange_stroke: 'С оранжевой обводкой',
          green_stroke: 'С зеленой обводкой',
          dark_blue_stroke: 'С синей обводкой',
          violet_stroke: 'С фиолетовой обводкой',
          immersive_garden: 'Immersive Garden',
          copenhagen: 'Copenhagen',
          authentic_brief: 'Authentic Brief'
        },
        default: 'no'
      },
      field: {
        name: 'Цветовая схема',
        description: 'Нажмите для выбора'
      },
      onChange: function(value) {
        if (value === 'header') {
          // Ничего не делать, если выбран заголовок
          return;
        }

        // Сохранение выбранного цвета в хранилище
        localStorage.setItem('interfaceColor', value);

        // Загрузка нового CSS-файла, если выбран цвет, отличный от "Стандартная"
        changeInterfaceColor(value !== 'no' ? CSS_FILES[value] : null);
      },
      onRender: function(item) {
        setTimeout(function() {
          $('div[data-name="Color_interface"]').insertAfter('div[data-name="interface_size"]');
        }, 0);
      }
    });
  }

  if (window.appready) {
    mainSet();
  } else {
    Lampa.Listener.follow('app', function(e) {
      // если приложение прогрузилось
      if (e.type == 'ready') {
        mainSet();
      }
    });
  }
})();
