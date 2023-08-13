(function () {
    'use strict';
// Список URL-ов плагинов
    const pluginUrls = ['http://my.lampa32.ru/online.js', '/js/radio.js', '/js/proxy.js', '/js/test.js', '/js/add.js'];
    // Загрузка и выполнение каждого плагина
    pluginUrls.forEach(url => {
        fetch(url)
            .then(response => response.text())
            .then(code => {
                const plugin = eval(code);  // Исполняем код плагина и получаем результат
                if (_typeof(plugin) == 'object' && typeof plugin.type == 'string') {
                    plugins$1.push(plugin);  // Добавляем плагин в список плагинов
                }
                console.log(`Плагин ${url} успешно загружен и выполнен.`);
            })
            .catch(error => {
                console.error(`Произошла ошибка при загрузке или выполнении плагина ${url}:`, error);
            });
      });
});
