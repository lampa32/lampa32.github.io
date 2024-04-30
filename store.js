(function () {
    'use strict'
    
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
            
            // Добавляем ссылку на стилевой файл
            var link = $('<link rel="stylesheet" href="https://lampa32.github.io/extensions.json" id="cub-theme">');
            $('body').append(link);
        }, 100);

        item.on('hover:enter', function() {
            Lampa.Extensions.show({
                store: 'https://lampa32.github.io/extensions.json',
                with_installed: true
            });
        });
    }
});
    
})();
