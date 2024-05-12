(function () {
    'use strict';

 

    function myMenu() {
    var enabled = Lampa.Controller.enabled().name;
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

    pollParsers(menu)
        .then(function(updatedMenu) {
            Lampa.Select.show({
                title: 'Меню смены парсера',
                items: updatedMenu.map(function(item) {
                    return {
                        title: item.title,
                        url: item.url,
                        jac_key: item.jac_key
                    };
                }),
                onBack: function onBack() {
                    Lampa.Controller.toggle(enabled);
                },
                onSelect: function onSelect(a) {
                    Lampa.Storage.set('jackett_url', a.url) & Lampa.Storage.set('jackett_key', a.jac_key) & Lampa.Storage.set('jackett_interview', 'all') & Lampa.Storage.set('parse_in_search', true) & Lampa.Storage.set('parse_lang', 'lg');
                    Lampa.Controller.toggle(enabled);
                    var activ = Lampa.Storage.get('activity')
                    setTimeout(function() {
                        window.history.back();
                    }, 1000)
                    setTimeout(function() {
                        Lampa.Activity.push(activ)
                    }, 3000)
                }
            })
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

function pollParsers(menu) {
    var promises = [];

    for (var i = 0; i < menu.length; i++) {
        var url = menu[i].url;
        promises.push(myRequest(url, menu[i].title, menu[i]));
    }

    return Promise.all(promises);
}

function myRequest(url, title, menuItem) {
    return new Promise(function(resolve, reject) {
        var proto = url.startsWith('http') ? 'http://' : 'https://';
        var myLink = proto + url + '/api/v2.0/indexers/status:healthy/results?apikey=' //+ (menuItem.jac_key ? '&' + menuItem.jac_key : '');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', myLink, true);
        xhr.timeout = 10000;

        xhr.onload = function() {
            if (xhr.status == 200) {
                console.log('Response:', xhr.responseText); // Добавлено логирование ответа сервера
                menuItem.title = title + ' <span style="color: #1aff00;">✓</span>';
                resolve(menuItem);
            } else {
                if (xhr.status === 401) {
                    menuItem.title = title + ' <span style="color: #ff2e36;">✗</span>';
                } else {
                    menuItem.title = title + ' <span style="color: #ff2e36;">✗</span>';
                }
                resolve(menuItem);
            }
        };

        xhr.onerror = function() {
            menuItem.title = title + ' <span style="color: #ff2e36;">✗</span>';
            resolve(menuItem);
        };

        xhr.ontimeout = function() {
            menuItem.title = title + ' <span style="color: #ff2e36;">✗</span>';
            resolve(menuItem);
        };

        xhr.send();
    });
}

var eLoop = 0, myInterval, myIntervalPlus;
Lampa.Storage.listener.follow('change', function(event) {
    if (event.name == 'activity') {
        if (Lampa.Activity.active().component == 'torrents') {
            myInterval = setInterval(function() {
                if (eLoop = 30) {
                    eLoop = 0;
                    clearInterval(myInterval);
                }
                if ($('.empty__title').length) {
                    eLoop = 0
                    myMenu();
                    $('.empty__title').remove();
                    clearInterval(myInterval);
                } else eLoop++;
            }, 2000)
        }
    }
});
    
})();
