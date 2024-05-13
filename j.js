(function () {
    'use strict';

 

    function myMenu() {
    var enabled = Lampa.Controller.enabled().name;
    var menu = [];

    menu.push({
        title: 'Lampa32',
        url: 'jac.lampa32.ru',
        jac_key: '',
        jac_int: 'all',
        jac_search: true,
        jac_lang: 'lg'
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

    pollParsers(menu).then(
        function(updatedMenu) {
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
                    Lampa.Storage.set('jackett_url', a.url) & Lampa.Storage.set('jackett_key', a.jac_key) & Lampa.Storage.set('jackett_interview', a.jac_int) & Lampa.Storage.set('parse_in_search', a.jac_search) & Lampa.Storage.set('parse_lang', a.jac_lang);
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
        var proto = location.protocol === "https:" ? 'https://' : 'http://';
        var myAdder = '';
        if (url == 'spawn.pp.ua:59117') var myAdder = '2'
        var myLink = proto + url + '/api/v2.0/indexers/status:healthy/results?apikey=' + myAdder;//(menuItem.jac_key ? '&' + menuItem.jac_key : '');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', myLink, true);
        xhr.timeout = 5000;

        xhr.onload = function() {
            console.log('Response Status:', xhr.status);
            console.log('Response Text:', xhr.responseText);

            if (xhr.status === 200) {
                menuItem.title = '<span style="color: #1aff00;">&#10003;&nbsp;&nbsp;' + title + '</span>';
                resolve(menuItem);
            } else {
                menuItem.title = '<span style="color: #ff2e36;">&#10005;&nbsp;&nbsp;' + title + '</span>';
                resolve(menuItem);
            }
        };

        xhr.onerror = function() {
            console.error('Network error:', xhr.status);
            menuItem.title = '<span style="color: #ff2e36;">&#10005;&nbsp;&nbsp;' + title + '</span>';
            resolve(menuItem);
        };

        xhr.ontimeout = function() {
            console.error('Request timed out');
            menuItem.title = '<span style="color: #ff2e36;">&#10005;&nbsp;&nbsp;' + title + '</span>';
            resolve(menuItem);
        };

        console.log('Sending request to:', myLink);
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
                    //$('.empty__title').remove();
                    clearInterval(myInterval);
                } else eLoop++;
            }, 2000)
        }
    }
});
    
})();
