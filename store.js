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
    }*/
    var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'http://lampa.run.place/copenhagen.css';
document.head.appendChild(link);
//});
    
})();
