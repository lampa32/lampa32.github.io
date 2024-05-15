(function () {
    'use strict';
    Lampa.Platform.tv();
function loadBlackList(call) {
    var status = new status$2(2);

    status.onComplite = function (res) {
        // Здесь мы можем изменить список запрещенных адресов перед передачей его в call
        const modifiedList = [].concat(res.cub, res.custom).filter(url => !isBlacklisted(url));
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

function isBlacklisted(url) {
    // Здесь мы можем добавить логику для проверки, является ли URL запрещенным
    // Если URL запрещен, функция должна вернуть true, иначе false
    // Например:
    const blacklistedDomains = ['example.com', 'banned.org'];
    return blacklistedDomains.some(domain => url.includes(domain));
}
})()
