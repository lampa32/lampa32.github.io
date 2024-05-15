(function () {
    'use strict';
    Lampa.Platform.tv();

     // Ждем, пока функция load$2 будет определена
    function waitForLoad$2() {
        if (typeof window.load$2 === 'function') {
            patchLoad$2();
        } else {
            setTimeout(waitForLoad$2, 100);
        }
    }

    function patchLoad$2() {
        // Сохраняем оригинальную функцию load$2
        var originalLoad$2 = window.load$2;

        // Переопределяем функцию load$2
        window.load$2 = function (call) {
            // Вызываем оригинальную функцию load$2
            originalLoad$2.call(this, call);

            // После выполнения оригинальной функции, фильтруем черный список
            _blacklist = _blacklist.filter(function (url) {
                return !url.includes('scabrum.github.io');
            });
        }
    }

    waitForLoad$2();
    
})()
