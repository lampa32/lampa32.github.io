(function () {
    'use strict'

    Lampa.Controller.listener.follow('toggle', function(e) {
    if (e.name === 'select') {
        setTimeout(function() {
            const itemNames = document.querySelectorAll('.extensions__item-name');
            let shouldApplyCSS = false;

            itemNames.forEach(function(item) {
                const itemText = item.textContent.trim();

                if (itemText.includes('White')) {
                    shouldApplyCSS = true;
                } else {
                    shouldApplyCSS = false;
                    return; // Выходим из цикла, если условие не выполнено
                }
            });

            if (shouldApplyCSS) {
                setTimeout(function() {
                    $('.selectbox-item > div:contains("Включить")').click(function() {
                        var link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = 'http://lampa.run.place/copenhagen.css';
                        $('head').append(link);
                    });
                }, 100);
            }
        }, 10);
    }
});

 /*Lampa.Controller.listener.follow('toggle', function(e) {
    if(e.name == 'select') { 
     setTimeout(function() {
           $('.extensions__item-name > div:contains("Cop")')&&$('.selectbox-item > div:contains("Включить")').on('click', function() {
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'http://lampa.run.place/copenhagen.css';
              $('head').append(link);
            });
         }, 10);  
    }
 });*/
      
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
                    store: 'http://lampa.run.place/extensions.json',
                    with_installed: false,
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
