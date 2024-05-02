(function () {
    'use strict'

// Создаем прокси для глобального объекта
const handler = {
  apply: function(target, thisArg, argumentsList) {
    // Если вызываемая функция имеет имя 'checkPremium', возвращаем 1
    if (target.name === 'checkPremium') {
      return 1;
    }
    // Иначе вызываем оригинальную функцию
    return Reflect.apply(target, thisArg, argumentsList);
  }
};

const globalProxy = new Proxy(window, handler);

// Заменяем глобальный объект на прокси
window.__proto__ = globalProxy;
   
// URL файла CSS для темы "Copenhagen" (предположим, что ее id равен 200)
var copenhagenThemeId = "200";
var copenhagenCssFile = "http://lampa.run.place/copenhagen.css";

// Ссылка на элемент <link>, который будет добавлен в <body>
var copenhagenCssLink = null;

// Функция для применения стилей темы "Copenhagen"
function applyCopenhagenTheme() {
    if (!copenhagenCssLink) {
        copenhagenCssLink = $('<link rel="stylesheet" href="' + copenhagenCssFile + '">');
        $('body').append(copenhagenCssLink);
    }
}

// Функция для удаления стилей темы "Copenhagen"
function removeCopenhagenTheme() {
    if (copenhagenCssLink) {
        copenhagenCssLink.remove();
        copenhagenCssLink = null;
    }
}

// Подписываемся на событие установки или удаления темы
Lampa.Listener.follow('theme', function(e) {
    var theme = e.object;
    if (theme.data.id === copenhagenThemeId) {
        if (theme.active()) {
            applyCopenhagenTheme();
        } else {
            removeCopenhagenTheme();
        }
    }
});

    
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
            $('.settings-param > div:contains("123")').parent().insertAfter($('div[data-name="interface_size"]'));

            item.on('hover:enter', function() {
                Lampa.Extensions.show({
                    store: 'https://lampa32.github.io/extensions.json',
                    with_installed: true,
                });
            });
        }, 10);
    }
});


/*function mainSet() {
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
    // Удаляем наши CSS-файлы, кроме стандартного
    $('link[rel="stylesheet"][href^="http://lampa.run.place/"]').remove();

    // Добавляем новый CSS-файл, если он задан
    if (cssFile) {
        var css = $('<link rel="stylesheet" href="' + cssFile + '">');
        $('body').append(css);
    }
}

// Получение ранее сохраненного значения из хранилища
var savedColor = localStorage.getItem('interfaceColor') || 'no';

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
}*/
})();
