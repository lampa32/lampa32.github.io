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

    var menuItems = menu.map(function(item) {
        return {
            title: item.title,
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
            setTimeout(function() {
                window.history.back();
            }, 1000)
            setTimeout(function() {
                Lampa.Activity.push(activ)
            }, 3000)
        }
    });

    pollParsers(menu, menuItems);
}

function pollParsers(menu, menuItems) {
    var promises = [];

    for (var i = 0; i < menu.length; i++) {
        var url = menu[i].url;
        promises.push(myRequest(url, menuItems[i], menu[i]));
    }

    Promise.all(promises)
        .catch(function(error) {
            console.error('Error:', error);
        });
}

function myRequest(url, menuItem, parserItem) {
    return new Promise(function(resolve, reject) {
        var proto = url.startsWith('http') ? 'http://' : 'https://';
        var myLink = proto + url + '/api/v2.0/indexers/status:healthy/results?apikey=' + (parserItem.jac_key ? '&' + parserItem.jac_key : '');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', myLink, true);
        xhr.timeout = 3000;

        xhr.onload = function() {
            if (xhr.status === 200) {
                menuItem.title = parserItem.title + ' <span style="color: #1aff00;">✓</span>';
                resolve();
            } else {
                if (xhr.status === 401) {
                    menuItem.title = parserItem.title + ' <span style="color: #ff2e36;">✗</span>';
                } else {
                    menuItem.title = parserItem.title + ' <span style="color: #ff2e36;">✗</span>';
                }
                resolve();
            }
        };

        xhr.onerror = function() {
            menuItem.title = parserItem.title + ' <span style="color: #ff2e36;">✗</span>';
            
            resolve();
        };

        xhr.ontimeout = function() {
            menuItem.title = parserItem.title + ' <span style="color: #ff2e36;">✗</span>';
            resolve();
        };

        xhr.send();
    });
}
    
})();
