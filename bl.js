(function () {
    'use strict';
    Lampa.Platform.tv();

    // exclude-blacklist.js
window.addEventListener('load', function () {
    var originalLoadBlackList = window.loadBlackList;

    window.loadBlackList = function (call) {
        originalLoadBlackList(function (blackList) {
            // Фильтруем черный список, исключая scabrum.github.io
            var filteredBlackList = blackList.filter(function (url) {
                return !url.includes('scabrum.github.io');
            });

            // Вызываем оригинальную функцию call с отфильтрованным черным списком
            call(filteredBlackList);
        });
    }
});
    
})()
