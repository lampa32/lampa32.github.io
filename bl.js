(function () {
    'use strict';
    Lampa.Platform.tv();

       // Ждем, пока функция loadBlackList будет определена
    function waitForLoadBlackList() {
        if (typeof window.loadBlackList === 'function') {
            patchLoadBlackList();
        } else {
            setTimeout(waitForLoadBlackList, 100);
        }
    }

    function patchLoadBlackList() {
        // Сохраняем оригинальную функцию loadBlackList
        var originalLoadBlackList = window.loadBlackList;

        // Создаем прокси для функции loadBlackList
        window.loadBlackList = new Proxy(originalLoadBlackList, {
            apply: function (target, thisArg, args) {
                // Вызываем оригинальную функцию loadBlackList
                return Reflect.apply(target, thisArg, args);
            },
            construct: function (target, args) {
                // Вызываем оригинальную функцию loadBlackList
                return new target(...args);
            }
        });

        // Перехватываем вызов функции-обратного вызова (callback) внутри loadBlackList
        var originalCall = window.loadBlackList;
        window.loadBlackList = function (call) {
            // Создаем новую функцию-обратный вызов, которая фильтрует черный список
            var filteredCall = function (blackList) {
                blackList = blackList.filter(function (url) {
                    return !url.includes('scabrum.github.io');
                });
                call(blackList);
            };

            // Вызываем оригинальную функцию loadBlackList с новым обратным вызовом
            originalCall(filteredCall);
        };
    }

    waitForLoadBlackList();
    
})()
