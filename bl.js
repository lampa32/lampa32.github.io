(function () {
    'use strict';
    Lampa.Platform.tv();

    function loadBlackList(call) {
    var status = new status$2(2);

    status.onComplite = function (res) {
        // Объединяем списки cub и custom
        let combinedList = [].concat(res.cub, res.custom);

        // Фильтруем список, исключая scabrum.github.io
        const modifiedList = combinedList.filter(url => !url.includes('scabrum.github.io'));

        call(modifiedList);
    };

    _network.silent(Utils$2.protocol() + object$2.cub_domain + '/api/plugins/blacklist', function (result) {
        var list = result.map(function (a) {
            return a.url;
        });
        Storage.set('plugins_blacklist', list);
        status.append('cub', list);
    }, function () {
        status.append('cub', Storage.get('plugins_blacklist', '[]'));
    });

    _network.silent('./plugins_black_list.json', function (list) {
        status.append('custom', list);
    }, function () {
        status.append('custom', []);
    });
    }
    
})()
