(function () {
    'use strict'
    
   /* Lampa.SettingsApi.addParam({
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
            $('.settings-param > div:contains("123")').parent().insertAfter($('div[data-name="interface_size"]'));

            // Получаем идентификатор выбранной темы
            var themeId = Lampa.Storage.get('theme_id', '');

            // Удаляем ранее загруженные CSS-файлы тем
            $('link[rel="stylesheet"][id^="theme-"]').remove();

            // Загружаем CSS-файл для выбранной темы
            if (themeId) {
                var link = $('<link rel="stylesheet" href="http://lampa.run.place/themes/' + themeId + '.css" id="theme-' + themeId + '">');
                $('body').append(link);
            }
        }, 100);

        item.on('hover:enter', function() {
            Lampa.Extensions.show({
                store: 'https://lampa32.github.io/extensions.json',
                with_installed: true
            });
        });
    }
  });*/


function mainSet() {
    var CSS_FILES = {
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
    console.log('Changing interface color...');

    // Удаляем наши CSS-файлы, кроме стандартного
    var linksRemoved = $('link[rel="stylesheet"][href^="http://lampa.run.place/"]').remove();
    console.log('Removed', linksRemoved.length, 'CSS links');

    // Добавляем новый CSS-файл, если он задан
    if (cssFile) {
        console.log('Adding CSS file:', cssFile);
        var css = $('<link rel="stylesheet" href="' + cssFile + '">');
        $('body').append(css);
    } else {
        console.log('No CSS file specified');
    }
}

// Получение ранее сохраненного значения из хранилища
var savedColor = localStorage.getItem('interfaceColor') || 'no';
console.log('Saved interface color:', savedColor);

// Применяем сохраненный цвет интерфейса сразу после загрузки приложения
changeInterfaceColor(savedColor !== 'no' ? CSS_FILES[savedColor] : null);

Lampa.SettingsApi.addParam({
    component: 'interface',
    param: {
        name: 'Color_interface',
        type: 'select',
        values: {
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
        console.log('Interface color changed to:', value);

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
