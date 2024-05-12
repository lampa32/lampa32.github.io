(function () {
    'use strict';

    function myRequest(url, selector, title) {
    var proto = url.startsWith('http') ? 'http://' : 'https://';
    var myLink = proto + url + '/api/v2.0/indexers/status:healthy/results?apikey=';

    $.ajax({
        url: myLink,
        timeout: 3000,
        type: 'GET',
        success: function(data, textStatus, jqXHR) {
            $(selector).text(title + ' ✓');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                $(selector).text(title + ' ✗');
            } else {
                $(selector).text(title + ' ✗');
            }
        }
    });
}

function checkAlive() {
    var menu = [];

    menu.push({
        title: 'Lampa32',
        url: 'jac.lampa32.ru',
        jac_key: ''
    });

    menu.push({
        title: 'Jacred.xyz',
        url: 'jacred.xyz',
        jac_key: ''
    });

    menu.push({
        title: 'Jacred.ru',
        url: 'jacred.ru',
        jac_key: ''
    });

    menu.push({
        title: 'Jacred My To',
        url: 'jacred.my.to',
        jac_key: ''
    });

    menu.push({
        title: 'Viewbox',
        url: 'jacred.viewbox.dev',
        jac_key: 'viewbox'
    });

    menu.push({
        title: 'Spawn Jackett',
        url: 'spawn.pp.ua:59118',
        jac_key: '2'
    });

    menu.push({
        title: 'Spawn Jacred',
        url: 'spawn.pp.ua:59117',
        jac_key: ''
    });

    menu.push({
        title: 'Prisma',
        url: 'api.prisma.ws:443',
        jac_key: ''
    });

    for (var i = 0; i < menu.length; i++) {
        var url = menu[i].url;
        
        var selector = 'body > div.selectbox > div.selectboxcontent.layer--height > div.selectboxbody.layer--wheight > div > div > div > div:nth-child(' + (i + 2) + ') > div';
        myRequest(url, selector, menu[i].title);
    }
}

function myMenu(menu) {
    var enabled = Lampa.Controller.enabled().name;

    var menuItems = menu.map(function(item) {
        return {
            title: item.title.replace(/ ✓| ✗/g, ''),
            url: item.url,
            jac_key: item.jac_key
        };
    });

    Lampa.Select.show({
        title: 'Меню смены парсера',
        items: menuItems,
        onBack: function onBack() {
            Lampa.Controller.toggle(enabled);
        },
        onSelect: function onSelect(a) {
            Lampa.Storage.set('jackett_url', a.url) & Lampa.Storage.set('jackett_key', a.jac_key) & Lampa.Storage.set('jackett_interview', 'all') & Lampa.Storage.set('parse_in_search', true) & Lampa.Storage.set('parse_lang', 'lg');
            Lampa.Controller.toggle(enabled);
            var activ = Lampa.Storage.get('activity')
            setTimeout(function () {
                window.history.back();
            }, 1000)
            setTimeout(function () {
                Lampa.Activity.push(activ)
            }, 3000)
        }
    })
}

var eLoop = 0, myInterval, myIntervalPlus;
Lampa.Storage.listener.follow('change', function (event) {
    if (event.name == 'activity') {
        if (Lampa.Activity.active().component == 'torrents') {
            myInterval = setInterval(function () {
                if (eLoop = 30) {
                    eLoop = 0;
                    clearInterval(myInterval);
                }
                if ($('.empty__title').length) {
                    eLoop = 0
                    $('.empty__title').remove();
                    clearInterval(myInterval);
                }
                else eLoop++;
            }, 2000)
        }
    }
});

Lampa.Controller.listener.follow('toggle', function(e) {
    if(e.name == 'select') {
        setTimeout(function() {
            checkAlive();
        }, 10);
    }
});
})();
